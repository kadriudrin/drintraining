import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../api/users/users.service';
import {User} from '../api/users/user.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'pic', 'name', 'surname', 'email', 'phone', 'role'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private users : UsersService) {
  }
  
  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.userList.paginator = this.paginator;
    this.userList.sort = this.sort;
    this.users.getUsers().subscribe(val => { 
      this.userList.data = val; 
      console.log(this.userList.data); 
    }, err => console.error("ERROR: ", err));
  }
}
