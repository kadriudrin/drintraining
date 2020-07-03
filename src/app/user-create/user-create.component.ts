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
    let newUser = this.myForm.value;
    newUser.profileUrl = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png";
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
        name: ['MOT', Validators.required], 
        role: ['staff', [Validators.required]],
        email: ['l@l.l', [Validators.required, Validators.email]], 

        phoneNumber: [3213213, [Validators.required, Validators.pattern("^[0-9]*$")]],
        surname: ['hey', Validators.required],
        profileUrl: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1024px-Google_Contacts_icon.svg.png', [Validators.required]],
      
        password: ['', [Validators.required, confirmPasswordValidator]], 
        confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
        country: ['Maceee', [Validators.required]],
        is_active_account: [true, []],
      }
    );
  }
 
  ngOnInit(): void {
    this.buildForm();
  }

}
