import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { auth } from 'express-oauth2-jwt-bearer'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string
  private AUTH0_DOMAIN: string

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? ''
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? ''
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    const checkJWT = auth({
      audience: this.AUTH0_AUDIENCE,
      issuerBaseURL: this.AUTH0_DOMAIN,
      tokenSigningAlg: 'RS256',
    })

    return new Promise((resolve, reject) => {
      checkJWT(request, response, err => {
        if (err) {
          return reject(new UnauthorizedException(err))
        }
        resolve(true)
      })
    })
  }
}
