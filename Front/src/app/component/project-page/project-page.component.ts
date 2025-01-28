import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {catchError, Observable, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {imageUrl} from "../../config/Urls/urls";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  imagePath = imageUrl
  projects: any;
  border: any;

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        this.getFilteredProjects(params['filter']);
      } else {
        this.getProjects();
      }
    });
  }


  getProjects() {
    this.adminService.getProjects()
      .pipe(
        tap((response: any) => {
          this.projects = response
          this.border = null
          this.router.navigate([], {queryParams: {}});
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  getFilteredProjects(filter: string) {

    this.adminService.getFilteredProjects(filter)
      .pipe(
        tap((response: any) => {
          this.projects = response
          this.border = filter
          this.router.navigate([], {queryParams: {filter: filter}});
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  redirectToProjectPage(id: number,landing:any) {
    if (landing === '' || landing === null){
      this.router.navigate(['/projects/' + id]);
    }
    else {
      window.location.href = landing
    }
  }


  navigateToDoc() {
    window.open('https://docs.google.com/presentation/d/15waBJ8YeSeyWP4ruohbJF0W7BvNpmEmc/edit?rtpof=true')

  }
}
