import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../api/users/user.model';
import {UsersService} from '../api/users/users.service';
import {Observable} from 'rxjs';
import {map, filter, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {dateFormatter} from '../shared/date.formatter';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteConfirmComponent} from '../dialog-delete-confirm/dialog-delete-confirm.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  myForm: FormGroup;

  user: Users;

  loaded: boolean = false;

  id: number;

  constructor(private fb : FormBuilder, private userS : UsersService, private route : ActivatedRoute, private dialog: MatDialog) { }

  editHandle(){
    // PATCH request to change values
    console.log(this.myForm.value);
  }

  revertForm(){
    this.buildForm();
  }

  deleteUser(){
    this.userS.deleteUser(this.user);
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent, {data: this.user, panelClass: 'dialogPanel'});
    dialogRef.afterClosed().subscribe(result => { if (result) this.deleteUser(); });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.myForm.patchValue({ profile: event.target.result.toString() });
      }
    }
  }

  buildForm(){
    this.myForm = this.fb.group(
      {
        name: [this.user.name, Validators.required], 
        surname: [this.user.profile.surname, Validators.required],
        number: [this.user.profile.phoneNumber, [Validators.required, Validators.pattern("^[0-9]*$")]],
        role: [this.user.role, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]], 
        profile: [this.user.profile.profileUrl, [Validators.required]],
        //password: [, Validators.required], 
        //confirmPassword: [, Validators.required], 
      }
    );
  }

  ngOnInit(): void {
    this.getUser(); 
  }

  async getUser(){
    await this.route.paramMap.subscribe(params => this.id = +params.get('id'));
    await this.userS.getUser(this.id).subscribe(res => { this.user = res; this.buildForm(); });  
  }
}
