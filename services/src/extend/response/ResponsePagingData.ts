import { Config } from '../../config/config';
import { ResponseErrorType } from './ResponseErrorEvent';
export interface IPageData {
  /**
   * 每页数量
   */
  pageSize: number;
  /**
   * 当前页码
   */
  pageIndex: number;
  /**
   * 总条数
   */
  total: number;
  /**
   * 是否为最后一页
   */
  isEnd?: boolean;
}

export class ResponsePagingData<T> {
  public statusCode: ResponseErrorType = ResponseErrorType.no;
  constructor(public dataList: T[],
    public pageData: IPageData = { pageSize: Config.initPageSize, pageIndex: 1, total: 0, isEnd: false },
    public message?: string) {
    this.message = message || '查询成功';
    this.pageData.pageSize = pageData.pageSize;
    this.pageData.pageIndex = pageData.pageIndex;
    this.pageData.total = pageData.total;
    this.dataList = dataList || [];
  }
}
