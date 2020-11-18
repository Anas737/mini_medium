import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptor } from './http-headers.interceptor';

export const HttpHeadersInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
];
