import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RouterService} from "./services/router.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "./services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front';
  isMenuOpen = false;

  emailForm!: FormGroup;

  success: boolean = false

  error: boolean = false

  buttons: any;

  constructor(private adminService: AdminService, private router: Router, public routeService: RouterService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createEmailForm()
    this.getButtons()
  }

  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getButtons() {
    this.adminService.getActiveButtons()
      .pipe(
        tap((response: any) => {
          this.buttons = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  submitEmail() {

    if (this.emailForm.valid) {
      this.adminService.postEmail(this.emailForm.value)
        .pipe(
          tap((response: any) => {
            this.emailForm.reset()
            this.success = true
            this.error = false
          }),
          catchError((error: any): Observable<any> => {
            throw error;
          })
        )
        .subscribe()
    } else {
      this.error = true
      this.success = false
    }


  }

  goToHome() {
    this.router.navigate(['/'])
    this.scrollTop()
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  altToggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    setTimeout(()=>{
      this.scrollTop()
    },100)

  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  getImageSrc(name:string) {
    switch(name) {
      case 'Telegram': return 'assets/smallDetails/telegram-icon-512x512-1s8w0tx0.png';
      case 'Linkedln': return 'assets/smallDetails/black+line+linkedin+social+icon-1320191608689709544.png';
      case 'Instagram': return 'assets/smallDetails/1658588801instagram-icon-png.png';
      case 'Facebook': return 'assets/smallDetails/Facebook+Icon+Black.png';
      case 'Viber': return 'assets/smallDetails/viber_black_logo_icon_147056.png';
      case 'YouTube': return 'assets/smallDetails/2111795.png';
      default: return 'assets/images/default.png';
    }
  }
}
