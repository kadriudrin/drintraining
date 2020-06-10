import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    userList : User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
    constructor(private users : UsersService) {
    }

  ngOnInit(): void {
        this.users.getUsers().subscribe(val => this.userList = val);
  }

}
