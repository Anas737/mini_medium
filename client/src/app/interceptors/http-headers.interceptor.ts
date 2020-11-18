import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../auth/jwt';

@Injectable({
  providedIn: 'root',
})
export class HttpHeadersInterceptor implements HttpInterceptor {
  headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();

    if (token) {
      this.headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({
      setHeaders: this.headersConfig,
    });

    return next.handle(request);
  }
}
