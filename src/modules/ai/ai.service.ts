import { generateText } from 'ai'

import { createOpenAI } from '@ai-sdk/openai'
import { Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'
import { MODEL_BASE_URL, OPENAI_API_KEY } from '~/global/env.global'

import { SummaryDto } from './ai.dto'

@Injectable()
export class AiService {
  constructor(private readonly db: DataBaseService) {}

  async generateAiSummary(content: string) {
    const openai = createOpenAI({
      baseURL: MODEL_BASE_URL,
      apiKey: OPENAI_API_KEY,
    })
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Read the article, auto-detect its language, and summarize the main points in the same language within 150 words. Output only the summary. Article: ${content}`,
    })
    return { text, model: 'gpt-4o-mini' }
  }

  async createSummary(summary: SummaryDto) {
    return this.db.summaries.create({
      data: {
        text: summary.text,
        model: summary.model,
      },
    })
  }
}
