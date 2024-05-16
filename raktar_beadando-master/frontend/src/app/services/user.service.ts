import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/user';
  private currentUser : User | null = null;
  private token : string = "";

  constructor(private http: HttpClient,
              private router: Router) { }

  async login(user: User) {
    const response: any = await lastValueFrom(this.http.post(`${this.baseUrl}/login`,user));
    this.token = response.auth;
    this.currentUser = response.user;

    return new Promise(async (resolve, reject) => {
      resolve(response.message);
    });
  }

  signUp(user: User) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/signup`, user));
  }

  hasUser() {
    return this.currentUser !== null && this.token !== "";
  }

  logout() {
    this.currentUser = null;
    this.token = "";
    this.router.navigate(['/login']);
  }

  getAccesToken() {
    return new HttpHeaders({
      "auth_t" : this.token
    });
  }

  handleUserError(err: any) {
    if(err instanceof HttpErrorResponse) {
      if(err.status === 401) {
        this.logout();
        alert("Újra be kell jelentkezni!");
        return;
      }
    }
  }
}
