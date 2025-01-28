import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {catchError, Observable, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrls: ['./vacancy-page.component.css']
})
export class VacancyPageComponent implements OnInit,AfterViewInit {


  dtOptions: DataTables.Settings = {

    responsive: {
      details: {
        type: 'column'
      }
    }

  };

  vacancy: any;
  job: any;

  baseUrl = window.location.protocol + "//" + window.location.host;

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.adminService.getVacancy()
          .subscribe(resp => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp
            });
          });
      },
      columns: [
        {title: 'Specialization', data: 'specialization'},
        {title: 'Position/Title', data: 'jobTitle'},
        {title: 'Location', data: 'location'},
        {title: 'Qualification', data: 'qualification'},
        {title: 'Job Description', data: 'jobDescription', className: 'none'},
        {title: 'Job Requirements', data: 'jobRequirements', className: 'none'},
        {
          title: 'Project',
          data: null, // Because it doesn't map to any specific data property
          defaultContent: '<button class="button">apply</button>', // Default button
          render: (data, type, full) => {
            if (full.project){
              return `<a style="color: black" href="${this.baseUrl}/projects/${full.project.id}">${full.project.projectTitle}</a>`;
            }

            return '';
          }
        },
        {
          title: '',
          data: null, // Because it doesn't map to any specific data property
          defaultContent: '<button class="button">apply</button>', // Default button
          render: (data, type, full) => {
            if (full.vacancyUrl){
              return `<button data-url="${full.vacancyUrl}" class="apply-btn bat">apply</button>`;
            }
          return '';
          }
        }

      ],
      responsive: true,
      ordering:false
    };


    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['id']) {
        this.getJob(+queryParams['id']);
      } else {
        this.getVacancy();
      }
    });
  }

  ngAfterViewInit() {
    $('#ta').on('click', '.apply-btn', (event) => {
      const url = $(event.target).data('url');
      if (url) {
        this.goByUrl(url);
      }
    });
  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  getJob(id: number) {
    this.adminService.getVacancyById(id)
      .pipe(
        tap((response: any) => {

          this.job = response
          this.router.navigateByUrl('jobs?id=' + id)
          setTimeout(()=>{ this.scrollTop()},100)

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  getVacancy() {
    this.adminService.getPublishedVacancy()
      .pipe(
        tap((response: any) => {
          this.vacancy = response
          this.job = null
          this.router.navigateByUrl('jobs')
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

  goToSingleJob(id: number) {
    this.router.navigateByUrl('jobs/' + id)
  }


  isExpanded(row: any) {
    return row.isExpanded;
  }

  isNotExpanded(row: any) {
    return !row.isExpanded;
  }

}
