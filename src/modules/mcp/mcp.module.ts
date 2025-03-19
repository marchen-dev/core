import { Module } from '@nestjs/common'

import { UserModule } from '../user/user.module'
import { McpController } from './mcp.controller'
import { McpService } from './mcp.service'

@Module({
  controllers: [McpController],
  providers: [McpService],
  imports: [UserModule],
})
export class McpModule {}
