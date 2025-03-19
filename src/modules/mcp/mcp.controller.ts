import { Request, Response } from 'express'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { UserService } from '../user/user.service'
import { McpService } from './mcp.service'

@Controller('mcp')
export class McpController {
  private readonly server: McpServer
  private transport: SSEServerTransport

  constructor(
    private readonly mcpService: McpService,
    private readonly userService: UserService,
  ) {
    this.server = new McpServer({
      name: 'marchen blog',
      version: '1.0.0',
    })
    // 添加一个简单的工具示例
    this.server.tool('user', '获取用户信息', async () => {
      const userInfo = await this.userService.getMasterInfo()
      return {
        content: [{ type: 'text', text: JSON.stringify(userInfo) }],
      }
    })
  }

  @Get('sse')
  async sseEndpoint(@Res() res: Response) {
    this.transport = new SSEServerTransport('/mcp/messages', res)
    await this.server.connect(this.transport)
  }

  @Post('messages')
  async messagesEndpoint(@Req() req: Request, @Res() res: Response) {
    await this.transport.handlePostMessage(req, res)
  }
}
