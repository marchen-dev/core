import { Observable, tap } from 'rxjs'

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'

import { AnalyzeService } from '~/modules/analyze/analyze.service'
import { getNestExecutionContextRequest } from '~/transformers/get-req.transformer'

@Injectable()
export class AnalyzeInterceptor implements NestInterceptor {
  constructor(private readonly analyzeService: AnalyzeService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = getNestExecutionContextRequest(context)
    const response = context.switchToHttp().getResponse()
    const requestStartTime = Date.now()

    return next.handle().pipe(
      tap(() => {
        const responseEndTime = Date.now()
        const duration = responseEndTime - requestStartTime

        // 收集分析数据
        const analyzeData = {
          path: request.url,
          ip: request.headers['x-forwarded-for']?.toString() || '未知',
          userAgent: request.headers['user-agent'],
          referer: request.headers.referer?.toString(),
          method: request.method,
          statusCode: response.statusCode,
          duration,
        }

        // 异步保存分析数据
        this.analyzeService.createAnalyze(analyzeData).catch((error) => {
          console.error('保存分析数据失败:', error)
        })
      }),
    )
  }
}
