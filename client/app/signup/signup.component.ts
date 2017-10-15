import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  user: User;
  data: any;

  validationMessages: any = {
    firstName: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'First Name must less than 25 characters.'
    },
    lastName: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'First Name must less than 25 characters.'
    },
    email: {
      required: 'First Name is required.',
      email: 'Email address is not in proper format.'
    },
    password: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'First Name must less than 25 characters.'
    }
  };

  formErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };



  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user = this.signupForm.value;
    this.userService.createUser(this.user)
      .subscribe(data => {this.data = data; console.log(typeof(data));},
                error => console.log(error),
                () => console.log("Complete"));
    this.signupForm.reset();
  }

  createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ],
      lastName: [null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ],
      email: [null, [
          Validators.required,
          Validators.email
        ]
      ],
      password: [null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ]
    });

    this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if(!this.signupForm) { return; }
    const form = this.signupForm;
    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
