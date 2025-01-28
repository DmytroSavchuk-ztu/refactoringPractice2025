import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {imageUrl} from "../../config/Urls/urls";


interface DecodedToken {
  exp: number;

  [key: string]: any;
}
interface StateMapping {
  [key: string]: {
    state: string;
    watching: string;
    form?: string;
  };
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {


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


  imagePath = imageUrl
  baseUrl = window.location.protocol + "//" + window.location.host;
  // forms
  buttonsForm: { [id: string]: FormGroup } = {};
  projectForm!: FormGroup;
  crewForm!: FormGroup;
  newsForm!: FormGroup;
  distForm!: FormGroup;
  prizeForm!: FormGroup
  sectionForm!: FormGroup;
  vacancyForm!: FormGroup;
  participationForm!: FormGroup;
  editPrizeForm!: FormGroup;
  editParticipationForm!: FormGroup
  passwordForm!: FormGroup;
  textForm!: FormGroup;
  partnerForm!: FormGroup;
  addressForm!: FormGroup
  // vars
  [key: string]: any;
  crews: any;
  singleCrew: any;
  projects: any;
  singleProject: any
  news: any;
  singleNews: any;
  vacancy: any;
  singleVacancy: any;
  addCrewArr: any;
  buttons: any;
  text: any
  editorContent: any;
  vacancyToAddProject: any;
  addProjectArr: any;
  partners: any;
  emails: any;
  addresses: any
  // ids
  editCrewId!: any;
  editProjectId: any;
  editNewsId: any;
  projectIdToAddCrew!: any;
  editTextId: any
  sectionId: any
  editPartnerId: any
  editVacancyId: any
  editSectionId: any
  sectionNewsId: any
  editBioId: any;
  editAddressId: any;
  // booleans for pages
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
  editingNews: boolean = false
  showPasswordForm: boolean = false
  watchingButtons: boolean = false;
  watchingText: boolean = false
  editingDist: boolean = false;
  showTextForm: boolean = false
  editingAddress: boolean = false;
  showAddVacancyForm: boolean = false
  editingPartner: boolean = false
  watchingPartners: boolean = false
  wathParnterForm: boolean = false
  editingVacancy: boolean = false
  editingSection: boolean = false
  watchingEmails: boolean = false
  showDetailedBio: boolean = false;
  watchingAddresses: boolean = false
  showAddressForm: boolean = false

  selectedImage!: File;

  //get functions

  getData(type: keyof StateMapping, serviceMethod: any, id: number | null = null, scrollTop: boolean = false) {
    serviceMethod(id)
      .pipe(
        tap((response: any) => {
          // Reset all states to initial values
          this.resetAllStates();

          // Define state mappings
          const stateMapping: StateMapping = {
            buttons: { state: 'buttons', watching: 'watchingButtons', form: 'createButtonForm' },
            crews: { state: 'crews', watching: 'watchingCrew' },
            projects: { state: 'projects', watching: 'watchingProjects' },
            news: { state: 'news', watching: 'watchingNews' },
            vacancy: { state: 'vacancy', watching: 'watchingVacancy' },
            text: { state: 'text', watching: 'watchingText' },
            emails: { state: 'emails', watching: 'watchingEmails' },
            address: { state: 'addresses', watching: 'watchingAddresses' },
            partners: { state: 'partners', watching: 'watchingPartners' },
            singleVacancy: { state: 'singleVacancy', watching: 'watchingVacancy' },
            singleProject: { state: 'singleProject', watching: 'watchingProjects' },
            singleCrew: { state: 'singleCrew', watching: 'watchingCrew' },
            singleNews: { state: 'singleNews', watching: 'watchingNews' }
          };

          // Access the state and watching values from the stateMapping
          const { state, watching, form } = stateMapping[type] || {};

          if (state) {
            this[state] = response;
          }

          if (watching) {
            this[watching] = true;
          }

          if (form) {
            this[form]();
          }

          if (id) {
            this[`single${(type as string).charAt(0).toUpperCase() + (type as string).slice(1)}`] = response;
          }

          if (scrollTop) {
            this.scrollTop();
          }
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  resetAllStates() {
    this.watchingCrew = false;
    this.watchingProjects = false;
    this.watchingNews = false;
    this.watchingVacancy = false;
    this.watchingText = false;
    this.watchingEmails = false;
    this.watchingButtons = false;
    this.watchingPartners = false;
    this.watchingAddresses = false;
    this.showPasswordForm = false;
    this.singleProject = null;
    this.singleNews = null;
    this.singleVacancy = null;
    this.singleCrew = null;
    this.text = null;
  }

  getButtons() {
    this.getData('buttons', this.adminService.getButtons);
  }
  getCrews() {
    this.getData('crews', this.adminService.getCrewsAll);
  }
  getSingleCrew(id: number, scrollTop: boolean) {
    this.getData('singleCrew', this.adminService.getCrewById, id, scrollTop);
  }
  getProjects() {
    this.getData('projects', this.adminService.getAdminProjects);
  }
  getSingleProject(id: number, scrollTop: boolean) {
    this.getData('singleProject', this.adminService.getProjectById, id, scrollTop);
  }
  getNews() {
    this.getData('news', this.adminService.getNews);
  }
  getVacancy() {
    this.getData('vacancy', this.adminService.getVacancy);
  }
  getText() {
    this.getData('text', this.adminService.getText);
  }
  getPublishedProjects() {
    this.getData('projects', this.adminService.getPublishedProjects);
  }
  getUnPublishedProjects() {
    this.getData('projects', this.adminService.getUnpublishedProjects);
  }
  getSingleVacancy(id: number, scrollTop: boolean) {
    this.getData('singleVacancy', this.adminService.getVacancyById, id, scrollTop);
  }
  getSingleNews(id: number, scrollTop: boolean) {
    this.getData('singleNews', this.adminService.getNewsById, id, scrollTop);
  }
  getEmails() {
    this.getData('emails', this.adminService.getEmail);
  }
  getAddress() {
    this.getData('addresses', this.adminService.getAddress);
  }
  getPartners() {
    this.getData('partners', this.adminService.getPartner);
  }
  getProjectArr() {
    this.getData('projects', this.adminService.getAdminProjects);
  }

  //show functions

  showForm(formType: string, entity: any = null, id: number | null = null) {
    // Hide all other forms
    this.showCrewForm = false;
    this.showProjectForm = false;
    this.showSection = false;
    this.showNewsForm = false;
    this.showVacancyForm = false;
    this.showAddressForm = false;
    this.wathParnterForm = false;

    // Set watching flags to false (if needed for other operations)
    this.watchingButtons = false;
    this.watchingPartners = false;
    this.watchingCrew = false;
    this.watchingProjects = false;
    this.watchingNews = false;
    this.watchingVacancy = false;
    this.watchingText = false;

    // Reset the content data (optional depending on your need)
    this.text = null;
    this.singleProject = null;
    this.singleNews = null;
    this.singleVacancy = null;
    this.singleCrew = null;

    // Show the appropriate form and manage editing if needed
    switch (formType) {
      case 'password':
        this.showPasswordForm = true;
        break;

      case 'project':
        this.showProjectForm = true;
        if (entity) {
          this.projectForm.patchValue(entity);
          this.editingProject = true;
          this.editProjectId = id;
        }
        break;

      case 'crew':
        this.showCrewForm = true;
        if (entity) {
          this.crewForm.patchValue(entity);
          this.editingCrew = true;
          this.editCrewId = id;
        }
        break;

      case 'section':
        this.showSection = true;
        this.sectionId = id;
        break;

      case 'news':
        this.showNewsForm = true;
        break;

      case 'vacancy':
        this.showVacancyForm = true;
        break;

      case 'address':
        this.showAddressForm = true;
        break;

      case 'partner':
        this.wathParnterForm = true;
        break;

      default:
        console.error("Unknown form type:", formType);
    }
  }

  showPassword() {
    this.showForm('password');
  }
  showAddProjectForm() {
    this.showForm('project');
  }
  showAddCrewForm() {
    this.showForm('crew');
  }
  showSectionForm(id: number) {
    this.showForm('section', null, id);
  }
  showAddNewsForm() {
    this.showForm('news');
  }
  showEditCrew(crew: any) {
    this.showForm('crew', crew, crew.id);
  }
  showEditProject(project: any) {
    this.showForm('project', project, project.id);
  }
  showPartnerForm() {
    this.showForm('partner');
  }
  showVacancy() {
    this.showForm('vacancy');
  }
  showAdresForm() {
    this.showForm('address');
  }


  //delete functions

  deleteItem(
    deleteMethod: (id: number) => Observable<any>, // Метод для видалення
    id: number,                                   // Ідентифікатор елемента
    successCallbacks: (() => void)[] = [],        // Функції для успіху
    errorCallbacks: (() => void)[] = []           // Функції для помилок
  ) {
    deleteMethod(id)
      .pipe(
        tap(() => {
          successCallbacks.forEach(callback => callback());
        }),
        catchError((error: any): Observable<any> => {
          errorCallbacks.forEach(callback => callback());
          return throwError(error);
        })
      )
      .subscribe();
  }

  deleteCrew(id: number) {
    this.deleteItem(
      this.adminService.deleteCrew.bind(this.adminService), // Метод для видалення
      id,
      [() => this.getCrews(), () => {
        this.singleCrew = null;
      }], // Успішні дії
      [() => this.getCrews()]                                   // Дії при помилці
    );
  }

  deleteProject(id: number) {
    this.deleteItem(
      this.adminService.deleteProjects.bind(this.adminService),
      id,
      [() => this.getProjects(), () => {
        this.singleProject = null;
      }],
      [() => this.getProjects()]
    );
  }

  deletePrize(id: number) {
    this.deleteItem(
      this.adminService.deletePrize.bind(this.adminService),
      id,
      [() => this.getProjects(), () => this.getSingleProject(id, false)]
    );
  }

  deleteParticipation(id: number) {
    this.deleteItem(
      this.adminService.deleteParticipation.bind(this.adminService),
      id,
      [() => this.getProjects(), () => this.getSingleProject(id, false)]
    );
  }


  //form submits

  submitForm(options: {
    serviceMethod: (id: number, formData: any) => Observable<any>;
    formData: any;
    editing: boolean;
    id: number | null;
    postCreationActions?: () => void;
    resetForm?: boolean;
    closeFormFlag?: boolean;
    resetFlags?: () => void;
  }) {
    const {serviceMethod, formData, editing, id, postCreationActions, resetForm, closeFormFlag, resetFlags} = options;
    if (editing && id !== null) {
      serviceMethod(id, formData).pipe(
        tap(() => {
          if (postCreationActions) postCreationActions();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      ).subscribe();
    } else if (!editing) {
      serviceMethod(id as number, formData).pipe(
        tap(() => {
          if (postCreationActions) postCreationActions();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      ).subscribe();
    }
    if (resetForm) {
      formData.reset();
    }
    if (closeFormFlag && resetFlags) {
      resetFlags();
    }
  }

  projectSubmit() {
    if (this.editingProject) {
      this.editProject()
    } else {
      this.createProject()
    }
  }
  crewSubmit() {

    if (this.editingCrew) {
      this.editCrew()
    } else {
      this.createCrew()
    }

    this.closeForm()
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
  sectionSubmit() {
    if (this.editingSection) {
      this.editSection()
    } else {
      this.createSection()
    }
  }
  vacancySubmit() {
    if (this.editingVacancy) {
      this.editVacancy()
    } else {
      this.createVacancy()
    }
  }
  bioSubmit() {
    let data = {
      detailBio: this.editorContent
    }


    this.adminService.editCrew(this.editBioId, data)
      .pipe(
        tap(() => {
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
  passwordSubmit() {
    this.submitForm({
      serviceMethod: this.adminService.resetPass.bind(this.adminService),
      formData: {email: 'admin', password: this.passwordForm.value.password},
      editing: false,  // Password reset does not require an ID
      id: null,
      postCreationActions: () => {
        this.passwordForm.reset();
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
      }
    });
  }
  textSubmit() {
    this.submitForm({
      serviceMethod: this.adminService.changeText.bind(this.adminService),
      formData: {text: this.editorContent},
      editing: true,
      id: this.editTextId,
      postCreationActions: () => {
        this.editTextId = null;
        this.textForm.reset();
        this.showTextForm = false;
        this.editorContent = null;
        this.getText();
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
        this.showTextForm = false;
      }
    });
  }
  addressSubmit() {
    if (this.editingAddress) {
      this.editAddress()
    } else {
      this.createAddress()
    }
  }
  partnerSubmit() {
    if (this.editingPartner) {
      this.editPartner()
    } else {
      this.createPartner()
    }
  }
  buttonsSubmit(id: number) {
    const formData = this.buttonsForm[id].value;

    this.adminService.changeButton(id, formData)
      .pipe(
        tap(() => {
          this.getButtons();
          this.buttonsForm[id].reset();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  //create functions

  performCreateOperation(options: {
    serviceMethod: (...args: any[]) => Observable<any>; // Updated to support any number of arguments
    formData: any;
    postCreationActions?: () => void;
    resetForm?: boolean;
    closeFormFlag?: boolean;
    resetFlags?: () => void;
    additionalArgs?: any[]; // Optional additional arguments to pass
  }) {
    const {
      serviceMethod,
      formData,
      postCreationActions,
      resetForm,
      closeFormFlag,
      resetFlags,
      additionalArgs
    } = options;

    if (additionalArgs) {
      serviceMethod(formData, ...additionalArgs) // If additional arguments are provided, pass them
        .pipe(
          tap(() => {
            if (postCreationActions) postCreationActions();
          }),
          catchError((error: any): Observable<any> => {
            throw error;
          })
        )
        .subscribe();
    } else {
      serviceMethod(formData) // If no additional arguments, just pass formData
        .pipe(
          tap(() => {
            if (postCreationActions) postCreationActions();
          }),
          catchError((error: any): Observable<any> => {
            throw error;
          })
        )
        .subscribe();
    }

    if (resetForm) {
      formData.reset();
    }

    if (closeFormFlag && resetFlags) {
      resetFlags();
    }
  }

  createProject() {
    this.performCreateOperation({
      serviceMethod: this.adminService.addNewProject.bind(this.adminService),
      formData: this.projectForm.value,
      postCreationActions: () => {
        this.getProjects();
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
        this.showProjectForm = false;
      }
    });
  }

  createCrew() {
    const formData = this.crewForm.value;
    formData.page = formData.page === 'true';

    this.performCreateOperation({
      serviceMethod: this.adminService.addNewCrew.bind(this.adminService),
      formData: formData,
      postCreationActions: () => {
        this.getCrews();
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
        this.showCrewForm = false;
      }
    });
  }

  createSection() {
    let data = {
      sectionDescription: this.editorContent
    };

    this.performCreateOperation({
      serviceMethod: this.adminService.addSection.bind(this.adminService), // Ensure this method takes only one argument (data)
      formData: data,
      postCreationActions: () => {
        this.getNews();
        this.getSingleNews(this.sectionId, false);
        this.showSection = false;
        this.editingSection = false;
        this.editSectionId = null;
        this.editorContent = null;
      },
      resetForm: false,
      closeFormFlag: true,
      resetFlags: () => {
        this.showSection = false;
        this.editingSection = false;
      }
    });
  }

  createVacancy() {
    this.performCreateOperation({
      serviceMethod: this.adminService.createVacancy.bind(this.adminService),
      formData: this.vacancyForm.value,
      postCreationActions: () => {
        this.getVacancy();
        this.vacancyForm.reset();
        this.showVacancyForm = false;
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
        this.showVacancyForm = false;
      }
    });
  }

  createAddress() {
    this.performCreateOperation({
      serviceMethod: this.adminService.createAddress.bind(this.adminService),
      formData: this.addressForm.value,
      postCreationActions: () => {
        this.getAddress();
        this.addressForm.reset();
        this.showAddressForm = false;
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
        this.showAddressForm = false;
      }
    });
  }

  createPartner() {
    this.performCreateOperation({
      serviceMethod: this.adminService.createPartner.bind(this.adminService),
      formData: this.partnerForm.value,
      postCreationActions: () => {
        this.getPartners();
        this.wathParnterForm = false;
        this.partnerForm.reset();
      },
      resetForm: true,
      closeFormFlag: true,
      resetFlags: () => {
        this.wathParnterForm = false;
      }
    });
  }

  //close smth functions

  performCloseOperation(options: {
    resetForms?: boolean;
    additionalActions?: () => void;
    resetFlags?: () => void;
  }): void {
    if (options.resetForms) {
      this.crewForm.reset();
      this.projectForm.reset();
      this.newsForm.reset();
      this.sectionForm.reset();
      this.vacancyForm.reset();
      this.textForm.reset();
      this.passwordForm.reset();
      this.addressForm.reset();
      this.partnerForm.reset();
      this.editorContent = null;
    }
    if (options.resetFlags) {
      options.resetFlags();
    }
    if (options.additionalActions) {
      options.additionalActions();
    }
  }

  closeForm() {
    this.performCloseOperation({
      resetForms: true,
      resetFlags: () => {
        this.showCrewForm = false;
        this.wathParnterForm = false;
        this.showProjectForm = false;
        this.showNewsForm = false;
        this.showSection = false;
        this.showVacancyForm = false;
        this.showTextForm = false;
        this.showDetailedBio = false;
        this.editingCrew = false;
        this.editingNews = false;
        this.editingVacancy = false;
        this.editingProject = false;
        this.editingSection = false;
        this.showDistForm = false;
        this.editingDist = false;
        this.editingAddress = false;
        this.showAddressForm = false;
      },
    });
  }

  closeAddCrew() {
    this.performCloseOperation({
      additionalActions: () => {
        this.getProjects();
        this.getSingleProject(this.projectIdToAddCrew, false);
        this.showAddCrewToProject = false;
        this.projectIdToAddCrew = null;
      },
    });
  }

  closeAddProject() {
    this.performCloseOperation({
      additionalActions: () => {
        this.getVacancy();
        this.getSingleVacancy(this.vacancyToAddProject, false);
        this.showAddVacancyForm = false;
        this.vacancyToAddProject = null;
      },
    });
  }

  //media add

  performUploadOperation(
    serviceMethod: (id: number, fd: FormData) => Observable<any>,
    object: any,
    fd: FormData,
    successActions: () => void
  ): void {
    serviceMethod(object.id, fd)
      .pipe(
        tap(() => successActions()),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  onFileSelected(event: any, object: any, foo: any, whereUpload: string) {
    this.selectedImage = <File>event.target.files[0];
    this.imageSelected = true;

    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name);

    switch (whereUpload) {
      case 'project':
        this.performUploadOperation(
          this.adminService.addPhoto.bind(this.adminService),
          object,
          fd,
          () => {
            this.getProjects();
            this.getSingleProject(object.id, false);
          }
        );
        break;

      case 'crew':
        this.performUploadOperation(
          this.adminService.addPhotoToCrew.bind(this.adminService),
          object,
          fd,
          () => {
            this.getCrews();
            this.getSingleCrew(object.id, false);
          }
        );
        break;

      case 'news':
        this.performUploadOperation(
          this.adminService.addPhotoToNews.bind(this.adminService),
          object,
          fd,
          () => {
            this.getNews();
            this.getSingleNews(object.id, false);
          }
        );
        break;

      case 'section':
        this.performUploadOperation(
          this.adminService.addPhotoToSection.bind(this.adminService),
          object,
          fd,
          () => {
            this.getNews();
            this.getSingleNews(foo.id, false);
          }
        );
        break;

      case 'projectTitle':
        this.performUploadOperation(
          this.adminService.addTitlePhoto.bind(this.adminService),
          object,
          fd,
          () => {
            this.getProjects();
            this.getSingleProject(object.id, false);
          }
        );
        break;

      case 'page':
        this.performUploadOperation(
          this.adminService.addTextPhoto.bind(this.adminService),
          object,
          fd,
          () => {
            this.getText();
          }
        );
        break;

      case 'partner':
        this.performUploadOperation(
          this.adminService.addPartnerLogo.bind(this.adminService),
          object,
          fd,
          () => {
            this.getPartners();
          }
        );
        break;

      case 'pageGallery':
        this.performUploadOperation(
          this.adminService.addPhotoToGallery.bind(this.adminService),
          object,
          fd,
          () => {
            this.getText();
          }
        );
        break;

      default:
        console.error('Unknown upload type:', whereUpload);
    }
  }

  //remove / delete

  performDeleteOperation(
    serviceMethod: (...args: any[]) => Observable<any>,
    args: any[],
    successActions: () => void
  ): void {
    serviceMethod(...args)
      .pipe(
        tap(() => successActions()),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  removePhoto(id: number, imageName: string) {
    this.performDeleteOperation(
      this.adminService.deletePhoto.bind(this.adminService),
      [id, imageName],
      () => {
        this.getProjects();
        this.getSingleProject(id, false);
      }
    );
  }

  removeCrewPhoto(id: number, imageName: string) {
    this.performDeleteOperation(
      this.adminService.deleteCrewPhoto.bind(this.adminService),
      [id, imageName],
      () => {
        this.getCrews();
        this.getSingleCrew(id, false);
      }
    );
  }

  removeCrewFromProject(crewId: number, projectId: number) {
    this.performDeleteOperation(
      this.adminService.removeCrewFromProject.bind(this.adminService),
      [crewId, projectId],
      () => {
        this.getProjects();
        this.getSingleProject(projectId, false);
      }
    );
  }

  removePrFromVacancy(vacancyId: number, projectId: number) {
    this.performDeleteOperation(
      this.adminService.removeVacancyFromProject.bind(this.adminService),
      [vacancyId, projectId],
      () => {
        this.getVacancy();
        this.getSingleVacancy(vacancyId, false);
      }
    );
  }

  removeGalleryPhoto(item: any, photoName: any) {
    this.performDeleteOperation(
      this.adminService.deleteGalleryPhoto.bind(this.adminService),
      [item.id, photoName],
      () => {
        this.getText();
      }
    );
  }

  deleteVacancy(id: number) {
    this.performDeleteOperation(
      this.adminService.deleteVacancy.bind(this.adminService),
      [id],
      () => {
        this.getVacancy();
        this.singleVacancy = null;
      }
    );
  }

  deleteSection(id: number, newsId: number) {
    this.performDeleteOperation(
      this.adminService.deleteSection.bind(this.adminService),
      [id],
      () => {
        this.getNews();
        this.getSingleNews(newsId, false);
      }
    );
  }

  deleteSectionImage(id: number, sectionPhotoUrl: any, newsId: number) {
    this.performDeleteOperation(
      this.adminService.deletePhotoFromSection.bind(this.adminService),
      [id, sectionPhotoUrl],
      () => {
        this.getNews();
        this.getSingleNews(newsId, false);
      }
    );
  }

  deleteNewsImage(id: number, newsPhotoUrl: any) {
    this.performDeleteOperation(
      this.adminService.deletePhotoFromNews.bind(this.adminService),
      [id, newsPhotoUrl],
      () => {
        this.getNews();
        this.getSingleNews(id, false);
      }
    );
  }

  deleteNews(id: number) {
    this.performDeleteOperation(
      this.adminService.deleteNews.bind(this.adminService),
      [id],
      () => {
        this.getNews();
      }
    );
  }

  deleteTitlePhoto(id: number, photoTitle: any) {
    this.performDeleteOperation(
      this.adminService.deleteTitlePhoto.bind(this.adminService),
      [id, photoTitle],
      () => {
        this.getProjects();
        this.getSingleProject(id, false);
      }
    );
  }

  deleteAddress(id: number) {
    this.performDeleteOperation(
      this.adminService.deleteAddress.bind(this.adminService),
      [id],
      () => {
        this.getAddress();
      }
    );
  }

  deletePartner(id: number) {
    this.performDeleteOperation(
      this.adminService.deletePartner.bind(this.adminService),
      [id],
      () => {
        this.getPartners();
      }
    );
  }

  deletePartnerLogo(id: number, logoId: any) {
    this.performDeleteOperation(
      this.adminService.deletePartnerLogo.bind(this.adminService),
      [id, logoId],
      () => {
        this.getPartners();
      }
    );
  }

  //add functions

  performAddOperation(
    serviceMethod: (...args: any[]) => Observable<any>,
    args: any[],
    successActions: () => void
  ): void {
    serviceMethod(...args)
      .pipe(
        tap(() => successActions()),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  addToProject(id: number) {
    this.performAddOperation(
      this.adminService.addCrewToProject.bind(this.adminService),
      [id, this.projectIdToAddCrew],
      () => {
      });
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
        })).subscribe()
  }

  addToVacancy(projectId: number) {
    this.performAddOperation(
      this.adminService.addVacancyToProject.bind(this.adminService), // Service method
      [this.vacancyToAddProject, projectId], // Arguments for the service method
      () => {
      });
  }

  //publish

  togglePublish(
    serviceMethod: (id: number, data: any) => Observable<any>,
    id: number,
    data: any,
    successCallbacks: (() => void)[] = []
  ) {
    serviceMethod(id, data)
      .pipe(
        tap(() => {
          successCallbacks.forEach(callback => callback());
        }),
        catchError((error: any): Observable<any> => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  publish(id: number) {
    this.togglePublish(
      this.adminService.editProject.bind(this.adminService),
      id,
      {publish: true},
      [() => this.getProjects(), () => this.getSingleProject(id, false)]
    );
  }

  unPublish(id: number) {
    this.togglePublish(
      this.adminService.editProject.bind(this.adminService),
      id,
      {publish: false},
      [() => this.getProjects(), () => this.getSingleProject(id, false)]
    );
  }

  publishNews(id: number) {
    this.togglePublish(
      this.adminService.changeNews.bind(this.adminService),
      id,
      {publish: true},
      [() => this.getNews(), () => this.getSingleNews(id, false)]
    );
  }

  unpublishNews(id: number) {
    this.togglePublish(
      this.adminService.changeNews.bind(this.adminService),
      id,
      {publish: false},
      [() => this.getNews(), () => this.getSingleNews(id, false)]
    );
  }

  publishVacancy(id: number) {
    this.togglePublish(
      this.adminService.changeVacancy.bind(this.adminService),
      id,
      {vanish: true},
      [() => this.getVacancy(), () => this.getSingleVacancy(id, false)]
    );
  }

  unPublishVacancy(id: number) {
    this.togglePublish(
      this.adminService.changeVacancy.bind(this.adminService),
      id,
      {vanish: false},
      [() => this.getVacancy(), () => this.getSingleVacancy(id, false)]
    );
  }

  publishCrew(id: number) {
    this.togglePublish(
      this.adminService.editCrew.bind(this.adminService),
      id,
      {publish: true},
      [() => this.getSingleCrew(id, false)]
    );
  }

  unpublishCrew(id: number) {
    this.togglePublish(
      this.adminService.editCrew.bind(this.adminService),
      id,
      {publish: false},
      [() => this.getSingleCrew(id, false)]
    );
  }

  publishAddress(id: number) {
    this.togglePublish(
      this.adminService.changeAddress.bind(this.adminService),
      id,
      {publish: true},
      [() => this.getAddress()]
    );
  }

  unpublishAddress(id: number) {
    this.togglePublish(
      this.adminService.changeAddress.bind(this.adminService),
      id,
      {publish: false},
      [() => this.getAddress()]
    );
  }

  publishPartner(id: number) {
    this.togglePublish(
      this.adminService.changePartner.bind(this.adminService),
      id,
      {publish: true},
      [() => this.getPartners()]
    );
  }

  unpublishPartner(id: number) {
    this.togglePublish(
      this.adminService.changePartner.bind(this.adminService),
      id,
      {publish: false},
      [() => this.getPartners()]
    );
  }

  //add functions

  performAdd(
    serviceMethod: (id: number, data: any) => Observable<any>, // Service method
    id: number,
    formValue: any,
    successActions: () => void
  ): void;

  performAdd(
    serviceMethod: (data: any) => Observable<any>, // Service method without ID
    id: null,
    formValue: any,
    successActions: () => void // Actions to run on success
  ): void;

  performAdd(
    serviceMethod: any, // Allow either type of service method
    id: number | null,
    formValue: any,
    successActions: () => void
  ): void {
    if (id !== null) {
      serviceMethod(id, formValue)
        .pipe(
          tap(() => successActions()),
          catchError((error: any): Observable<any> => {
            throw error;
          })
        )
        .subscribe();
    } else {
      serviceMethod(formValue)
        .pipe(
          tap(() => successActions()),
          catchError((error: any): Observable<any> => {
            throw error;
          })
        )
        .subscribe();
    }
  }

  addPrize(id: number) {
    this.performAdd(
      this.adminService.addPrize.bind(this.adminService), // Service method
      id, // ID is required
      this.prizeForm.value, // Form data
      () => {
        this.getProjects();
        this.getSingleProject(id, false);
        this.prizeForm.reset();
      }
    );
  }

  addParticipation(id: number) {
    this.performAdd(
      this.adminService.addParticipation.bind(this.adminService),
      id,
      this.participationForm.value,
      () => {
        this.getProjects();
        this.getSingleProject(id, false);
        this.participationForm.reset();
      }
    );
  }

  addNews() {
    this.performAdd(
      this.adminService.addNews.bind(this.adminService),
      null,
      this.newsForm.value,
      () => {
        this.getNews();
        this.newsForm.reset();
        this.showNewsForm = false;
      }
    );
  }

  //edit functions

  performEdit(
    serviceMethod: (id: number, data: any) => Observable<any>,
    id: number,
    formValue: any,
    successActions: () => void
  ) {
    serviceMethod(id, formValue)
      .pipe(
        tap(() => {
          successActions();
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }

  editPartner() {
    this.performEdit(
      this.adminService.changePartner.bind(this.adminService),
      this.editPartnerId,
      this.partnerForm.value,
      () => {
        this.getPartners();
        this.partnerForm.reset();
        this.wathParnterForm = false;
        this.editingPartner = false;
        this.editPartnerId = null;
      }
    );
  }

  editParticipation(id: number, project: number) {
    this.performEdit(
      this.adminService.changeParticipation.bind(this.adminService),
      id,
      this.editParticipationForm.value,
      () => {
        this.getProjects();
        this.getSingleProject(project, false);
        this.editParticipationForm.reset();
      }
    );
  }

  editPrize(id: number, prize: number) {
    this.performEdit(
      this.adminService.changePrize.bind(this.adminService),
      id,
      this.editPrizeForm.value,
      () => {
        this.getProjects();
        this.getSingleProject(prize, false);
        this.editPrizeForm.reset();
      }
    );
  }

  editSection() {
    const data = {sectionDescription: this.editorContent};
    this.performEdit(
      this.adminService.changeSection.bind(this.adminService),
      this.editSectionId,
      data,
      () => {
        this.getNews();
        this.getSingleNews(this.sectionNewsId, false);
        this.showSection = false;
        this.editingSection = false;
        this.editSectionId = null;
        this.editorContent = null;
      }
    );
  }

  editProject() {
    this.adminService.editProject(this.editProjectId, this.projectForm.value)
      .pipe(
        tap(() => {
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

  editCrew() {

    const formData = this.crewForm.value;


    formData.page = formData.page === 'true';


    this.adminService.editCrew(this.editCrewId, formData)
      .pipe(
        tap(() => {
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

  editNews() {
    const formValue = this.newsForm.value;
    if (formValue.tags.length > 0) {
      formValue.tags = formValue.tags.toString().split(',').filter(Boolean);
    }

    this.performEdit(
      this.adminService.changeNews.bind(this.adminService),
      this.editNewsId,
      formValue,
      () => {
        this.getNews();
        this.getSingleNews(this.editNewsId, false);
        this.editNewsId = null;
        this.editingNews = false;
      }
    );
  }

  editVacancy() {
    this.performEdit(
      this.adminService.changeVacancy.bind(this.adminService),
      this.editVacancyId,
      this.vacancyForm.value,
      () => {
        this.getVacancy();
        this.getSingleVacancy(this.editVacancyId, false);
        this.vacancyForm.reset();
        this.showVacancyForm = false;
        this.editingVacancy = false;
        this.editVacancyId = null;
      }
    );
  }

  editAddress() {
    this.performEdit(
      this.adminService.changeAddress.bind(this.adminService),
      this.editAddressId,
      this.addressForm.value,
      () => {
        this.getAddress();
        this.addressForm.reset();
        this.showAddressForm = false;
        this.editingAddress = false;
        this.editAddressId = null;
      }
    );
  }

  //start edit

  startEdit(type: string, id: number, data: any = null, extra: any = null) {
    switch (type) {
      case 'news':
        this.editingNews = true;
        this.editNewsId = id;

        if (data?.customDate) {
          let date = new Date(data.customDate);
          data.customDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        }

        this.newsForm.patchValue(data);
        this.showNewsForm = true;
        break;

      case 'vacancy':
        this.editingVacancy = true;
        this.editVacancyId = id;
        this.vacancyForm.patchValue(data);
        this.showVacancyForm = true;
        break;

      case 'section':
        this.editingSection = true;
        this.editSectionId = id;
        this.sectionNewsId = extra; // Assuming `extra` contains `newsId`
        this.sectionForm.patchValue(data);
        this.showSection = true;
        this.editorContent = extra?.html || ''; // Assuming `html` is passed in `extra`
        break;

      case 'text':
        this.editTextId = id;
        this.showTextForm = true;
        this.editorContent = data?.text || '';
        break;

      case 'details':
        this.editBioId = id;
        this.showDetailedBio = true;
        this.editorContent = data;
        break;

      case 'address':
        this.editingAddress = true;
        this.editAddressId = id;
        this.addressForm.patchValue(data);
        this.showAddressForm = true;
        break;

      case 'url':
        this.editPartnerId = id;
        this.editingPartner = true;
        this.wathParnterForm = true;
        this.partnerForm.patchValue(data);
        break;

      case 'addProject':
        this.vacancyToAddProject = id;
        this.showAddVacancyForm = true;
        this.getProjectArr();
        break;

      default:
        console.error('Unsupported edit type:', type);
        break;
    }
  }

  startNewsEdit(id: number, news: any) {
    this.startEdit('news', id, news);
  }

  startVacancyEdit(id: number, vacancy: any) {
    this.startEdit('vacancy', id, vacancy);
  }

  startSectionEdit(id: number, section: any, newsId: number, html: any) {
    this.startEdit('section', id, section, {newsId, html});
  }

  startTextEdit(id: number, text: any) {
    this.startEdit('text', id, text);
  }

  startDetailsEdit(id: number, text: any) {
    this.startEdit('details', id, text);
  }

  startAddressEdit(id: number, address: any) {
    this.startEdit('address', id, address);
  }

  startUrlEdit(id: number, item: any) {
    this.startEdit('url', id, item);
  }

  startAddingProject(id: number) {
    this.startEdit('addProject', id);
  }

  // buttons
  disableButton(id: number) {
    let data = {
      active: false
    }

    this.adminService.changeButton(id, data)
      .pipe(
        tap(() => {
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
        tap(() => {
          this.getButtons()
        }),
        catchError((error: any): Observable<any> => {
          throw error;
        })
      )
      .subscribe();
  }
}
