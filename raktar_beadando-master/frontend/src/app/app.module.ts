import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PartsComponent } from './parts/parts.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddPartComponent } from './parts/add-part/add-part.component';
import { IncreasePartAmountComponent } from './parts/increase-part-amount/increase-part-amount.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogedInContainerComponent } from './loged-in-container/loged-in-container.component'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PartsComponent,
    ProductsComponent,
    OrdersComponent,
    AddOrderComponent,
    AddProductComponent,
    AddPartComponent,
    IncreasePartAmountComponent,
    LoginComponent,
    RegisterComponent,
    LogedInContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
