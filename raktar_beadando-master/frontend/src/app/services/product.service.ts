import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Product } from '../models/Product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/product';
  constructor(private http: HttpClient,
              private userService: UserService) {}

  getProducts() {
    return lastValueFrom(this.http.get<Product[]>(this.baseUrl, {
      headers: this.userService.getAccesToken()
    }));
  }

  saveProduct(product: Product) {
    return lastValueFrom(this.http.post<Product>(this.baseUrl, product, {
      headers: this.userService.getAccesToken()
    }));
  }

  deleteProduct(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.userService.getAccesToken()
    }));
  }
}
