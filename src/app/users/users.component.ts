import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../api/users/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {UserModel} from '../api/users/user.model';
import {startWith, map, tap, delay} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteConfirmComponent} from '../dialog-delete-confirm/dialog-delete-confirm.component';
import {dateFormatter} from '../shared/date.formatter';
import {UserCreateComponent} from '../user-create/user-create.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  userList: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();
  displayedColumns: string[] = ['id', 'pic', 'name', 'surname', 'email', 'phone', 'role', 'created at', 'edit', 'delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private dialog : MatDialog) {}

  applyFilter(filterValue: string) { this.userList.filter = filterValue.toLowerCase(); }

  dateFormatterU(s){
    return dateFormatter(s);
  }

  ngOnInit(): void { this.getUserData(); }

  openCreateDialog(){
    const dialogRef = this.dialog.open(UserCreateComponent, {panelClass: 'createDialogPanel'});
  }

  editUser(){

  }

  deleteUser(usr){
    this.userService.deleteUser(usr);
  }

  openDeleteDialog(usr){
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent, {data: usr, panelClass: 'dialogPanel'});
    dialogRef.afterClosed().subscribe(result => { if (result) this.deleteUser(usr); });
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
        data.profile.phoneNumber + data.id +
        dateFormatter(data.created_at);
      let chunks = filter.match(/\S+/g);
      let ret : boolean = false;
      chunks.every((i) => { 
        ret = dataStr.indexOf(i) !== -1;
        return ret;
      });
      return ret;
    };
  }

  async getUserData() {
    await this.userService.getUserModel()
      .pipe(
        map((response: UserModel[]) => {
        response.sort((a, b) => {
          return new Date(a.created_at).getTime() < new Date(b.created_at).getTime() ? 1 : -1;
        });
        this.userList.data = response;
    })).subscribe();
  }

  sortData() {
    this.userList.sortingDataAccessor = (item: UserModel, property) => {
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
