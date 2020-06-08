import {Component, OnInit} from '@angular/core';
import {UsersService} from '../api/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private users: UsersService) {
    this.users.getUsers().subscribe(val => console.log('UsrComp: ', val));
  }

  ngOnInit(): void {
  }

}
