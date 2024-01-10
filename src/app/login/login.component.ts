import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  alert:any = false;
  textAlert: any;


  constructor(public router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit() {
  }

  get f() {
    this.alert = false
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let params = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      position: "1"
    };
    this.authService.getAuth(params).subscribe(
      res => {
        let data = {
          id: res["user_id"],
          name: res["user_firstname"] + " " + res["user_lastname"],
          image: res["image_url"]
        };
        if (res["user_status"] != 0) {
          localStorage.setItem("isLoggedin", "true");
          localStorage.setItem("logged_profile", JSON.stringify(data));
          this.router.navigate(["/"]);
        } else {
          this.alert = "show"
          this.textAlert = "คุณไม่สามารถเข้าสู่ระบบได้"
          this.loading = false;
        }
      },
      () => {
        this.alert = "show"
        this.textAlert = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
        this.loading = false;
      }
    );
  }
}
