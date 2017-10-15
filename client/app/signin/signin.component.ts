import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.signinForm = this.fb.group({
      email: ['', 
        Validators.required
      ],
      password: ['',
        Validators.required
      ],
      remember: false
    });
  }

  onSubmit() {
    this.user = this.signinForm.value;
    this.userService.authenticateUser(this.user) 
      .subscribe(data => {
        console.log(data); 
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/');
      },
                error => {console.error(error); this.router.navigateByUrl('/signin');});
    this.signinForm.reset();
    
  }

}
