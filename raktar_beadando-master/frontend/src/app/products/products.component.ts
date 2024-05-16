import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  errorMessage ?: string;
  constructor(private productService: ProductService,
              private userService: UserService) { }

  async ngOnInit() {
    try {
      this.products = await this.productService.getProducts();
      console.log(this.products);

      if(this.products.length === 0) {
        this.errorMessage = "Nincsenek termékek az adatbázisban!"
      }
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
      this.errorMessage = "Nem sikerült betölteni a termékeket!";
    }
  }

  async deleteProduct(id: number) {
    try {
      const returnValue : any = await this.productService.deleteProduct(id);
      if(returnValue) {
        this.products = this.products.filter(value => value.id !== id);
        console.log(returnValue.message);
        return;
      }
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
    }
    alert("A termék törlése nem sikerült!");
  }
}
