import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { lastValueFrom } from 'rxjs';
import { Part } from '../models/Part';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private baseUrl = 'http://localhost:5000/api/part';
  constructor(private http: HttpClient,
              private userService: UserService) {}

  getParts() {
    return lastValueFrom(this.http.get<Part[]>(this.baseUrl, {
      headers: this.userService.getAccesToken()
    }));
  }

  savePart(part: Part) {
    return lastValueFrom(this.http.post<Part>(this.baseUrl, part, {
      headers: this.userService.getAccesToken()
    }));
  }

  deletePart(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.userService.getAccesToken()
    }));
  }

  increasePartAmount(id: number, amount: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/${id}`,{},{
      params: {
        amount: amount
      },
      headers: this.userService.getAccesToken()
    }));
  }
}
