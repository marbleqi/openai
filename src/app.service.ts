// 外部依赖
import { Injectable } from '@nestjs/common';
import {
  Configuration,
  OpenAIApi,
  CreateImageRequest,
  ChatCompletionRequestMessage,
} from 'openai';
// 内部依赖
import { Result } from './interface';

@Injectable()
export class AppService {
  /**
   * 对话
   * @param value 前文
   * @returns 响应报文
   */
  async chat(messages: Array<ChatCompletionRequestMessage>) {
    console.debug('提交', messages);
    const configuration = new Configuration({
      organization: process.env.OPENAI_ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });
    console.debug('结果', response.data);
    if (response.data?.choices && response.data?.choices.length) {
      return {
        code: 0,
        msg: 'ok',
        data: response.data?.choices[0].message,
      } as Result;
    } else {
      return { code: 404, msg: '我不知道' } as Result;
    }
  }

  /**
   * 画图
   * @param value 前文
   * @returns 响应报文
   */
  async image(value: CreateImageRequest) {
    console.debug('提交', value);
    const configuration = new Configuration({
      organization: process.env.OPENAI_ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const res = await openai.createImage(value);
    console.debug('结果', res.data);
    return { code: 0, msg: 'ok', data: res.data?.data } as Result;
  }
}
