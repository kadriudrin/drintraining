import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../api/users/user.model';
import {UserService} from '../api/users/users.service';
import {confirmPassword} from '../shared/validators/confirmPassword.validator';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb : FormBuilder, private userS : UserService) { }

  createUser(){
    // Needs proper constructor
    let newUser: UserModel;
    newUser.name = this.myForm.value.name;
    newUser.profile.surname = this.myForm.value.surname;
    newUser.email = this.myForm.value.email;
    newUser.profile.phoneNumber = this.myForm.value.phone;
    newUser.role = this.myForm.value.role;
    newUser.profile.profileUrl = this.myForm.value.profile;
    
    console.log("Created New User: ", newUser);
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.myForm.patchValue({ profile: event.target.result.toString()});
      }
    }
  }

  buildForm(){
    this.myForm = this.fb.group(
      {
        name: [, Validators.required], 
        surname: [, Validators.required],
        number: [, [Validators.required, Validators.pattern("^[0-9]*$")]],
        role: [, [Validators.required]],
        email: [, [Validators.required, Validators.email]], 
        profile: [, [Validators.required]],
        password: [, [Validators.required]], 
        confirmPassword: [, [Validators.required, confirmPassword]],
        country: [, [Validators.required]],
        is_active_account: [, [Validators.required]],
      }
    );
  }
 
  ngOnInit(): void {
    this.buildForm();
  }

}
