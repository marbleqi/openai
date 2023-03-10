// 外部依赖
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateImageRequest, ChatCompletionRequestMessage } from 'openai';
// 内部依赖
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 发起对话请求
   * @param chat 对话请求
   * @param res 响应上下文
   */
  @Post('chat')
  async chat(
    @Body() messages: Array<ChatCompletionRequestMessage>,
    @Res() res: Response,
  ) {
    const result = await this.appService.chat(messages);
    res.status(200).json(result);
  }

  /**
   * 发起画图
   * @param chat 对话前文
   * @param res 响应上下文
   */
  @Post('image')
  async image(@Body() value: CreateImageRequest, @Res() res: Response) {
    const result = await this.appService.image(value);
    res.status(200).json(result);
  }
}
