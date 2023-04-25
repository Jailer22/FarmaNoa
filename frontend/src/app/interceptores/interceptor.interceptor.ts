import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}
  requestOption:any = {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(req.method == "GET"){

      this.requestOption = {
        headers:new HttpHeaders({"Content-Type": "application/json;charset=UTF-8" }),
        withCredentials:false
      }

    }
    else{
      console.log('interceptando peticion')
      this.requestOption = {
        header: new HttpHeaders({
          "Content-Type": "application/json;charset=UTF-8"}),withCredentials:true
      }
    }

    const reqClone = req.clone(this.requestOption)

    return next.handle(reqClone)



  }
}
