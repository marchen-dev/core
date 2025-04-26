import { IncomingMessage, ServerResponse } from 'node:http'
import { generateObject, generateText, streamText } from 'ai'
import { z } from 'zod'

import { createOpenAI } from '@ai-sdk/openai'
import { Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'
import { MODEL_BASE_URL, OPENAI_API_KEY } from '~/global/env.global'

import { AITextgenerationDto } from './ai.dto'

@Injectable()
export class AiService {
  constructor(private readonly db: DataBaseService) {}

  async getCurrentModel() {
    const model = 'gpt-4.1-nano'
    return model
  }

  async generateAiText(prompt: string, type: AITextgenerationDto['type']) {
    const openai = await this.getAI()
    const model = await this.getCurrentModel()
    const baseReturn = { model, prompt }
    switch (type) {
      case 'category': {
        const { object } = await generateObject({
          model: openai(model),
          prompt,
          schema: z.object({
            categoryId: z.string().describe('编程'),
          }),
        })
        return { content: object.categoryId, ...baseReturn }
      }
      case 'tags': {
        const { object } = await generateObject({
          model: openai(model),
          prompt,
          output: 'array',
          schema: z.string().describe('TypeScript'),
        })
        return { content: object, ...baseReturn }
      }
      case 'slug': {
        const { object } = await generateObject({
          model: openai(model),
          prompt,
          schema: z.object({
            slug: z.string().describe('learn-typescript'),
          }),
        })
        return { content: object.slug, ...baseReturn }
      }

      case 'title': {
        const { object } = await generateObject({
          model: openai(model),
          prompt,
          schema: z.object({
            title: z.string().describe('HTTP 的数据传输方式和编码格式'),
          }),
        })
        return { content: object.title, ...baseReturn }
      }

      default: {
        const { text } = await generateText({
          model: openai(model),
          prompt,
        })
        return { content: text, ...baseReturn }
      }
    }
  }

  async streamAiText(content: string, res: ServerResponse<IncomingMessage>) {
    const openai = await this.getAI()
    const result = streamText({
      model: openai(await this.getCurrentModel()),
      prompt: content,
    })

    return result.pipeDataStreamToResponse(res)
  }

  async getAI() {
    const openai = createOpenAI({
      baseURL: MODEL_BASE_URL,
      apiKey: OPENAI_API_KEY,
    })
    return openai
  }
}
