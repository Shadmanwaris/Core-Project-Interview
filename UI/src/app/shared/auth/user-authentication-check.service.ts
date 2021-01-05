import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationCheckService {
  cookieValue: any;
  constructor (private cookieService: CookieService) { }

  getHeader() {
    let headers = new HttpHeaders();
    this.cookieValue = this.cookieService.get('token');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'bearer ' + this.cookieValue);

    return headers;
  }


  getHeaderWithMultipart() {
    let headers = new HttpHeaders();
    this.cookieValue = this.cookieService.get('token');
    //  headers = headers.set('mimeType', "multipart/form-data");
    headers = headers.set('Accept', "multipart/form-data");
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'bearer ' + this.cookieValue);

    return headers;
  }
}