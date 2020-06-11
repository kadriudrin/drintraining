<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {UsersService} from '../api/users/users.service';
=======
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
>>>>>>> 866c104ab2a4298aa00ed3a5969ee1880ac312c0

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

<<<<<<< HEAD
  constructor(private users: UsersService) {
    this.users.getUsers().subscribe(val => console.log('UsrComp: ', val));
  }
=======
    userList : User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
    constructor(private users : UsersService) {
    }
>>>>>>> 866c104ab2a4298aa00ed3a5969ee1880ac312c0

  ngOnInit(): void {
        this.users.getUsers().subscribe(val => this.userList = val);
  }

}
