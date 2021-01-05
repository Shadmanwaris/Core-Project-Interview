import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonserviceService } from '../shared/commonservice.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  students: [] = [];
  displayedColumns: string[] = ['name', 'email', 'mobile', 'dob', 'country', 'action'];
  dataSource = [];

  constructor (private commonService: CommonserviceService, public dialog: MatDialog, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getAllUser();
  }


  getAllUser() {
    this.commonService.getUserList().subscribe((response) => {
      this.dataSource = response.data;
      console.log(this.dataSource);
    });
  }

  openEditModal(user: any): void {

    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '50%',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteUser(userId: any) {
    this.commonService.deleteUser(userId).subscribe((response) => {
      console.log("Deleted");
      this.getAllUser();
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.clear();
    this.cookieService.delete('token');
    this.cookieService.deleteAll();
    this.router.navigateByUrl('');
  }

}
