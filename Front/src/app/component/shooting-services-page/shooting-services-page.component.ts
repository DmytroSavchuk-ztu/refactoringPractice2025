import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {imageUrl} from "../../config/Urls/urls";

@Component({
  selector: 'app-shooting-services-page',
  templateUrl: './shooting-services-page.component.html',
  styleUrls: ['./shooting-services-page.component.css']
})
export class ShootingServicesPageComponent implements OnInit {

  constructor(private adminService: AdminService) {
  }

  text: any

  imagePath = imageUrl

  ngOnInit() {
    this.getText()
  }

  getText() {

    this.adminService.getText()
      .pipe(
        tap((response: any) => {
          this.text = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()

  }

  isVideo(url: string): boolean {
    const videoExtensions = [
      '.mp4', '.webm', '.ogg', '.ogv', '.avi',
      '.mov', '.wmv', '.m4v', '.mkv', '.flv', '.3gp'
    ];
    return videoExtensions.some(ext => url.endsWith(ext));
  }

}
