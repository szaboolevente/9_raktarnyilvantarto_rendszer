import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Part } from 'src/app/models/Part';
import { PartService } from 'src/app/services/part.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-increase-part-amount',
  templateUrl: './increase-part-amount.component.html',
  styleUrls: ['./increase-part-amount.component.css']
})
export class IncreasePartAmountComponent implements OnInit {
  errorMessage ?: string;
  parts: Part[] = [];
  constructor(private partService: PartService,
              private userService: UserService) { }

  async ngOnInit() {
    try {
      this.parts = await this.partService.getParts();

      if(this.parts.length === 0) {
        this.errorMessage = "Nincsenek alkatrészek az adatbázisban!"
      }
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
      this.errorMessage = "Nem sikerült betölteni az alkatrészeket!";
    }
  }

  async increaseAmount(id: number, increase: HTMLInputElement) {
    const amount = parseInt(increase.value);
    if(isNaN(amount) || amount === 0){
      return;
    }

    try {
      const value : any = await this.partService.increasePartAmount(id, amount);
      if(value) {
        increase.value = "";
        this.parts = this.parts.map((value) => {
          if(value.id === id) {
            value.amount += amount;
          }
          return value;
        });
        alert("A mennyiség megváltozott!");
        return;
      }
    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
    }
    alert("Nem sikerült a mennyiséget megváltoztatni!");
  }
}
