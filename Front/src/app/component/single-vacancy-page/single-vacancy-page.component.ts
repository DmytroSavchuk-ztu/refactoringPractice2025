import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";

@Component({
  selector: 'app-single-vacancy-page',
  templateUrl: './single-vacancy-page.component.html',
  styleUrls: ['./single-vacancy-page.component.css']
})
export class SingleVacancyPageComponent implements OnInit{



  job: any;
  jobId:any;

  constructor(private adminService: AdminService,private router:Router,private route:ActivatedRoute) {
  }


  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getJob(this.jobId);
  }


  getJob(id:number){
    this.adminService.getVacancyById(id)
      .pipe(
        tap((response: any) => {
          this.job = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  goByUrl(vacancyUrl: string) {
    window.location.href = vacancyUrl
  }


}
