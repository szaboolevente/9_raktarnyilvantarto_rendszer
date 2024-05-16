import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Part } from '../models/Part';
import { PartService } from '../services/part.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  parts: Part[] = []
  errorMessage ?: string = undefined;
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

  async deletePart(id: number) {
    try {
      const returnValue : any= await this.partService.deletePart(id);
      if(returnValue) {
        this.parts = this.parts.filter((value) => value.id !== id);
        alert(returnValue.message);
        return;
      }

    } catch(err) {
      this.userService.handleUserError(err);
      console.log(err);
    }
    alert("A törlés nem sikerült!");
  }
}
