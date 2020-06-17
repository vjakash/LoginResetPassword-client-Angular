import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerservService } from '../serverserv.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  findAccount;
  loader = false;
  valid = false;
  accountDetails = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serv: ServerservService
  ) {
    this.findAccount = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}
  back(){
    this.accountDetails=null;
  }
  find() {
    if(this.findAccount.valid){
      this.loader=true;
      this.serv.findAccount(this.findAccount.value).subscribe(
        (data) => {
          this.loader=false;
          this.accountDetails = data;
        },
        (err) => {
          this.loader=false;
          alert(err.error.message);
        }
      );
    }else{
      this.valid=true;
    }
    
  }
  sendVerification(){
    this.loader=true;
    this.serv.sendVerifictionMail(this.findAccount.value).subscribe((data)=>{
      this.loader=false;
      this.accountDetails=null;
      // console.log(data);
      alert(data['message']);
      this.accountDetails=null;
      this.serv.updateResetValInService(data);
    },(err)=>{
      this.loader=false;
      alert(err.error.message);
    });
    
  }
}
