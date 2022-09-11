import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private error: ErrorResponse;
  private logger: Logger = new Logger('PrismaExceptionFilter');

  private ErrorFunction: Record<
    string,
    (exception: Prisma.PrismaClientKnownRequestError) => void
  > = {
    P2002: (exception: Prisma.PrismaClientKnownRequestError) =>
      this.setError(HttpStatus.BAD_REQUEST, exception),
  };

  setError(
    statusCode: HttpStatus,
    exception: Prisma.PrismaClientKnownRequestError,
  ): void {
    console.log('exception', exception.message);
    this.logger.verbose(exception);
    this.error = {
      statusCode: statusCode,
      message: exception.message,
      error: exception.name,
    };
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const func = this.ErrorFunction[exception.code];
    if (func) func(exception);
    else this.setError(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    return response.status(this.error.statusCode).json(this.error);
  }
}
