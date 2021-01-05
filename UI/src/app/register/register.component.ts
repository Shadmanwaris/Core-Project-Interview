import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { CommonserviceService } from '../shared/commonservice.service';
import { ConfirmedValidator } from '../shared/confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  countries: [] = [];
  registerationList: [] = [];
  registerationForm: FormGroup;
  durationInSeconds = 5;

  action: boolean = true;
  hide = true;

  constructor (private fb: FormBuilder, private commonService: CommonserviceService, private router: Router, private authService: AuthService) {
    this.registerationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      mobileno: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'confirm')
    });
  }

  ngOnInit(): void {

    this.getCountry();

  }





  onRegisteration() {
    this.authService.userSignUp(this.registerationForm.value).subscribe((res: any) => {
      if (res.success == true) {
        this.router.navigate(['/login']);
        this.registerationForm.reset();
      }
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.registerationForm.controls[fieldName].invalid &&
      (this.registerationForm.controls[fieldName].dirty || this.registerationForm.controls[fieldName].touched);
  }



  getCountry() {
    this.commonService.getCountryList().subscribe((result) => {
      var obj: any = result;
      var countryObj;
      var countryData: any = [];
      Object.keys(obj).forEach(function (k: any) {
        countryObj = {
          abbreviation: obj[k].name,
          name: obj[k].name
        };
        countryData.push(countryObj);
      });
      this.countries = countryData;

    });
  }
}
