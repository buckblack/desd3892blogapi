import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookieService:CookieService, private route:Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' +this.cookieService.get('token')
        });
        request = request.clone({
            headers: headers 
        });
        return next.handle(request).pipe(catchError(err=>{
            if (err.status === 401) {
                this.route.navigate(['/401']);
            }
            if(err.status === 403)
            {
                this.route.navigate(['/403']);
            }
            return throwError("If you have trouble, please contact system admin:");
        }));
    }
}