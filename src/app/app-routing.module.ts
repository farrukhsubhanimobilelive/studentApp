import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './components/student/students/students.component';
import { StudentDetailComponent } from './components/student/student-detail/student-detail.component';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { CoursesComponent } from './components/course/courses/courses.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'students/student-detail/:id', component: StudentDetailComponent },
  { path: 'students/add-student', component: StudentFormComponent },
  { path: 'students/edit-student/:id', component: StudentFormComponent },

  { path: 'courses', component: CoursesComponent },
  { path: 'courses/course-detail/:id', component: CourseDetailComponent },
  { path: 'courses/add-course', component: CourseFormComponent },
  { path: 'courses/edit-course/:id', component: CourseFormComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
