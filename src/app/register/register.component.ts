import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ServerservService} from '../serverserv.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDetails;
  valid = false;
  loader=false;
  constructor(private fb: FormBuilder,
    private serv: ServerservService,
    private router: Router) { 
      this.registerDetails = this.fb.group({
        firstName: this.fb.control('', [Validators.required]),
        lastName: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required]),
      });
    }

  ngOnInit(): void {
  }
  register() {
    
    if (this.registerDetails.valid) {
      this.loader=true;
      // console.log(this.registerDetails.value);
      this.serv.register(this.registerDetails.value).subscribe(
        (data) => {
          this.loader=false;
         alert('Registration successfull');
          this.router.navigate(['/']);
        },
        (error) => {
          this.loader=false;
          alert(error.error.message);
        }
      );
    } else {
      this.valid = true;
    }
  }
}
