import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";
import {AdminService} from "../../services/admin.service";


import {imageUrl} from "../../config/Urls/urls";


@Component({
  selector: 'app-single-project-page',
  templateUrl: './single-project-page.component.html',
  styleUrls: ['./single-project-page.component.css'],
})
export class SingleProjectPageComponent implements OnInit {


  imagePath = imageUrl
  projectId: any;

  project: any

  currentImage!: string;
  projectIds: any[] = [];
  currentProjectIndex: number = 0;


  yOffset: number = window.innerHeight;
  xOffset: number = 0;
  hideDiv: boolean = false;

  images: any



  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    let scrollPosition = window.pageYOffset;
    this.yOffset = Math.max(window.innerHeight - scrollPosition -200, 0);
    this.xOffset = scrollPosition * 2;
  }


  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router,private cd: ChangeDetectorRef) {

  }








  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.scrollTop()


    setTimeout(() => {
      this.hideDiv = true
    }, 1000)

    this.getProject()
    this.getAllProjects()

    this.cd.detectChanges();

  }



  showContent = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }




  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  getProject() {
    this.adminService.getProjectById(this.projectId)
      .pipe(
        tap((response: any) => {
          this.project = response
          this.images = response.images
          this.currentImage = this.images[0];
          this.cd.detectChanges();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  getAllProjects() {
    this.adminService.getProjects()
      .pipe(
        tap((response: any) => {
          this.projectIds = response.map((project: any) => project.id);
          this.currentProjectIndex = this.projectIds.indexOf(this.projectId);
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  nextProject() {
    if (this.currentProjectIndex < this.projectIds.length - 1) {
      this.currentProjectIndex++;
    } else {
      this.currentProjectIndex = 0;
    }
    this.projectId = this.projectIds[this.currentProjectIndex];
    this.router.navigate(['/projects/' + this.projectId]);
    this.getProject();
  }

  previousProject() {
    if (this.currentProjectIndex > 0) {
      this.currentProjectIndex--;
    } else {
      this.currentProjectIndex = this.projectIds.length - 1;
    }
    this.projectId = this.projectIds[this.currentProjectIndex];
    this.router.navigate(['/projects/' + this.projectId]);
    this.getProject();
  }



  currentImageIndex = 0;
  changeImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

    setTimeout(()=>{
      this.scrollToBottom()
    },1000)

  }

  redirectToDetails(id:number) {
    this.router.navigate(['details/'+id])
  }

}
