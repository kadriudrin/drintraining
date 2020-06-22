import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../api/users/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Users} from '../api/users/user.model';
import {startWith, map, tap, delay} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  userList: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['id', 'pic', 'name', 'surname', 'email', 'phone', 'role', 'created at', 'edit', 'delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UsersService) {
  }

  applyFilter(filterValue: string) {
    this.userList.filter = filterValue.toLowerCase();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  dateFormatter(dt: string) {
    const d: Date = new Date(dt);
    return d.toLocaleString().split(',')[0];
  }

  ngAfterViewInit() {
    this.userList.paginator = this.paginator; // apply the paginator after view has initialized.
    this.userList.sort = this.sort; // apply the sort after view has initialized.

    this.userList.filterPredicate = (data, filter) => {
      const dataStr =
        data.email.toLowerCase() +
        data.role.toLowerCase() +
        data.profile.name.toLowerCase() +
        data.profile.surname.toLowerCase() +
        data.profile.phoneNumber + data.id;
      let chunks = filter.match(/\S+/g);
      let ret : boolean = false;
      chunks.forEach((i, x) => { 
        ret = dataStr.indexOf(i) !== -1;
      });
      return ret;
    };
  }

  async getUserData() {
    await this.userService.getUsers()
      .pipe(
        map((response: Users[]) => {
        response.sort((a, b) => {
          return new Date(a.created_at).getTime() < new Date(b.created_at).getTime() ? 1 : -1;
        });
        this.userList.data = response;
    })).subscribe();
  }

  sortData() {
    this.userList.sortingDataAccessor = (item: Users, property) => {
      switch (property) {
        case 'surname':
          return item.profile.surname;
        case 'phone':
          return item.profile.phoneNumber;
        case 'created at':
          return new Date(item.created_at).getTime();
        default:
          return item[property];
      }
    };
  }


}
