import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../api/users/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Users} from '../api/users/user.model';
import {map, tap} from 'rxjs/operators';

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit() {
    this.userList.paginator = this.paginator; // apply the paginator after view has initialized.
    this.userList.sort = this.sort; // apply the sort after view has initialized.
  }

  async getUserData() {
    await this.userService.getUsers().pipe(map((response: Users[]) => {
      // todo: maybe create a method because this is something that you would use often.
      response.sort((a, b) => {
        // descending order sort.
        return new Date(a.created_at).getTime() < new Date(b.created_at).getTime() ? 1 : -1;
      });
      this.userList.data = response;
    })).subscribe();
  }

  // todo: Here you can apply in depth different strategies for sorting ... depending if you ever need it.
  sortData() {
    this.userList.sortingDataAccessor = (item: Users, property) => {
      switch (property) {
        case 'surname':
          return item.profile.surname;
        case 'phone':
          return item.profile.phoneNumber;
        default:
          return item[property];
      }
    };
  }


}
