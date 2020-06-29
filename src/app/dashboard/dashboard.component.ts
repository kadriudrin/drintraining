import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private users : UserService) {

    }

  ngOnInit(): void {
  }

}
