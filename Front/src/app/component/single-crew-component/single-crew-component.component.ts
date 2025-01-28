import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";
import {imageUrl} from "../../config/Urls/urls";

@Component({
  selector: 'app-single-crew-component',
  templateUrl: './single-crew-component.component.html',
  styleUrls: ['./single-crew-component.component.css']
})
export class SingleCrewComponentComponent implements OnInit {

  crewId:any;

  crew:any;

  imagePath = imageUrl;

  ngOnInit() {
    this.crewId = this.route.snapshot.paramMap.get('id');
    this.getCrew()
  }

  constructor(private adminService: AdminService, private route: ActivatedRoute) {}

  getCrew(){
    this.adminService.getCrewById(this.crewId)
      .pipe(
        tap((response: any) => {
          this.crew = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }
}
