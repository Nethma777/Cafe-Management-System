import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm : any= FormGroup;
  responseMessage: any;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private SnackbarService:SnackbarService,  
    private dialogRef:MatDialogRef<ForgotPasswordComponent>
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm =  this.formBuilder.group({
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
  });
}

handleSubmit(){
  var formData = this.forgotPasswordForm.value;
  var data = {
   
    email:formData.email,
    
  }
 this.userService.forgotPassword(data).subscribe((response:any)=>{
    this.responseMessage = response?.message;
    this.dialogRef.close();
    this.SnackbarService.openSnackBar(this.responseMessage,"");
   
  },(error:any)=>{
    if(error.error?.message)
    {
      this.responseMessage = error.error?.message;
    }
    else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  })
  }

}
