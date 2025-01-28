import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {catchError, Observable, tap} from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  authForm!: FormGroup;

  error: boolean = false


  ngOnInit() {
    this.createAuthForm()
  }

  createAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  constructor(private adminService: AdminService, private formBuilder: FormBuilder,private cookieService: CookieService,private router:Router) {
  }

  authSubmit() {
    this.adminService.signIn(this.authForm.value)
      .pipe(
        tap((response: any) => {
          this.error = false
          let expires = new Date();
          expires.setHours(expires.getHours() + 10);
          this.cookieService.set('access_token', response.access_token, expires);


          this.router.navigateByUrl("admin")

        }),
        catchError((error: any): Observable<any> => {
          this.error = true
          throw error;
        })
      )
      .subscribe()
  }
}
