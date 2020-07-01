import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../api/users/user.model';
import {UserService} from '../api/users/users.service';
import {confirmPasswordValidator} from '../shared/validators/confirmPassword.validator';
import {ProfileModel} from '../api/profile/profile.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  createUser(){
    let newUser : UserModel = new UserModel({ 
      name: this.myForm.value.name,
      email: this.myForm.value.email,
      role: this.myForm.value.role,
      profile: new ProfileModel({ surname: this.myForm.value.surname, phoneNumber: this.myForm.value.phone, profileUrl: this.myForm.value.profile }),
    });
    this.userService.createUser(newUser).subscribe(res => console.log("Res: ", res), err => console.error("Err: ", err));
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
        name: ['d', Validators.required], 
        surname: ['d', Validators.required],
        number: [43, [Validators.required, Validators.pattern("^[0-9]*$")]],
        role: ['staff', [Validators.required]],
        email: ['d@d.d', [Validators.required, Validators.email]], 
        profile: ['lesh', [Validators.required]],
        password: ['a', [Validators.required]], 
        confirmPassword: ['a', [Validators.required, confirmPasswordValidator]],
        country: ['d', [Validators.required]],
        is_active_account: [, []],
      }
    );
  }
 
  ngOnInit(): void {
    this.buildForm();
  }

}
