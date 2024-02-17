import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request): Promise<boolean> {
    const received = request.headers['x-api-key'];
    if (!received) {
      throw new HttpException(
        `Header 'x-api-key' not received`,
        HttpStatus.UNAUTHORIZED,
      );
      return false;
    }
    try {
      const stored = this.configService.getOrThrow('SEC_API_KEY');
      if (stored !== received) {
        return false;
      }
      return true;
    } catch (e) {
      this.logger.fatal('Error while handling request', e.message);
      return false;
    }
  }
}
