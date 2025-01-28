import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-adresses-page',
  templateUrl: './adresses-page.component.html',
  styleUrls: ['./adresses-page.component.css']
})
export class AdressesPageComponent implements OnInit{

  buttons:any;

  addresses:any;

  ngOnInit() {
    this.getButtons()
    this.getAddresses()
  }

  constructor(private adminService:AdminService) {
  }
  navigateToMap(address: string) {
    window.location.href = address
  }



  getAddresses() {
    this.adminService.getPublishedAddress()
      .pipe(
        tap((response: any) => {
          this.addresses = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
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
