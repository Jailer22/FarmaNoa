import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient, private router:Router) { }

  public urlLocal:string ="http://162.5.1.127:3000"

  /**
   * funcionalidad para realiza una petición post
   * @param url 
   * @param data 
   * @returns 
   */
  Post(url:string,data:{}){
    let promise = new Promise((resolve,reject)=>{

      this.http.post(url,data)
      .toPromise()
      .then(
        (res:any) =>{
          if(res.redireccion == true){
            this.router.navigate(['/login'])
          }
        resolve(res)
      }
    )
  })

return promise
    
}

/**
 * funcionalidad para realizar petición get
 * @param url 
 * @returns 
 */
  Get(url:string){
    let promise = new Promise((resolve,reject)=> {

      this.http.get(url)
      .toPromise()
      .then(
        (res:any) =>{
          if(res.redireccion == true){
            this.router.navigate(['/login'])}
        resolve(res)
      }
    )
    
  })
return promise
    
  }
}
