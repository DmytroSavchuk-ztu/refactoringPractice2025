import {Observable} from "rxjs";
import {urls} from "../config/Urls/urls";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  //*****************authorization********************************
//****************************************************************


  signIn(user: any): Observable<any> {
    return this.http.post<any>(urls.auth.signIn , user)
  }

  resetPass(changes: any): Observable<any> {
    return this.http.patch<any>(urls.auth.changePass , changes)
  }

//**************************************************************

//**********************CREW*************************

  getCrews(): Observable<any> {
    return this.http.get<any>(urls.crew.getCrews)
  }


  getCrewsAll(): Observable<any> {
    return this.http.get<any>(urls.crew.crewAll)
  }


  getCrewById(id: number): Observable<any> {
    return this.http.get<any>(urls.crew.getSingleCrew + '/' + id)
  }


  editCrew(id: number, edit: object): Observable<any> {
    return this.http.patch <any>(urls.crew.editCrew + "/" + id, edit)
  }

  deleteCrew(id: number): Observable<any> {
    return this.http.delete<any>(urls.crew.deleteCrew + "/" + id)
  }


  addNewCrew(crew: object): Observable<any> {
    return this.http.post<any>(urls.crew.addCrew, crew)
  }

//**************************************************************



  //****************DIST_PROJECTS*****************************

  getDistProjects(): Observable<any> {
    return this.http.get<any>(urls.dist.getAll)
  }

  deleteDist(id: number): Observable<any> {
    return this.http.delete<any>(urls.dist.dist + "/" + id)
  }


  addDistPhoto(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.dist.dist + "/" + id + "/addTitlePhoto", photoFile)
  }

  deleteDistPhoto(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.dist.dist + "/" + id + "/deleteTitlePhoto/" + photoName)
  }


  getDistById(id: number): Observable<any> {
    return this.http.get<any>(urls.dist.dist + '/' + id)
  }

  // editDist(id: number, edit: object): Observable<any> {
  //   return this.http.patch <any>(urls.dist.dist + "/" + id, edit)
  // }
  //
  //
  // editDist(id: number, edit: object): Observable<any> {
  //   return this.http.patch <any>(urls.dist.dist + "/" + id, edit)
  // }

  addDist(project: object): Observable<any> {
    return this.http.post<any>(urls.dist.dist, project)
  }

  //************************************************

//**********************PROJECT**************************


  getProjects(): Observable<any> {
    return this.http.get<any>(urls.project.getProjects)
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(urls.project.getProjectById + '/' + id)
  }

  editProject(id: number, edit: object): Observable<any> {
    return this.http.patch <any>(urls.project.editProject + "/" + id, edit)
  }


  deleteProjects(id: number): Observable<any> {
    return this.http.delete<any>(urls.project.deleteProject + "/" + id)
  }

  addNewProject(project: object): Observable<any> {
    return this.http.post<any>(urls.project.addNewProject, project)
  }


  addPhoto(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.project.editProject + "/" + id + "/addPhoto", photoFile)
  }

  addTitlePhoto(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.project.editProject + "/" + id + "/addTitlePhoto", photoFile)
  }

  deleteTitlePhoto(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.project.editProject + "/" + id + "/deleteTitlePhoto/" + photoName)
  }

  addPrize(id: number, prize: any): Observable<any> {
    return this.http.post<any>(urls.project.addPrize + "/" + id, prize)
  }

  changePrize(id: number, prize: any): Observable<any> {
    return this.http.patch<any>(urls.project.prize + "/" + id, prize)
  }

  deletePrize(id: number): Observable<any> {
    return this.http.delete<any>(urls.project.prize + "/" + id)
  }


  addParticipation(id: number, participation: any): Observable<any> {
    return this.http.post<any>(urls.project.addParticipation + "/" + id, participation)
  }

  changeParticipation(id: number, participation: any): Observable<any> {
    return this.http.patch<any>(urls.project.participation + "/" + id, participation)
  }

  deleteParticipation(id: number): Observable<any> {
    return this.http.delete<any>(urls.project.participation + "/" + id)
  }

  addPhotoToCrew(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.crew.crew + "/" + id + "/addPhotoToCrew", photoFile)
  }

  deletePhoto(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.project.editProject + "/" + id + "/deletePhoto/" + photoName)
  }

  deleteCrewPhoto(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.crew.crew + "/" + id + "/deletePhotoCrew/" + photoName)
  }

  addCrewToProject(crewId: number, projectId: number): Observable<any> {
    const url = urls.project.editProject + "/" + projectId + "/addCrew/" + crewId;
    return this.http.patch<any>(url, {});
  }

  removeCrewFromProject(crewId: number, projectId: number): Observable<any> {
    const url = urls.project.editProject + "/" + projectId + "/removeCrew/" + crewId;
    return this.http.patch<any>(url, {});
  }


  addVacancyToProject(vacancyId: number, projectId: number): Observable<any> {
    const url = urls.project.editProject + "/addVacancyTo/" + projectId +'?vacancyId='+vacancyId;
    return this.http.post<any>(url, {});
  }

  removeVacancyFromProject(vacancyId: number, projectId: number): Observable<any> {
    const url = urls.project.editProject + "/removeVacancyFrom/" + projectId +'?vacancyId='+vacancyId;
    return this.http.delete<any>(url, {});
  }

  getAdminProjects(): Observable<any> {
    return this.http.get<any>(urls.project.getProjects + "/publish")
  }

  getPublishedProjects(): Observable<any> {
    return this.http.get<any>(urls.project.getProjects + "/publish?filter=publish")
  }

  getUnpublishedProjects(): Observable<any> {
    return this.http.get<any>(urls.project.getProjects + "/publish?filter=draft")
  }



  getFilteredProjects(filter:string) : Observable<any> {
    return this.http.get<any>(urls.project.getProjects + "?filter=" + filter)
  }

//**************************************************************


  //***************************NEWS******************************

  getNews(): Observable<any> {
    return this.http.get<any>(urls.news.getNews)
  }

  getPublishedNews(): Observable<any> {
    return this.http.get<any>(urls.news.getPublishedNews)
  }

  getNewsByTag(tag:string):Observable<any>{
    return this.http.get<any>(urls.news.getNews + '/byTag/'+tag)
  }

  getNewsById(id:number):Observable<any> {
    return this.http.get<any>(urls.news.getNews +'/'+id)
  }

  addNews(news: any): Observable<any> {
    return this.http.post<any>(urls.news.addPost, news)
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete<any>(urls.news.getNews + '/' + id)
  }

  changeNews(id: number, changes: any): Observable<any> {
    return this.http.patch<any>(urls.news.changeNews + '/' + id, changes)
  }

  addSection(id: number, section: any): Observable<any> {
    return this.http.post<any>(urls.news.addSection + '/' + id, section)
  }

  deleteSection(id: number): Observable<any> {
    return this.http.delete<any>(urls.news.changeSection + '/' + id)
  }

  changeSection(id:number,changes:any): Observable<any> {
    return this.http.patch<any>(urls.news.changeSection + '/' + id,changes)
  }



  addPhotoToSection(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.news.getNews + "/" + id + "/addPhotoSection", photoFile)
  }


  addPhotoToNews(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.news.getNews + "/" + id + "/addPhotoNews", photoFile)
  }


  deletePhotoFromSection(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.news.getNews + "/" + id + "/deletePhotoSection/" + photoName)
  }

  deletePhotoFromNews(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.news.getNews + "/" + id + "/deletePhotoNews/" + photoName)
  }

  //***************************************************************



  //********************************Vacancy*******************************


  getVacancy(): Observable<any> {
    return this.http.get<any>(urls.vacancy.vacancy)
  }

  getVacancyById(id:number):Observable<any> {
    return this.http.get<any>(urls.vacancy.vacancy +'/'+id)
  }


  getPublishedVacancy(): Observable<any> {
    return this.http.get<any>(urls.vacancy.publishedVacancy)
  }

  createVacancy(vacancy:any): Observable<any> {
    return this.http.post<any>(urls.vacancy.vacancy, vacancy)
  }

  changeVacancy(id:number,vacancy:any): Observable<any> {
    return this.http.patch<any>(urls.vacancy.vacancy + "/" + id,vacancy)
  }

  deleteVacancy(id:number):Observable<any>{
    return this.http.delete<any>(urls.vacancy.vacancy + "/" + id)
  }


  //**************************************************************************


  //******************************TEXT****************************************


  getText(): Observable<any> {
    return this.http.get<any>(urls.text.getText)
  }

  getTextById(id:number): Observable<any> {
    return this.http.get<any>(urls.text.getText + "/" + id)
  }
  changeText(id:number,text:any): Observable<any> {
    return this.http.patch<any>(urls.text.getText + "/" + id,text)
  }


  addTextPhoto(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.text.getText + "/" + id + "/addTitlePhoto", photoFile)
  }

  deleteTextPhoto(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.text.getText + "/" + id + "/deleteTitlePhoto" + photoName)
  }


  addPhotoToGallery(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.text.getText + "/" + id + "/addPhoto", photoFile)
  }

  deleteGalleryPhoto(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.text.getText + "/" + id + "/deletePhoto" + photoName)
  }

  //***********************EMAIL***************************

  getEmail(): Observable<any> {
    return this.http.get<any>(urls.email.getEmail)
  }

  postEmail(email:any): Observable<any> {
    return this.http.post<any>(urls.email.postEmail ,email)
  }

  //**************************************************************



  //***********************Buttons***************************

  getButtons(): Observable<any> {
    return this.http.get<any>(urls.footerButton.buttons)
  }

  getActiveButtons(): Observable<any> {
    return this.http.get<any>(urls.footerButton.activeButtons)
  }

  changeButton(id:number,changes:any): Observable<any> {
    return this.http.patch<any>(urls.footerButton.buttons + "/" + id ,changes)
  }



  //***********************ADDRESS***************************

  getAddress(): Observable<any> {
    return this.http.get<any>(urls.address.address)
  }

  getPublishedAddress(): Observable<any> {
    return this.http.get<any>(urls.address.published)
  }

  createAddress(data:any): Observable<any> {
    return this.http.post<any>(urls.address.address,data)
  }


  changeAddress(id:number,data:any): Observable<any> {
    return this.http.patch<any>(urls.address.address + '/' + id,data)
  }

  deleteAddress(id:number): Observable<any> {
    return this.http.delete<any>(urls.address.address + '/' + id)
  }


  //***********************Partner***************************

  getPartner(): Observable<any> {
    return this.http.get<any>(urls.partner.partner)
  }

  getPublishedPartner(): Observable<any> {
    return this.http.get<any>(urls.partner.published)
  }

  createPartner(data:any): Observable<any> {
    return this.http.post<any>(urls.partner.partner,data)
  }

  changePartner(id:number,data:any): Observable<any> {
    return this.http.patch<any>(urls.partner.partner + '/' + id,data)
  }

  deletePartner(id:number): Observable<any> {
    return this.http.delete<any>(urls.partner.partner + '/' + id)
  }

  addPartnerLogo(id: number, photoFile: any): Observable<any> {
    return this.http.post<any>(urls.partner.partner + "/" + id + "/addLogoPhoto", photoFile)
  }

  deletePartnerLogo(id: number, photoName: string): Observable<any> {
    return this.http.delete<any>(urls.partner.partner + "/" + id + "/deleteLogoPhoto/" + photoName)
  }
}
