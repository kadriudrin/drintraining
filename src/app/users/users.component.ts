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

  applyFilter(filterValue: string) {
    this.userList.filter = filterValue.toLowerCase();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  dateFormatter(dt: string) {
    let d: Date = new Date(dt);
    return d.toUTCString();
  }

  ngAfterViewInit() {
    this.userList.paginator = this.paginator; // apply the paginator after view has initialized.
    this.userList.sort = this.sort; // apply the sort after view has initialized.
    /**
     * FilterPredicate checks if a data object matches the data source's filter string. By default, each data object
     * is converted to a string of its properties and returns true if the filter has
     * at least one occurrence in that string. By default, the filter string has its whitespace
     * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
     * filter matching.
     * @param data Data object used to check against the filter.
     * @param filter Filter string that has been set on the data source.
     * @returns Whether the filter matches against the data
     */

    this.userList.filterPredicate = (data, filter) => {
      const dataStr = data.email.toLowerCase() +
        data.role.toLowerCase() +
        data.profile.name.toLowerCase() +
        data.profile.surname.toLowerCase() +
        data.profile.phoneNumber + data.id;
      return dataStr.indexOf(filter) !== -1;
    };
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
        case 'created at':
          return new Date(item.created_at).getTime();
        default:
          return item[property];
      }
    };
  }


}
