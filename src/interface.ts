/**响应报文 */
export interface Result {
  [key: string]: any;
  /**响应码 */
  code: number;
  /**响应报文 */
  msg: string;
  /**响应数据 */
  data?: any;
}
