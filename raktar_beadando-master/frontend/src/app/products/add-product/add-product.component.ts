import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Part } from 'src/app/models/Part';
import { Product, ProductParts, ProductProducts } from 'src/app/models/Product';
import { PartService } from 'src/app/services/part.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm !: FormGroup;
  parts: Part[] = [];
  products: Product[] = [];
  addedParts: ProductParts[] = [];
  addedProds: ProductProducts[] = [];

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private partService: PartService,
              private userService: UserService) { }

  async ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      part: ['', []],
      partAmount: [1, [Validators.required, Validators.min(1)]],
      prod: ['', []],
      prodAmount: [1, [Validators.required, Validators.min(1)]]
    });

    try {
      this.parts = await this.partService.getParts();
      this.products = await this.productService.getProducts();
    } catch(err) {
      console.log(err);
    }
  }

  validInput() {
    if(!this.productForm.get("name")?.valid){
      return false;
    }
    if(this.addedParts.length < 1 && this.addedProds.length < 1) {
      return false;
    }

    return true;
  }

  addPart() {
    if(!this.productForm.get("partAmount")?.valid){
      return;
    }
    if(!this.productForm.get("part")?.value) {
      return
    }

    if(this.addedParts.filter((value) => value.part.id == this.productForm.get("part")?.value.id).length !== 0){
      this.addedParts = this.addedParts.map(value => {
        if(value.part.id == this.productForm.get("part")?.value.id) {
          value.amount += this.productForm.get("partAmount")?.value;
        }
        return value
      })
    } else {
      this.addedParts.push({
        amount: this.productForm.get("partAmount")?.value,
        part: this.productForm.get("part")?.value
      })
    }

    this.productForm.get("partAmount")?.setValue(1);
    this.productForm.get("part")?.setValue(null);
  }

  addProduct() {
    if(!this.productForm.get("prodAmount")?.valid){
      return;
    }
    if(!this.productForm.get("prod")?.value) {
      return
    }

    if(this.addedProds.filter((value) => value.requiredProduct.id == this.productForm.get("prod")?.value.id).length !== 0){
      this.addedProds = this.addedProds.map(value => {
        if(value.requiredProduct.id == this.productForm.get("prod")?.value.id) {
          value.amount += this.productForm.get("prodAmount")?.value;
        }
        return value
      })
    } else {
      this.addedProds.push({
        amount: this.productForm.get("prodAmount")?.value,
        requiredProduct: this.productForm.get("prod")?.value
      })
    }

    this.productForm.get("prodAmount")?.setValue(1);
    this.productForm.get("prod")?.setValue(null);
  }

  async addNewProduct() {
    if(!this.validInput()){
      return;
    }

    const newProduct : Product = {
      id: 0,
      name: this.productForm.get("name")?.value,
      parts: this.addedParts,
      requiredProducts: this.addedProds
    };

    try {
      const insertedProd = await this.productService.saveProduct(newProduct);
      if(insertedProd) {
        this.productForm.get("partAmount")?.setValue(1);
        this.productForm.get("part")?.setValue(null);
        this.productForm.get("prodAmount")?.setValue(1);
        this.productForm.get("prod")?.setValue(null);
        this.productForm.get("name")?.setValue("");
        this.addedParts = [];
        this.addedProds = [];

        this.products.push(insertedProd);

        alert("Sikeres termék felvitel történt!");

        return;
      }
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
    }
    alert("Új termék felvétele sikertelen!");
  }
}
