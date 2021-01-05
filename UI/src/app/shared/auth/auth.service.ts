import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { AuthInterceptor } from './authconfig.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/api';
  headers: any;
  headersWithMultipart: any;
  currentUser = {};

  constructor (private http: HttpClient, public router: Router, private userGetHeader: AuthInterceptor, private cookieService: CookieService) {
    this.headers = this.userGetHeader.getHeader();
    this.headersWithMultipart = this.userGetHeader.getHeaderWithMultipart();
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  isLoggedInUser() {
    return this.cookieService.get('token');
  }

  deleteToken() {
    return this.cookieService.delete('token');
  }

  Logout() {
    return this.http.get(this.endpoint + 'userLogout');
  }

  login(data: any) {
    console.log(data);
    return this.http
      .request('post', Location.joinWithSlash(`${this.endpoint}`, `login`), {
        observe: 'response',
        headers: this.headers,
        body: JSON.stringify(data),
      })
      .pipe(
        map((response: any) => {
          switch (response.status) {
            case 200: {
              return response.body;
            }
          }
        })
      );
  }

  userSignUp(data: any) {
    console.log(data);
    return this.http
      .request('post', Location.joinWithSlash(`${this.endpoint}`, `register`), {
        observe: 'response',
        headers: this.headers,
        body: JSON.stringify(data),
      })
      .pipe(
        map((response: any) => {
          switch (response.status) {
            case 200: {
              return response.body;
            }
          }
        })
      );
  }

  verifyUser(data: any) {
    return this.http
      .request(
        'post',
        Location.joinWithSlash(`${this.endpoint}`, `user-verify`),
        {
          observe: 'response',
          headers: this.headers,
          body: JSON.stringify(data),
        }
      )
      .map((response: any) => {
        switch (response.status) {
          case 200: {
            return response.body;
          }
        }
      });
  }
}
