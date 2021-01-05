import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../shared/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userData: any;
  errorStatus = false;
  errorMessage: any = '';
  serverErrorMessages: any;
  hide = true;

  constructor (private cookieService: CookieService, private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(async (resmsg: any) => {
      if (resmsg.success == true) {

        this.cookieService.delete('token');
        var expire = new Date();
        var time = Date.now() + ((3600 * 1000) * 6);
        expire.setTime(time);
        await this.cookieService.set('token', resmsg.data.token, expire);
        this.userData = {
          fullName: resmsg.data.fullName,
          last_login: resmsg.data.last_login,
          email: resmsg.data.email
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['/dashboard']);
        console.log('Logged INnnnnn');
      } else {
        this.errorStatus = true;
        this.errorMessage = resmsg.message;
      }
    }, err => {
      this.serverErrorMessages = err.error.message;
    });
  }

}
