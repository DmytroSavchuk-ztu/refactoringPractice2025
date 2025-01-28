import {CUSTOM_ELEMENTS_SCHEMA,NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {AdminPageComponent} from './component/admin-page/admin-page.component';
import {HomePageComponent} from './component/home-page/home-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VideoPipe} from './pipe/video.pipe';
import {AuthPageComponent} from './component/auth-page/auth-page.component';
import {AuthInterceptor} from "./services/interceptor/interceptor.interceptor";
import { ProjectPageComponent } from './component/project-page/project-page.component';
import { SingleProjectPageComponent } from './component/single-project-page/single-project-page.component';
import {IntersectionObserverModule} from "@ng-web-apis/intersection-observer";
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
import { CrewPageComponent } from './component/crew-page/crew-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VacancyPageComponent } from './component/vacancy-page/vacancy-page.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { NewsPageComponent } from './component/news-page/news-page.component';
import { SingleNewsPageComponent } from './component/single-news-page/single-news-page.component';
import { ProjectDetailsPageComponent } from './component/project-details-page/project-details-page.component';
import { DistributionPageComponent } from './component/distribution-page/distribution-page.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { AnimationStudioPageComponent } from './component/animation-studio-page/animation-studio-page.component';

import { AlertModule } from '@coreui/angular';
import { ShootingServicesPageComponent } from './component/shooting-services-page/shooting-services-page.component';
import { AdressesPageComponent } from './component/adresses-page/adresses-page.component';
import { SingleCrewComponentComponent } from './component/single-crew-component/single-crew-component.component';
import { SingleVacancyPageComponent } from './component/single-vacancy-page/single-vacancy-page.component';
import {DataTablesModule} from "angular-datatables";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'auth', component: AuthPageComponent},
  {path:'projects',component:ProjectPageComponent},
  { path: 'projects/:id', component: SingleProjectPageComponent },
  {path:'team',component:CrewPageComponent},
  {path:'team/:id',component:SingleCrewComponentComponent},
  {path:'jobs',component:VacancyPageComponent},
  {path:'news',component:NewsPageComponent},
  { path: 'news/:id', component: SingleNewsPageComponent },
  {path:'details/:id',component:ProjectDetailsPageComponent},
  {path:'distribution',component:DistributionPageComponent},
  {path:'animation',component:AnimationStudioPageComponent},
  {path:'address',component:AdressesPageComponent},
  {path:'shootingServices',component:ShootingServicesPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    HomePageComponent,
    VideoPipe,
    AuthPageComponent,
    ProjectPageComponent,
    SingleProjectPageComponent,
    CrewPageComponent,
    VacancyPageComponent,
    NewsPageComponent,
    SingleNewsPageComponent,
    ProjectDetailsPageComponent,
    DistributionPageComponent,
    SafeHtmlPipe,
    AnimationStudioPageComponent,
    ShootingServicesPageComponent,
    AdressesPageComponent,
    SingleCrewComponentComponent,
    SingleVacancyPageComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    IntersectionObserverModule,
    BrowserAnimationsModule,
    CarouselModule,
    EditorModule,
    AlertModule,
    DataTablesModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
