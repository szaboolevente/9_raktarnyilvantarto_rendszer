import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  products: Product[] = [];
  orderForm !: FormGroup;

  constructor(private orderService : OrderService,
              private productService : ProductService,
              private pb : FormBuilder,
              private userService: UserService) { }

  async ngOnInit() {
    this.orderForm = this.pb.group({
      customerName: ['', [Validators.required, Validators.maxLength(256)]],
      customerEmail: ['', [Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
      product: ['', [Validators.required]],
      orderDate: [new Date(Date.now()).toJSON().slice(0, 10), [Validators.required]],
      amount: [1, [Validators.required, Validators.min(1)]]
    });

    try {
      this.products = await this.productService.getProducts();
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
    }
  }

  async addOrder() {
    if(!this.orderForm.valid){
      return;
    }

    const newOrder : Order = this.orderForm.value;
    /*newOrder.product.parts = [];
    newOrder.product.requiredProducts = [];*/
    try {
      const insertedOrder : any = await this.orderService.saveOrder(newOrder);
      if(insertedOrder){
        alert(insertedOrder.message);
        this.orderForm.setValue({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          product: '',
          orderDate: new Date(Date.now()).toJSON().slice(0, 10),
          amount: 1
        });
      }
    } catch(err : any) {
      this.userService.handleUserError(err);
      console.log(err);
      alert(err.error.message);
    }
  }
}
