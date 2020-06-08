import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    constructor(private users : UsersService) {
    }

  ngOnInit(): void {
        this.users.getUsers().subscribe(val => console.log("UsrComp: ", val));
  }

}
