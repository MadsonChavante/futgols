import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from 'src/api/api.config';


@Injectable() 
export class HttpConfigInterceptor implements HttpInterceptor { 

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = API_CONFIG.token;

        if (token) {
            console.log("inter",token);
            request = request.clone({ headers: request.headers.set('X-Auth-Token', token) });
        }

        request = request.clone({ headers: request.headers.set('Accept', '*/*') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }));
    }
}
