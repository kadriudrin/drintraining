import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../api/users/user.model';
import {UserService} from '../api/users/users.service';
import {Observable} from 'rxjs';
import {map, filter, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {dateFormatter} from '../shared/date.formatter';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteConfirmComponent} from '../dialog-delete-confirm/dialog-delete-confirm.component';
import {AuthenticationService} from '../api/authentication/authentication.service';
import {confirmPasswordValidator} from '../shared/validators/confirmPassword.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  myForm: FormGroup;

  user: UserModel;

  loaded: boolean = false;

  id: number;

  public isAdmin : boolean = false;

  constructor(private fb : FormBuilder, private userS : UserService, private route : ActivatedRoute, private dialog: MatDialog, private auth : AuthenticationService) { }

  editHandle(){
    let id = this.user.id;
    this.user = this.myForm.value; 
    console.log("Usr: ", this.user); 
    this.userS.editUser(this.user, id).subscribe(res => console.log("EditUser Res: ", res), err => console.error("EditUser Err: ", err)); 
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
        this.myForm.patchValue({ profile: { profileUrl: event.target.result.toString() } });
      }
    }
  }

  buildForm(){
    this.myForm = this.fb.group(
      {
        name: [this.user.name, Validators.required], 
        role: [this.user.role, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]], 
        password: ['', [confirmPasswordValidator(this.id)]], 
        confirmPassword: ['', [confirmPasswordValidator]],
        is_active_account: [this.user.is_active_account, [Validators.required]],

        number: [this.user.profile.phoneNumber, [Validators.required, Validators.pattern("^[0-9]*$")]],
        profileUrl: [this.user.profile.profileUrl, [Validators.required]],
        surname: [this.user.profile.surname, Validators.required],

        country: [this.user.location.country, [Validators.required]],
        city: [this.user.location.city, [Validators.required]],
        state: [this.user.location.state, []],
        street: [this.user.location.street, [Validators.required]],
        zip: [this.user.location.zip, [Validators.required]],
        lat: [this.user.location.lat, []],
        long: [this.user.location.long, []],
      }
    );
  }

  ngOnInit(): void {
    this.getUser(); 
  }

  async getUser(){
    if (this.isAdmin){
      //this.user = this.auth.currentUserValue
    }
    else {
      await this.route.paramMap.subscribe(params => this.id = +params.get('id'));
      await this.userS.getUser(this.id).subscribe(res => { this.user = res; this.buildForm(); });  
    }
  }
}
