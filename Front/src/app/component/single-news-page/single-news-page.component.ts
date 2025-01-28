import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {imageUrl} from "../../config/Urls/urls";
import {Meta, Title} from "@angular/platform-browser";


@Component({
  selector: 'app-single-news-page',
  templateUrl: './single-news-page.component.html',
  styleUrls: ['./single-news-page.component.css']
})
export class SingleNewsPageComponent implements OnInit {

  imageLoaded: boolean = false;
  flexDirection: string = 'column';
  newsId: any
  news: any

  imagePath = imageUrl

  constructor(private meta:Meta,private title:Title,private adminService: AdminService, private route: ActivatedRoute,  private renderer: Renderer2, private el: ElementRef) {
    this.meta.addTags([
      {name: 'description', content: 'Home page of SEO friendly app'},
      {name: 'author', content: 'buttercms'},
      {name: 'keywords', content: 'News, ButterCMS'}
    ]);
  }
  setTitle(newTitle:string){
    this.title.setTitle(newTitle)
  }

  ngOnInit() {
    this.newsId = this.route.snapshot.paramMap.get('id');
    this.getNewsById()

  }


  setImageOrientation(event: any) {
    const imgElement = event.target;
    const parentSectionDiv = imgElement.closest('.section');

    if (imgElement.naturalWidth > imgElement.naturalHeight) {
      this.flexDirection = 'column';
      this.renderer.setStyle(parentSectionDiv, 'align-items', 'center');
      this.renderer.removeStyle(imgElement, 'margin-right'); // Удаляем margin-right для горизонтальных изображений
    } else {
      this.flexDirection = 'row';
      this.renderer.setStyle(parentSectionDiv, 'align-items', 'flex-start');
      this.renderer.setStyle(parentSectionDiv, 'gap', '10px'); // Добавляем margin-right для вертикальных изображений
    }

    this.renderer.setStyle(parentSectionDiv, 'flex-direction', this.flexDirection);
  }





  getNewsById() {
    this.adminService.getNewsById(this.newsId)
      .pipe(
        tap((response: any) => {
          this.news = response

          this.setTitle(this.news.title)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


}
