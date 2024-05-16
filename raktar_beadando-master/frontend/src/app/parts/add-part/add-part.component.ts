import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Part } from 'src/app/models/Part';
import { PartService } from 'src/app/services/part.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {
  partForm !: FormGroup;
  constructor(private pb: FormBuilder,
              private partService: PartService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.partForm = this.pb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      date: [new Date(Date.now()).toJSON().slice(0, 10), Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  async addPart() {
    if(!this.partForm.valid){
      return;
    }

    const newPart : Part = {
      id: 0,
      name: this.partForm.get("name")!.value,
      receiptDate: this.partForm.get("date")!.value,
      amount: this.partForm.get("amount")!.value
    };

    try {
      const insertedPart = await this.partService.savePart(newPart);

      if(insertedPart){
        alert("Sikeres hozzáadás történt!");
        this.partForm.setValue({name: '', date: new Date(Date.now()).toJSON().slice(0, 10), amount: 1});
        return;
      }
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
    }
    alert("A hozzáadás nem sikerült!");
  }
}
