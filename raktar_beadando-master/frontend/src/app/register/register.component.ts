import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm !: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(96)]],
      email: ['', [Validators.required, Validators.email]],
      emailAgain: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
      passwordAgain: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]]
    });

    this.regForm.get("emailAgain")?.addValidators((control: AbstractControl)=> {
      return this.regForm.get("email")?.value === control.value ? null : { notMatches : true };
    });
    this.regForm.get("passwordAgain")?.addValidators((control: AbstractControl)=> {
      return this.regForm.get("password")?.value === control.value ? null : { notMatches : true };
    });

    this.regForm.updateValueAndValidity();
  }

  async signup() {
    if(!this.regForm.valid) {
      return;
    }

    const newUser : User = {
      name: this.regForm.get("name")?.value,
      email: this.regForm.get("email")?.value,
      password: this.regForm.get("password")?.value
    }

    try {
      //FELHASZNÁLÓ KEZELŐ MŰVELETEK
      const response = await this.userService.signUp(newUser);
      if(!response) {
        return alert("Regisztráció sikertelen!");
      }

      alert("Sikeres regisztráció");
      this.router.navigate(['/login']);
    } catch(err) {
      console.log(err);
      alert((err as HttpErrorResponse).error)
    }
  }
}
