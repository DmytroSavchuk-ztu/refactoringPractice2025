import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {imageUrl} from "../../config/Urls/urls";

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css']
})
export class ProjectDetailsPageComponent implements OnInit {

  imagePath = imageUrl
  projectId: any;
  project: any

  constructor(private adminService: AdminService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.getProject()
  }


  getProject() {
    this.adminService.getProjectById(this.projectId)
      .pipe(
        tap((response: any) => {
          this.project = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


}
