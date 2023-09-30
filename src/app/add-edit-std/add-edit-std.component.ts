import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-std',
  templateUrl: './add-edit-std.component.html',
  styleUrls: ['./add-edit-std.component.scss']
})
export class AddEditStdComponent implements OnInit {
  
  stdForm: FormGroup;
  education: string[] = ['Matric', 'Diploma', 'Intermediate', 'Graduation', 'Post Graduation'];
  genderlist: string[] = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    //get whole data
    private dialogref: MatDialogRef<AddEditStdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.stdForm = this.fb.group({
      firstname: '',
      lastname: '',
      fathername: '',
      email: '',
      dob: '',
      gen: '',
      qual: '',
      uniname: '',
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.stdForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.stdForm.valid)
    if(this.data){
      {
        this.service.updatestudent(this.data.id, this.stdForm.value).subscribe({
          next: (val: any) => {
            alert("Student data has been successfully updated");
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        });
      }

    }else{
      {
        this.service.addStd(this.stdForm.value).subscribe({
          next: (val: any) => {
            alert("Student data has been successfully added");
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        });
      }
    } 
  }
}
