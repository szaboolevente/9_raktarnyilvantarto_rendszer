import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    if(!this.loginForm.valid) {
      return;
    }

    const user : User = {
      name: "",
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value
    }

    try {
      const response = await this.userService.login(user);
      if(!response) {
        alert("Bejelentkezés sikertelen!");
        this.loginForm.get("password")?.setValue("");
        return;
      }

      this.router.navigate(['/menu']);
    } catch(err) {
      console.log(err);
    }
  }
}
