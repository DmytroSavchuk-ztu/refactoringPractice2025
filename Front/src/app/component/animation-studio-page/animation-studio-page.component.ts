import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {imageUrl} from "../../config/Urls/urls";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-animation-studio-page',
  templateUrl: './animation-studio-page.component.html',
  styleUrls: ['./animation-studio-page.component.css']
})
export class AnimationStudioPageComponent implements OnInit{


imagePath = imageUrl
  constructor(private adminService:AdminService) {
  }

  text:any;

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


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


}
