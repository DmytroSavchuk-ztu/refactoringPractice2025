import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {catchError, Observable, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {imageUrl} from "../../config/Urls/urls";


interface DecodedToken {
  exp: number;

  [key: string]: any;
}


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {


  imagePath = imageUrl
  editorContent: any;
  editingAddress: boolean = false;


  baseUrl = window.location.protocol + "//" + window.location.host;


  ngOnInit() {

    const token = this.cookieService.get('access_token');

    if (!token) {
      console.log('No token found');

      this.router.navigate(['/auth']);
    } else {
      const decodedToken = jwtDecode(token) as DecodedToken;

      const currentTime = Math.floor((new Date()).getTime() / 1000);

      if (currentTime > decodedToken.exp) {
        console.log('Token is expired');

        this.router.navigate(['/auth']);
      } else {
        console.log('Token is not expired');
      }
    }


    this.createCrewForm()
    this.createProjectForm()
    this.createParticipationForm()
    this.createPrizeForm()
    this.createNewsForm()
    this.createSectionForm()
    this.createVacancyForm()
    this.createEditParticipationForm()
    this.createEditPrizeForm()
    this.createTextForm()
    this.createPasswordForm()
    this.createAddressForm()
    this.createPartnerForm()
  }

  createCrewForm() {
    this.crewForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      position: [''],
      bio: [''],
      page: [''],
      phoneNumber: ['', [Validators.pattern(/^[\d+-]+$/)]],
      email: ['', [Validators.email]],
      filter: [''],

    });
  }

  createTextForm() {
    this.textForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  createProjectForm() {
    this.projectForm = this.formBuilder.group({
      projectTitle: [''],
      year: [''],
      country: [''],
      slogan: [''],
      director: [''],
      script: [''],
      producer: [''],
      directorOfPhotography: [''],
      composer: [''],
      artist: [''],
      editing: [''],
      genre: [''],
      budget: [''],
      time: [''],
      projectDescription: [''],
      synopsys: [''],
      filter: [''],
      videoUrl: [''],
      is_landingPage: ['']
    });

  }

  createNewsForm() {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      titleDescription: ['', Validators.required],
      customDate: ['date'],
      tags: ['']
    });
  }

  createPrizeForm() {
    this.prizeForm = this.formBuilder.group({
      prizeDescription: ['', Validators.required],
    });
  }

  createEditPrizeForm() {
    this.editPrizeForm = this.formBuilder.group({
      prizeDescription: ['', Validators.required],
    });
  }

  createSectionForm() {
    this.sectionForm = this.formBuilder.group({
      sectionTitle: ['', Validators.required],
      sectionDescription: ['', Validators.required]
    });
  }

  createParticipationForm() {
    this.participationForm = this.formBuilder.group({
      participationDescription: ['', Validators.required],
    });
  }

  createEditParticipationForm() {
    this.editParticipationForm = this.formBuilder.group({
      participationDescription: ['', Validators.required],
    });
  }

  createVacancyForm() {
    this.vacancyForm = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      jobDescription: [''],
      contactInformation: [''],
      jobRequirements: [''],
      vacancyUrl: [''],
      specialization: [''],
      location: [''],
      qualification: ['']
    });
  }


  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }


  createButtonForm() {
    for (const button of this.buttons) {
      this.buttonsForm[button.id] = this.formBuilder.group({
        url: ['', Validators.required]
      });
    }
  }


  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      country: [''],
      address: [''],
      city: [''],
      code: [''],
    });
  }

  createPartnerForm() {
    this.partnerForm = this.formBuilder.group({
      url: [''],
    });
  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private cookieService: CookieService, private router: Router) {
  }


  buttonsForm: { [id: string]: FormGroup } = {};
  projectForm!: FormGroup;
  crewForm!: FormGroup;

  newsForm!: FormGroup;

  distForm!: FormGroup;

  prizeForm!: FormGroup;

  sectionForm!: FormGroup;

  vacancyForm!: FormGroup;

  participationForm!: FormGroup;

  editPrizeForm!: FormGroup;

  editParticipationForm!: FormGroup

  passwordForm!: FormGroup;

  crews: any;

  singleCrew: any;

  projects: any;

  singleProject: any

  news: any;

  singleNews: any;

  vacancy: any;

  singleVacancy: any;

  editCrewId!: any;

  editProjectId: any;

  editNewsId: any;

  watchingCrew: boolean = false;

  watchingProjects: boolean = false;

  watchingVacancy: boolean = false

  watchingNews: boolean = false

  showCrewForm: boolean = false;

  showDistForm: boolean = false

  showProjectForm: boolean = false;

  showNewsForm: boolean = false;

  showVacancyForm: boolean = false

  showSection: boolean = false;

  showAddCrewToProject: boolean = false

  editingCrew: boolean = false;

  editingProject: boolean = false;

  imageSelected = false;
  selectedImage!: File;

  addCrewArr: any;

  projectIdToAddCrew!: any;

  editingNews: boolean = false


  showPasswordForm: boolean = false

  buttons: any;

  watchingButtons: boolean = false;

  getButtons() {
    this.adminService.getButtons()
      .pipe(
        tap((response: any) => {
          this.watchingAddresses = false
          this.watchingEmails = false
          this.watchingButtons = true
          this.watchingCrew = false
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = false
          this.buttons = response
          this.watchingText = false
          this.watchingPartners = false
          this.text = null
          this.watchingEmails = false

          this.showPasswordForm = false
          this.singleProject = null
          this.singleNews = null
          this.singleVacancy = null
          this.watchingEmails = false
          this.createButtonForm()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  getCrews() {
    this.adminService.getCrewsAll()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = true
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = false
          this.crews = response
          this.watchingText = false
          this.text = null

          this.watchingPartners = false
          this.watchingAddresses = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.showPasswordForm = false
          this.singleProject = null
          this.singleNews = null
          this.singleVacancy = null
          this.watchingEmails = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  showPassword() {
    this.showPasswordForm = true

    this.watchingButtons = false
    this.watchingPartners = false
    this.watchingCrew = false
    this.watchingProjects = false
    this.watchingNews = false
    this.watchingVacancy = false
    this.watchingText = false
    this.text = null
    this.singleProject = null
    this.singleNews = null
    this.singleVacancy = null
    this.singleCrew = null

  }


  getSingleCrew(id: number, scrollTop: boolean) {
    this.adminService.getCrewById(id)
      .pipe(
        tap((response: any) => {

          if (scrollTop) {
            this.scrollTop()
          }

          this.watchingPartners = false
          this.watchingAddresses = false
          this.watchingButtons = false
          this.watchingCrew = true
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = false
          this.watchingText = false
          this.text = null
          this.singleCrew = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  getProjects() {
    this.adminService.getAdminProjects()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = false
          this.watchingProjects = true
          this.watchingNews = false
          this.watchingVacancy = false
          this.projects = response
          this.watchingText = false
          this.text = null
          this.watchingButtons = false

          this.watchingPartners = false
          this.watchingAddresses = false
          this.showPasswordForm = false
          this.singleNews = null
          this.singleVacancy = null
          this.singleCrew = null
          this.watchingEmails = false
          this.watchingButtons = false

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  getSingleProject(id: number, scrollTop: boolean) {
    this.adminService.getProjectById(id)
      .pipe(
        tap((response: any) => {

          if (scrollTop) {
            this.scrollTop()
          }

          this.watchingPartners = false
          this.watchingAddresses = false
          this.watchingText = false
          this.text = null
          this.watchingCrew = false
          this.watchingProjects = true
          this.watchingNews = false
          this.watchingVacancy = false
          this.singleProject = response
          this.watchingEmails = false

          this.watchingButtons = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  getNews() {
    this.adminService.getNews()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = false
          this.watchingProjects = false
          this.watchingVacancy = false
          this.watchingNews = true
          this.showPasswordForm = false
          this.news = response
          this.watchingText = false
          this.text = null
          this.watchingButtons = false

          this.watchingPartners = false
          this.watchingAddresses = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.singleProject = null
          this.singleVacancy = null
          this.singleCrew = null
          this.watchingEmails = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  getVacancy() {
    this.adminService.getVacancy()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = false
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = true
          this.watchingText = false
          this.text = null
          this.vacancy = response

          this.watchingAddresses = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.showPasswordForm = false

          this.watchingPartners = false
          this.singleProject = null
          this.singleNews = null
          this.singleCrew = null
          this.watchingEmails = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  text: any

  watchingText: boolean = false


  getText() {
    this.adminService.getText()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = false
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = false
          this.watchingText = true
          this.text = response

          this.watchingEmails = false
          this.watchingButtons = false
          this.showPasswordForm = false

          this.watchingPartners = false
          this.watchingAddresses = false
          this.singleProject = null
          this.singleNews = null
          this.singleCrew = null
          this.singleVacancy = null
          this.watchingEmails = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  getPublishedProjects() {
    this.adminService.getPublishedProjects()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = false
          this.watchingProjects = true

          this.watchingEmails = false

          this.watchingPartners = false
          this.watchingAddresses = false
          this.watchingButtons = false
          this.projects = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  getUnPublishedProjects() {
    this.adminService.getUnpublishedProjects()
      .pipe(
        tap((response: any) => {
          this.watchingCrew = false
          this.watchingProjects = true

          this.watchingPartners = false
          this.watchingAddresses = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.projects = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }


  showAddProjectForm() {
    this.showCrewForm = false
    this.showProjectForm = true
  }

  showAddCrewForm() {
    this.showCrewForm = true
    this.showProjectForm = false
  }


  sectionId: any

  showSectionForm(id: number) {
    this.showSection = true
    this.sectionId = id

  }

  showAddNewsForm() {
    this.showNewsForm = true;
  }


  deleteCrew(id: number) {
    this.adminService.deleteCrew(id)
      .pipe(
        tap((response: any) => {
          this.getCrews()
          this.singleCrew = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
          this.getCrews()
        })
      )
      .subscribe();
  }

  deleteProject(id: number) {
    this.adminService.deleteProjects(id)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.singleProject = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
          this.getProjects()
        })
      )
      .subscribe();
  }


  showEditCrew(crew: any) {
    this.showCrewForm = true;
    this.crewForm.patchValue(crew);
    this.editingCrew = true;
    this.editCrewId = crew.id;
  }

  showEditProject(project: any) {
    this.showProjectForm = true;
    this.projectForm.patchValue(project)
    this.editingProject = true
    this.editProjectId = project.id
  }


  editingDist: boolean = false;

  closeForm() {
    this.showCrewForm = false
    this.wathParnterForm = false
    this.showProjectForm = false
    this.showNewsForm = false
    this.showSection = false
    this.showVacancyForm = false
    this.showTextForm = false
    this.editingCrew = false
    this.editingNews = false
    this.editingVacancy = false
    this.editingProject = false
    this.editingSection = false
    this.showDistForm = false
    this.editingDist = false
    this.crewForm.reset()
    this.projectForm.reset()
    this.newsForm.reset()
    this.sectionForm.reset()
    this.vacancyForm.reset()
    this.textForm.reset()
    this.passwordForm.reset()
    this.addressForm.reset()
    this.partnerForm.reset()
    this.editorContent = null
    this.showDetailedBio = false
    this.editingAddress = false
    this.showAddressForm = false

  }

  crewSubmit() {

    if (this.editingCrew) {
      this.editCrew()
    } else {
      this.createCrew()
    }

    this.closeForm()
  }


  createCrew() {
    const formData = this.crewForm.value;
    formData.page = formData.page === 'true';
    this.adminService.addNewCrew(formData)
      .pipe(
        tap((response: any) => {
          this.getCrews()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  editCrew() {

    const formData = this.crewForm.value;


    formData.page = formData.page === 'true';


    this.adminService.editCrew(this.editCrewId, formData)
      .pipe(
        tap((response: any) => {
          this.getCrews()
          this.getSingleCrew(this.editCrewId, false)
          this.editCrewId = null
          this.editingCrew = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  projectSubmit() {
    if (this.editingProject) {
      this.editProject()
    } else {
      this.createProject()
    }

    this.showProjectForm = false
  }

  editProject() {
    this.adminService.editProject(this.editProjectId, this.projectForm.value)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(this.editProjectId, false)
          this.editProjectId = null
          this.editingProject = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  createProject() {
    this.adminService.addNewProject(this.projectForm.value)
      .pipe(
        tap((response: any) => {
          this.getProjects()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  onFileSelected(event: any, object: any, foo: any, whereUpload: string) {

    this.selectedImage = <File>event.target.files[0];
    this.imageSelected = true;

    if (whereUpload === 'project') {
      this.uploadImage(object)
    } else if (whereUpload === 'crew') {
      this.uploadImageToCrew(object)
    } else if (whereUpload === 'news') {
      this.uploadImageToNews(object)
    } else if (whereUpload === 'section') {
      this.uploadImageToSection(object, foo)
    } else if (whereUpload === 'projectTitle') {
      this.uploadImageToProjectTitle(object)
    } else if (whereUpload === 'page') {
      this.uploadImageToPage(object)
    } else if (whereUpload === 'partner') {
      this.uploadImageToPartner(object)
    }else if (whereUpload ==='pageGallery') {
      this.uploadImageToGallery(object)
    }
  }


  uploadImageToGallery(object:any){
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addPhotoToGallery(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getText()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  uploadImageToPartner(object: any) {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addPartnerLogo(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getPartners()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  uploadImageToPage(object: any) {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addTextPhoto(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getText()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  uploadImageToProjectTitle(object: any) {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addTitlePhoto(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(object.id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  uploadImageToSection(object: any, foo: any) {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addPhotoToSection(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(foo.id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  uploadImageToNews(object: any) {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addPhotoToNews(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(object.id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  uploadImageToCrew(object: any) {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)

    this.adminService.addPhotoToCrew(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getCrews()
          this.getSingleCrew(object.id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  uploadImage(object: any) {

    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name)


    this.adminService.addPhoto(object.id, fd)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(object.id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();


  }

  removePhoto(id: number, imageName: string) {

    this.adminService.deletePhoto(id, imageName)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  removeCrewPhoto(id: number, imageName: string) {
    this.adminService.deleteCrewPhoto(id, imageName)
      .pipe(
        tap((response: any) => {
          this.getCrews()
          this.getSingleCrew(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  addCrewToProject(id: number) {

    this.showAddCrewToProject = true
    this.projectIdToAddCrew = id


    this.adminService.getCrews()
      .pipe(
        tap((response: any) => {
          this.addCrewArr = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  closeAddCrew() {

    this.getProjects()
    this.getSingleProject(this.projectIdToAddCrew, false)

    this.showAddCrewToProject = false;
    this.projectIdToAddCrew = null;


  }

  addToProject(id: number) {
    this.adminService.addCrewToProject(id, this.projectIdToAddCrew)
      .pipe(
        tap((response: any) => {

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  removeCrewFromProject(crewId: number, projectId: number) {
    this.adminService.removeCrewFromProject(crewId, projectId)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(projectId, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  publish(id: number) {

    const body = {
      publish: true
    }

    this.adminService.editProject(id, body)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  unPublish(id: number) {

    const body = {
      publish: false
    }

    this.adminService.editProject(id, body)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  addPrize(id: number) {
    this.adminService.addPrize(id, this.prizeForm.value)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
          this.prizeForm.reset()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  addParticipation(id: number) {
    this.adminService.addParticipation(id, this.participationForm.value)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
          this.participationForm.reset()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deletePrize(id: number) {
    this.adminService.deletePrize(id)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deleteParticipation(id: number) {
    this.adminService.deleteParticipation(id)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  editParticipation(id: number, project: number) {
    this.adminService.changeParticipation(id, this.editParticipationForm.value)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(project, false)
          this.editParticipationForm.reset()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  editPrize(id: number, prize: number) {
    this.adminService.changePrize(id, this.editPrizeForm.value)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(prize, false)
          this.editPrizeForm.reset()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  newsSubmit() {
    if (this.editingNews) {
      this.editNews()
    } else {
      this.addNews()
    }
    this.showNewsForm = false
    this.newsForm.reset()
  }


  editNews() {

    let formValue = this.newsForm.value;
    if (formValue.tags.length > 0) {
      formValue.tags = formValue.tags.toString().split(',').filter(Boolean);
    }

    this.adminService.changeNews(this.editNewsId, formValue)
      .pipe(
        tap((response: any) => {
          this.getNews();
          this.getSingleNews(this.editNewsId, false);
          this.editNewsId = null;
          this.editingNews = false;
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  publishNews(id: number) {

    let data = {
      publish: true
    }

    this.adminService.changeNews(id, data)
      .pipe(
        tap((response: any) => {
          this.getNews();
          this.getSingleNews(id, false);
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  unpublishNews(id: number) {

    let data = {
      publish: false
    }

    this.adminService.changeNews(id, data)
      .pipe(
        tap((response: any) => {
          this.getNews();
          this.getSingleNews(id, false);
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  addNews() {


    let formValue = this.newsForm.value;
    if (formValue.tags.length > 0) {
      formValue.tags = formValue.tags.toString().split(',').filter(Boolean);
    }


    this.adminService.addNews(formValue)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.newsForm.reset()
          this.showNewsForm = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  startNewsEdit(id: number, news: any) {
    this.editingNews = true
    this.editNewsId = id

    if (news.customDate) {
      let date = new Date(news.customDate);
      let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      news.customDate = formattedDate;
    }

    this.newsForm.patchValue(news);
    this.showNewsForm = true
  }

  sectionSubmit() {
    if (this.editingSection) {
      this.editSection()
    } else {
      this.createSection()
    }
  }

  createSection() {
    let data = {
      sectionDescription: this.editorContent
    }

    this.adminService.addSection(this.sectionId, data)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(this.sectionId, false)
          this.showSection = false
          this.editingSection = false
          this.editSectionId = null
          this.editorContent = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  editSection() {

    let data = {
      sectionDescription: this.editorContent
    }

    this.adminService.changeSection(this.editSectionId, data)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(this.sectionNewsId, false)
          this.showSection = false
          this.editingSection = false
          this.editSectionId = null
          this.editorContent = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  editingVacancy: boolean = false

  editVacancyId: any


  startVacancyEdit(id: number, vacancy: any) {
    this.vacancyForm.patchValue(vacancy)
    this.editingVacancy = true
    this.editVacancyId = id
    this.showVacancyForm = true
  }


  vacancySubmit() {
    if (this.editingVacancy) {
      this.editVacancy()
    } else {
      this.createVacancy()
    }
  }

  createVacancy() {
    this.adminService.createVacancy(this.vacancyForm.value)
      .pipe(
        tap((response: any) => {
          this.getVacancy()
          this.vacancyForm.reset()
          this.showVacancyForm = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  editVacancy() {
    this.adminService.changeVacancy(this.editVacancyId, this.vacancyForm.value)
      .pipe(
        tap((response: any) => {
          this.getVacancy()

          this.getSingleVacancy(this.editVacancyId, false)
          this.vacancyForm.reset()
          this.showVacancyForm = false
          this.editingVacancy = false
          this.editVacancyId = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  publishVacancy(id: number) {

    const body = {
      vanish: true
    }

    this.adminService.changeVacancy(id, body)
      .pipe(
        tap((response: any) => {
          this.getVacancy()
          this.getSingleVacancy(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  unPublishVacancy(id: number) {
    const body = {
      vanish: false
    }

    this.adminService.changeVacancy(id, body)
      .pipe(
        tap((response: any) => {
          this.getVacancy()
          this.getSingleVacancy(id, false)

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deleteVacancy(id: number) {
    this.adminService.deleteVacancy(id)
      .pipe(
        tap((response: any) => {
          this.getVacancy()
          this.singleVacancy = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  editingSection: boolean = false

  editSectionId: any

  sectionNewsId: any

  startSectionEdit(id: number, section: any, newsId: number, html: any) {
    this.editingSection = true
    this.editSectionId = id
    this.sectionNewsId = newsId
    this.sectionForm.patchValue(section)
    this.showSection = true
    this.editorContent = html
  }

  deleteSection(id: number, newsId: number) {
    this.adminService.deleteSection(id)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(newsId, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deleteSectionImage(id: number, sectionPhotoUrl: any, newsId: number) {
    this.adminService.deletePhotoFromSection(id, sectionPhotoUrl)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(newsId, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deleteNewsImage(id: number, newsPhotoUrl: any) {
    this.adminService.deletePhotoFromNews(id, newsPhotoUrl)
      .pipe(
        tap((response: any) => {
          this.getNews()
          this.getSingleNews(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  showVacancy() {
    this.showVacancyForm = true
  }

  deleteNews(id: number) {
    this.adminService.deleteNews(id)
      .pipe(
        tap((response: any) => {
          this.getNews()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deleteTitlePhoto(id: number, photoTitle: any) {
    this.adminService.deleteTitlePhoto(id, photoTitle)
      .pipe(
        tap((response: any) => {
          this.getProjects()
          this.getSingleProject(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  getSingleVacancy(id: number, scrollTop: boolean) {
    this.adminService.getVacancyById(id)
      .pipe(
        tap((response: any) => {

          if (scrollTop) {

            setTimeout(() => {
              this.scrollTop()
            }, 1000)


          }


          this.watchingPartners = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.singleVacancy = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  getSingleNews(id: number, scrollTop: boolean) {
    this.adminService.getNewsById(id)
      .pipe(
        tap((response: any) => {


          if (scrollTop) {
            this.scrollTop()
          }


          this.watchingPartners = false
          this.watchingButtons = false
          this.singleNews = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  editTextId: any
  showTextForm: boolean = false
  textForm!: FormGroup;


  startTextEdit(id: number, text: any) {
    this.editTextId = id
    this.showTextForm = true
    this.editorContent = text.text
  }


  editBioId: any;

  startDetailsEdit(id: number, text: any) {
    this.editBioId = id
    this.showDetailedBio = true
    this.editorContent = text
  }

  bioSubmit() {

    let data = {
      detailBio: this.editorContent
    }


    this.adminService.editCrew(this.editBioId, data)
      .pipe(
        tap((response: any) => {
          this.getCrews()
          this.getSingleCrew(this.editBioId, false)
          this.editBioId = null
          // this.textForm.reset()
          this.showDetailedBio = false
          this.editorContent = null

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  textSubmit() {

    let data = {
      text: this.editorContent
    }


    this.adminService.changeText(this.editTextId, data)
      .pipe(
        tap((response: any) => {
          this.editTextId = null
          this.textForm.reset()
          this.showTextForm = false
          this.editorContent = null
          this.getText()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  passwordSubmit() {

    let data = {
      email: 'admin',
      password: this.passwordForm.value.password
    }


    this.adminService.resetPass(data)
      .pipe(
        tap((response: any) => {
          this.passwordForm.reset()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  publishCrew(id: number) {

    let data = {
      publish: true
    }

    this.adminService.editCrew(id, data)
      .pipe(
        tap((response: any) => {
          this.getSingleCrew(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  unpublishCrew(id: number) {
    let data = {
      publish: false
    }

    this.adminService.editCrew(id, data)
      .pipe(
        tap((response: any) => {
          this.getSingleCrew(id, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  emails: any;
  watchingEmails: boolean = false
  showDetailedBio: boolean = false;


  getEmails() {
    this.adminService.getEmail()
      .pipe(
        tap((response: any) => {
          this.emails = response;
          this.watchingEmails = true

          this.watchingAddresses = false
          this.watchingButtons = false


          this.watchingPartners = false
          this.watchingText = false
          this.watchingCrew = false
          this.watchingNews = false
          this.watchingProjects = false
          this.watchingVacancy = false
          this.showPasswordForm = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  disableButton(id: number) {
    let data = {
      active: false
    }

    this.adminService.changeButton(id, data)
      .pipe(
        tap((response: any) => {
          this.getButtons()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  activateButton(id: number) {
    let data = {
      active: true
    }

    this.adminService.changeButton(id, data)
      .pipe(
        tap((response: any) => {
          this.getButtons()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  buttonsSubmit(id: number) {
    const formData = this.buttonsForm[id].value;

    this.adminService.changeButton(id, formData)
      .pipe(
        tap((response: any) => {
          this.getButtons();
          this.buttonsForm[id].reset();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  deletePageImage(id: number, photoUrl: any) {
    this.adminService.deleteTextPhoto(id, photoUrl)
      .pipe(
        tap((response: any) => {
          this.getText();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  addresses: any
  watchingAddresses: boolean = false

  getAddress() {
    this.adminService.getAddress()
      .pipe(
        tap((response: any) => {
          this.addresses = response
          this.watchingAddresses = true


          this.watchingPartners = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.watchingCrew = false
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = false
          this.watchingText = false
          this.text = null
          this.watchingEmails = false

          this.showPasswordForm = false
          this.singleProject = null
          this.singleNews = null
          this.singleVacancy = null
          this.watchingEmails = false

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  publishAddress(id: number) {
    let data = {
      publish: true
    }

    this.adminService.changeAddress(id, data)
      .pipe(
        tap((response: any) => {
          this.getAddress()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  unpublishAddress(id: number) {
    let data = {
      publish: false
    }

    this.adminService.changeAddress(id, data)
      .pipe(
        tap((response: any) => {
          this.getAddress()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deleteAddress(id: number) {

    this.adminService.deleteAddress(id)
      .pipe(
        tap((response: any) => {
          this.getAddress()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
          this.getAddress()
        })
      )
      .subscribe();
  }


  showAddressForm: boolean = false

  addressForm!: FormGroup


  showAdresForm() {
    this.showAddressForm = true
  }


  editAddressId: any;

  startAddressEdit(id: number, address: any) {
    this.editingAddress = true
    this.editAddressId = id
    this.addressForm.patchValue(address);
    this.showAddressForm = true
  }


  addressSubmit() {
    if (this.editingAddress) {
      this.editAddress()
    } else {
      this.createAddress()
    }
  }


  editAddress() {
    this.adminService.changeAddress(this.editAddressId, this.addressForm.value)
      .pipe(
        tap((response: any) => {
          this.getAddress()
          this.addressForm.reset()
          this.showAddressForm = false
          this.editingAddress = false
          this.editAddressId = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  createAddress() {
    this.adminService.createAddress(this.addressForm.value)
      .pipe(
        tap((response: any) => {
          this.getAddress()
          this.addressForm.reset()
          this.showAddressForm = false
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  partners: any;
  watchingPartners: boolean = false

  wathParnterForm: boolean = false
  partnerForm!: FormGroup;

  getPartners() {
    this.adminService.getPartner()
      .pipe(
        tap((response: any) => {

          this.partners = response

          this.watchingPartners = true
          this.watchingAddresses = false
          this.watchingEmails = false
          this.watchingButtons = false
          this.watchingCrew = false
          this.watchingProjects = false
          this.watchingNews = false
          this.watchingVacancy = false
          this.watchingText = false
          this.text = null
          this.watchingEmails = false

          this.showPasswordForm = false
          this.singleProject = null
          this.singleNews = null
          this.singleVacancy = null
          this.watchingEmails = false

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  publishPartner(id: number) {
    let data = {
      publish: true
    }

    this.adminService.changePartner(id, data)
      .pipe(
        tap((response: any) => {
          this.getPartners()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  unpublishPartner(id: number) {
    let data = {
      publish: false
    }

    this.adminService.changePartner(id, data)
      .pipe(
        tap((response: any) => {
          this.getPartners()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  deletePartner(id: number) {

    this.adminService.deletePartner(id)
      .pipe(
        tap((response: any) => {
          this.getPartners()
        }),
        catchError((error: any): Observable<any> => {
          this.getPartners()
          throw error;
        })
      )
      .subscribe();
  }


  showPartnerForm() {
    this.wathParnterForm = true
  }

  partnerSubmit() {
    if (this.editingPartner) {
      this.editPartner()
    } else {
      this.createPartner()
    }
  }


  createPartner() {
    this.adminService.createPartner(this.partnerForm.value)
      .pipe(
        tap((response: any) => {
          this.getPartners()
          this.wathParnterForm = false
          this.partnerForm.reset()
        }),
        catchError((error: any): Observable<any> => {

          throw error;
        })
      )
      .subscribe();
  }

  editPartner() {
    this.adminService.changePartner(this.editPartnerId, this.partnerForm.value)
      .pipe(
        tap((response: any) => {
          this.getPartners()
          this.partnerForm.reset()
          this.wathParnterForm = false
          this.editingPartner = false
          this.editPartnerId = null
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  editPartnerId: any

  editingPartner: boolean = false

  startUrlEdit(id: number, item: any) {
    this.editPartnerId = id
    this.editingPartner = true
    this.wathParnterForm = true
    this.partnerForm.patchValue(item)
  }

  deletePartnerLogo(id: number, logoId: any) {
    this.adminService.deletePartnerLogo(id, logoId)
      .pipe(
        tap((response: any) => {
          this.getPartners()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }


  vacancyToAddProject: any;

  showAddVacancyForm: boolean = false

  addProjectArr: any;


  closeAddProject() {
    this.getVacancy()
    this.getSingleVacancy(this.vacancyToAddProject, false)

    this.showAddVacancyForm = false;
    this.vacancyToAddProject = null;
  }


  getProjectArr() {
    this.adminService.getAdminProjects()
      .pipe(
        tap((response: any) => {
          this.addProjectArr = response
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  startAddingProject(id: number) {
    this.vacancyToAddProject = id
    this.showAddVacancyForm = true
    this.getProjectArr()
  }

  addToVacancy(projectId: number) {
    this.adminService.addVacancyToProject(this.vacancyToAddProject, projectId)
      .pipe(
        tap((response: any) => {

        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  removePrFromVacancy(vacancyId: number, projectId: number) {
    this.adminService.removeVacancyFromProject(vacancyId, projectId)
      .pipe(
        tap((response: any) => {
          this.getVacancy()
          this.getSingleVacancy(vacancyId, false)
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }

  removeGalleryPhoto(item:any,photoName:any) {
    this.adminService.deleteGalleryPhoto(item.id, photoName)
      .pipe(
        tap((response: any) => {
          this.getText()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe()
  }
}
