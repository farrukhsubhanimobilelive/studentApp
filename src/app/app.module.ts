import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/student/students/students.component';
import { StudentDetailComponent } from './components/student/student-detail/student-detail.component';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CoursesComponent } from './components/course/courses/courses.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailComponent,
    StudentFormComponent,
    CourseFormComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
