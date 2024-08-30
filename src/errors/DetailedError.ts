export class DetailedError extends Error {
  public details: any;

  constructor(message: string, details: any) {
    super(message);
    this.name = "DetailedError";
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DetailedError);
    }
  }
}
