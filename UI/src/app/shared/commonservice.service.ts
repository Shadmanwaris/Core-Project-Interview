import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { UserAuthenticationCheckService } from './auth/user-authentication-check.service';

@Injectable({
  providedIn: 'root'
})

export class CommonserviceService {
  private countryListApiUrl = environment.country_api_url;
  headers: any;
  basePath: any;
  headersWithMultipart: any;
  constructor (
    private http: HttpClient,
    private userGetHeader: UserAuthenticationCheckService

  ) {
    this.basePath = environment.apiBaseUrl;
    this.headers = this.userGetHeader.getHeader();
    this.headersWithMultipart = this.userGetHeader.getHeaderWithMultipart();
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  getCountryList() {
    return this.http.get(`${this.countryListApiUrl}`);
  }

  getUserList() {
    // let headers = this.getHeader();
    return this.http
      .request(
        'get',
        Location.joinWithSlash(`${this.basePath}`, `get-user`),
        {
          headers: this.userGetHeader.getHeader(),
          observe: 'response',
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

  editUser(data: any, id: any) {
    return this.http
      .request(
        'put',
        Location.joinWithSlash(`${this.basePath}`, `edit-user/${id}`),
        {
          headers: this.userGetHeader.getHeader(),
          observe: 'response',
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

  addEducation(data: any, id: any) {
    return this.http
      .request('post', Location.joinWithSlash(`${this.basePath}`, `addEducation/${id}`), {
        observe: 'response',
        headers: this.headers,
        body: JSON.stringify(data),
      })
      .map((response: any) => {
        switch (response.status) {
          case 200: {
            return response.body;
          }
        }
      });

  }

  getEducation(id: any) {
    // let headers = this.getHeader();
    return this.http
      .request(
        'get',
        Location.joinWithSlash(
          `${this.basePath}`,
          `getEducation/${id}`
        ),
        {
          headers: this.userGetHeader.getHeader(),
          observe: 'response',
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

  deleteUser(userId: any) {
    return this.http
      .request(
        'delete',
        Location.joinWithSlash(
          `${this.basePath}`,
          `delete-user/${userId}`
        ),
        {
          headers: this.userGetHeader.getHeader(),
          observe: 'response',
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
