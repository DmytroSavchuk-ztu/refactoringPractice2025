import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {imageUrl} from "../../config/Urls/urls";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crew-page',
  templateUrl: './crew-page.component.html',
  styleUrls: ['./crew-page.component.css']
})
export class CrewPageComponent implements OnInit {

  imagePath = imageUrl
  crews: any;

  constructor(private adminService: AdminService,private router:Router) {
  }

  ngOnInit() {
    this.getCrews()
  }



  isFirstWithFilter(index: number, crew: any): boolean {
    return !this.crews.slice(0, index).some((c:any) => c.filter === crew.filter);
  }

  getFilterDisplayValue(filter: string): string {
    return filter === 'Producer' ? 'Producers' : filter;
  }

  getCrews() {
    this.adminService.getCrews()
      .pipe(
        tap((response: any) => {
          this.crews = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  navigateToDetails(crew:any) {
    if (crew.page){
      this.router.navigateByUrl('/team/'+crew.id)
    }
  }
}
