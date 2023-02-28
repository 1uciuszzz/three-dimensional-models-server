export class Reply {
  private statusCode: number;
  private message: string;
  private payload: Object;

  constructor(statusCode: number, message: string, payload: Object) {
    this.statusCode = statusCode;
    this.message = message;
    this.payload = payload;
  }

  static success(
    statusCode: number = 200,
    message: string = "pong",
    payload: Object = {}
  ) {
    return new Reply(statusCode, message, payload);
  }

  static failed(
    statusCode: number = 500,
    message: string = "wait",
    payload: Object = {}
  ) {
    return new Reply(statusCode, message, payload);
  }
}
