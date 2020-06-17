import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerservService } from '../serverserv.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css'],
})
export class ResetpassComponent implements OnInit {
  newPassword;
  loader=false;
  valid=false;
  match=true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serv: ServerservService,
    private activatedRoute:ActivatedRoute
  ) {
    let data=this.serv.getResetDataFromLocalStorage();
    // console.log("token",data['resetToken'],this.activatedRoute.snapshot.params.token)
    // console.log("email",data['resetEmail'],this.activatedRoute.snapshot.params.email)
    if(data['resetToken']==this.activatedRoute.snapshot.params.token && data['resetEmail']==this.activatedRoute.snapshot.params.email){
      let timeStamp:Date=new Date(data['timestamp']);
      let currentTimeStamp:Date=new Date();
      let diff:any=Math.abs(timeStamp.valueOf()-currentTimeStamp.valueOf());
      console.log(diff)
      if(parseInt(data['expiry']) < diff){
        alert("Reset Link expired,try resting again ");
        this.clearLocalStorage();
        this.router.navigate(['forgot']);
      }
    }
    else{
      this.router.navigate(["/"]);
      alert("Reset link is broke...try reset the password again");
    }
    this.newPassword = this.fb.group({
      email:localStorage.getItem('resetEmail'),
      token:localStorage.getItem('resetToken'),
      password: this.fb.control('', [Validators.required]),
      confirm_password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  reset(){
    if(this.newPassword.valid){
      if(this.newPassword.value.password==this.newPassword.value.confirm_password){
        this.loader=true;
        this.serv.resetPassword(this.newPassword.value).subscribe((data)=>{
          this.loader=false;
          alert(data.message+",  Login with the new password");
          this.clearLocalStorage();
          this.router.navigate(["/"]);
        },(err)=>{
          console.log(err);
          this.loader=false;
        })
      }
      else{
        this.match=false;
      }
    }else{
      this.valid=true;
    }
  }
  clearLocalStorage(){
    localStorage.removeItem('resetToken');
        localStorage.removeItem('email');
        localStorage.removeItem('expiry');
        localStorage.removeItem('timestamp');
  }
}
