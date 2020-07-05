import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../api/users/users.service";
import {
  confirmPasswordValidator,
  getFormValidationErrors,
} from "../shared/validators/confirmPassword.validator";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  // function name was same as method name of user service.
  async createNewUser() {
    this.myForm.patchValue({
      profileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png",
      full_name: `${this.myForm.value.name} ${this.myForm.value.surname}`,
    });
    if (this.myForm.valid) {
      await this.userService.createUser(this.myForm.value).subscribe(
        (res) => console.log("Res: ", res),
        (err) => console.error("Err: ", err)
      );
    } else {
      getFormValidationErrors(this.myForm);
    }
  }

  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.myForm.patchValue({ profile: event.target.result.toString() });
      };
    }
  }

  buildForm() {
    this.myForm = this.fb.group(
      {
        name: ["MOT", Validators.required],
        role: ["staff", [Validators.required]],
        email: ["l@l.l", [Validators.required, Validators.email]],
        phoneNumber: [
          "3213213",
          [Validators.required, Validators.pattern("^[0-9]*$")],
        ],
        surname: ["hey", Validators.required],
        full_name: [""], // if you want to have validators for this field you need to monitor your input fields with method onKeyup... so you can know name or surname is added then join them.
        profileUrl: [""],
        password: ["", [Validators.required]],
        password_confirmation: ["", [Validators.required]],
        country: ["Maceee", [Validators.required]],
        is_active_account: [true, []],
      },
      {
        validator: confirmPasswordValidator(
          "password",
          "password_confirmation"
        ),
      }
    );
  }

  // Abstract Control
  get f() {
    return this.myForm.controls;
  }

  ngOnInit(): void {
    this.buildForm();
  }
}
