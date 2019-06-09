export const API_URL = "server";

/**
 * Http methods
 */
export enum HTTP_METHOD {
  GET = "GET",
  PUT = "PUT",
}

/**
 * Http response statuses
 */
export enum HTTP_STATUS {
  OK = "OK",
}

/**
 * HTTP response interface
 */
export interface IResponse<T> {
  status: HTTP_STATUS;
  body: T;
}

/**
 * Request query interface
 */
export interface IRequestQuery {
  [K: string]: any;
}

/**
 * Request body interface
 */
export interface IRequestBody {
  [K: string]: any;
  [K: number]: any;
}

/**
 * HTTP request class
 */
export class HttpRequest {

  public constructor(
    public readonly method: HTTP_METHOD,
    public readonly path: string,
    public readonly query: IRequestQuery,
    public readonly body: IRequestBody | FormData
  ) { }

}

/**
 * HTTP response class
 */
export class HttpResponse<T> implements IResponse<T> {

  public constructor(
    public readonly req: HttpRequest,
    public readonly status: HTTP_STATUS,
    public readonly body: T
  ) { }

}

/**
 * Error response class
 */
export class ErrorResponse<T = null> extends Error implements IResponse<T> {

  public readonly req: HttpRequest;
  public readonly status: HTTP_STATUS;
  public readonly body: T;
  public readonly details: string;

  public constructor(res: HttpResponse<any>, message: string = null) {

    super(message || String(res.body));

    const req = res.req;

    this.req = res.req;
    this.status = res.status;
    this.body = res.body;

    // tslint:disable-next-line:max-line-length
    this.details = "Request to '" + req.method.toUpperCase() + " " + req.path + "' failed with status '" + res.status.toUpperCase() + "'.";

  }

}

/**
 * Mocks HTTP request
 */
export function mockRequest<T = null>(
  method: HTTP_METHOD,
  path: string,
  query: IRequestQuery = null,
  body: IRequestBody = null,
  responseStatus: HTTP_STATUS,
  responseBody: T = null): Promise<IResponse<T>> {

  return new Promise((resolve, reject) => {

    const url = API_URL;
    const req = new HttpRequest(method, url, query, body);

    const delay = 100 + (500 - 100) * Math.random();

    setTimeout(() => {

      const res = new HttpResponse(req, responseStatus, responseBody);

      console.log("Mock API request", req);
      console.log("Mock API response", res);

      if (responseStatus === HTTP_STATUS.OK)
        resolve(res);

      else
        reject(new ErrorResponse(res));

    }, delay);

  });

}
