import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {imageUrl} from "../../config/Urls/urls";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

imagePath = imageUrl
  constructor(private route:ActivatedRoute,private adminService: AdminService, private router:Router,private meta:Meta,private title:Title) {

    this.meta.addTags([
      {name: 'description', content: 'Home page of SEO friendly app'},
      {name: 'author', content: 'buttercms'},
      {name: 'keywords', content: 'News, ButterCMS'}
    ]);
    this.setTitle('News Page');
  }
  setTitle(newTitle:string){
    this.title.setTitle(newTitle)
  }

  imageStyles:any = {};
  news: any;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params['tags']) {
        this.getNewsByTag(params['tags']);
      } else {
        this.getNews();
      }
    });

  }

  getNews() {
    this.adminService.getPublishedNews()
      .pipe(
        tap((response: any) => {
          this.news = response
          this.setImagesStyles();

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  getNewsByTag(tag: string) {
    this.adminService.getNewsByTag(tag)
      .pipe(
        tap((response: any) => {
          this.news = response
          this.setImagesStyles();
          this.router.navigate([], {queryParams: {tags: tag}});
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  setImagesStyles() {
    for (let item of this.news) {
      const img = new Image();
      img.src = this.imagePath + item.titlePhotoUrl;

      img.onload = () => {
        if (img.naturalWidth > img.naturalHeight) {
          this.imageStyles[item.id] = {'max-width': '600px'};
        } else {
          this.imageStyles[item.id] = {'max-width': '258px'};
        }
      };
    }
  }

  redirectToDetailsPage(id: number) {
    this.router.navigate(['/news/' + id]);
  }
}
