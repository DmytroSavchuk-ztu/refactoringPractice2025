import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {imageUrl} from "../../config/Urls/urls";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,private meta:Meta,private title:Title) {

this.meta.addTags([
  {name: 'description', content: 'Home page of SEO friendly app'},
  {name: 'author', content: 'buttercms'},
  {name: 'keywords', content: 'Angular, ButterCMS'}
]);
    this.setTitle('Home Page');
  }


  setTitle(newTitle:string){
    this.title.setTitle(newTitle)
  }


  text: any

  emailForm!: FormGroup;

  partners:any

  imagePath = imageUrl

  ngOnInit() {
    this.getText()
    this.getPartners()
    this.createEmailForm()
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
        items: 4
      }
    },
    nav: true
  }



  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
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

  getPartners() {

    this.adminService.getPublishedPartner()
      .pipe(
        tap((response: any) => {
          this.partners = response
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
