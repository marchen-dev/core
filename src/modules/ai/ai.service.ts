import { IncomingMessage, ServerResponse } from 'node:http'
import { generateObject, generateText, streamText } from 'ai'
import { z } from 'zod'

import { createOpenAI } from '@ai-sdk/openai'
import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'
import { k233, u233 } from '~/global/env.global'

import { EncryptionService } from '../encryption/encryption.service'
import { AIDto, AITextgenerationDto } from './ai.dto'

@Injectable()
export class AiService {
  constructor(
    private readonly db: DataBaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async getCurrentModel() {
    const ai = await this.db.ai.findFirst({
      where: {
        active: true,
      },
    })
    if (!ai) {
      throw new BadRequestException('未找到可用的 AI')
    }
    const model = ai.model
    return model
  }

  async generateAiText(prompt: string, type: AITextgenerationDto['type']) {
    const { server, model } = await this.getServer()
    const baseReturn = { model, prompt }
    switch (type) {
      case 'category': {
        const { object } = await generateObject({
          model: server(model),
          prompt,
          schema: z.object({
            categoryId: z.string().describe('编程'),
          }),
        })
        return { content: object.categoryId, ...baseReturn }
      }
      case 'tags': {
        const { object } = await generateObject({
          model: server(model),
          prompt,
          output: 'array',
          schema: z.string().describe('TypeScript'),
        })
        return { content: object, ...baseReturn }
      }
      case 'slug': {
        const { object } = await generateObject({
          model: server(model),
          prompt,
          schema: z.object({
            slug: z.string().describe('learn-typescript'),
          }),
        })
        return { content: object.slug, ...baseReturn }
      }

      case 'title': {
        const { object } = await generateObject({
          model: server(model),
          prompt,
          schema: z.object({
            title: z.string().describe('HTTP 的数据传输方式和编码格式'),
          }),
        })
        return { content: object.title, ...baseReturn }
      }

      default: {
        const { text } = await generateText({
          model: server(model),
          prompt,
        })
        return { content: text, ...baseReturn }
      }
    }
  }

  async streamAiText(content: string, res: ServerResponse<IncomingMessage>) {
    const { server, model } = await this.getServer()
    const result = streamText({
      model: server(model),
      prompt: content,
    })

    return result.pipeDataStreamToResponse(res)
  }

  async getServer() {
    const ai = await this.db.ai.findFirst({
      where: {
        active: true,
      },
    })
    if (!ai) {
      throw new BadRequestException('未找到可用的 AI')
    }
    const baseURL = ai.system
      ? this.encryptionService.decryptKey(ai.apiUrl)
      : ai.apiUrl
    const apiKey = ai.system
      ? this.encryptionService.decryptKey(ai.apiKey)
      : ai.apiKey
    const openai = createOpenAI({
      baseURL,
      apiKey,
    })
    return {
      server: openai,
      model: ai.model,
    }
  }

  async initializeAI() {
    const ai = await this.db.ai.findFirst()
    if (ai) {
      return ai
    }
    await this.db.ai.create({
      data: {
        apiUrl: u233,
        apiKey: k233,
        provider: 'OPENAI',
        model: 'gpt-4.1-nano',
        active: true,
        system: true,
      },
    })
    return
  }

  async createAI(ai: AIDto) {
    const aiExist = await this.db.ai.findUnique({
      where: {
        apiKey: ai.apiKey,
      },
    })
    if (aiExist) {
      throw new BadRequestException('此KEY已存在')
    }
    await this.db.$transaction(async (tx) => {
      if (ai.active) {
        await tx.ai.updateMany({
          data: {
            active: false,
          },
        })
      }
      await tx.ai.create({
        data: ai,
      })
    })

    return
  }

  async getAllAI() {
    return this.db.ai.findMany({
      omit: {
        apiKey: true,
      },
      orderBy: {
        created: 'asc',
      },
    })
  }

  async updateAI(id: string, ai: AIDto) {
    const aiExist = await this.db.ai.findUnique({
      where: {
        id,
      },
    })
    if (!aiExist) {
      throw new BadRequestException('此KEY不存在')
    }
    if (aiExist.active && !ai.active) {
      throw new BadRequestException('至少需要一个 AI 处于启用状态')
    }

    if (aiExist.system) {
      if (aiExist.active === ai.active) {
        return
      }
      await this.db.$transaction(async (tx) => {
        if (ai.active) {
          await tx.ai.updateMany({
            data: {
              active: false,
            },
          })
        }
        await tx.ai.update({
          where: {
            id,
          },
          data: {
            active: ai.active,
          },
        })
      })
      return
    }
    await this.db.$transaction(async (tx) => {
      if (ai.active) {
        await tx.ai.updateMany({
          data: {
            active: false,
          },
        })
      }
      await tx.ai.update({
        where: {
          id,
        },
        data: {
          ...ai,
          apiKey: ai.apiKey || aiExist.apiKey,
        },
      })
    })
    return
  }
  async deleteAI(id: string) {
    const ai = await this.db.ai.findUnique({
      where: {
        id,
      },
    })
    if (!ai) {
      throw new BadRequestException('此KEY不存在')
    }
    if (ai.system) {
      throw new BadRequestException('系统 AI 不能删除')
    }
    await this.db.$transaction(async (tx) => {
      await tx.ai.delete({
        where: {
          id,
        },
      })
      if (ai.active) {
        await tx.ai.updateMany({
          where: {
            system: true,
          },
          data: {
            active: true,
          },
        })
      }
    })
    return
  }
}
