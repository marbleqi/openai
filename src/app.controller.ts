import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { AxiosHeaders } from 'axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly http: HttpService) {}

  @All('*')
  async all(@Req() req: Request, @Res() res: Response) {
    console.debug('method', req.method);
    console.debug('url', req.url);
    console.debug('params', req.params);
    console.debug('query', req.query);
    console.debug('body', req.body);
    console.debug('headers', req.headers);
    const headers: AxiosHeaders = new AxiosHeaders();
    if (req.headers['content-type']) {
      console.debug('Content-Type', req.headers['content-type']);
      headers.set('Content-Type', req.headers['content-type']);
    } else {
      headers.set('Content-Type', 'application/json');
    }
    headers.set('Authorization', req.headers['authorization']);
    /**接口调用结果 */
    const result = await firstValueFrom(
      this.http.request({
        url: `https://api.openai.com${req.url}`,
        method: req.method,
        params: req.params,
        data: req.body,
        headers,
        validateStatus: () => true,
      }),
    );
    console.debug('status', result.status);
    console.debug('result', result.data);
    res.status(result.status).json(result.data);
  }
}
