import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonserviceService } from 'src/app/shared/commonservice.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  editForm: FormGroup;
  dataSource: [] = [];
  classData = [{
    value: "10th", name: "Matriculation"
  }, {
    value: "12th", name: "Intermediath"
  }, {
    value: "dip", name: "Diploma"
  }, {
    value: "grad", name: "Graduate"
  }, {
    value: "mas", name: "Master"
  }];
  displayedColumns: string[] = ['school', 'board', 'class', 'year', 'marks', 'subjects'];
  constructor (public dialogRef: MatDialogRef<EditModalComponent>, private fb: FormBuilder, private commonService: CommonserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editForm = this.fb.group({
      name: [''],
      mobileno: [''],
      dob: [''],
      educations: fb.array([])
    });

  }

  ngOnInit(): void {
    this.commonService.getEducation(this.data.user_id).subscribe((response) => {
      console.log(response.data);
      this.dataSource = response.data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  updateUser() {
    this.commonService.editUser(this.editForm.value, this.data.user_id).subscribe((response) => {
      if (response.success) {
        this.dialogRef.close();
      }
    });

  }

  get aliasesArrayControl() {
    return (this.editForm.get('educations') as FormArray).controls;
  }

  addNewEducation() {

    var add = this.editForm.get('educations') as FormArray;
    add.push(this.fb.group({
      school: [''],
      board: [''],
      class: [''],
      year: [''],
      marks: [''],
      subjects: ['']
    }));
  }



  saveEducation() {
    this.dataSource = this.editForm.value.educations;
    let oldArray = this.dataSource;
    let newArray = oldArray.reverse();
    let value = newArray[0];
    console.log(value);
    this.commonService.addEducation(value, this.data.user_id).subscribe((response) => {
      if (response.success == true) {
        console.log("Education Successfully Added");
      }
    });
  }

  deleteEducation(index: number) {
    const add = this.editForm.get('educations') as FormArray;
    add.removeAt(index);
  }


}
