import {Component, OnInit} from '@angular/core';
import {UsersService} from '../api/users/users.service';
import {User} from '../api/users/user.model';

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
    this.users.getUsers().subscribe(val => { this.userList = val; console.log(this.userList) }, err => console.error("ERROR: ", err));
  }

}
