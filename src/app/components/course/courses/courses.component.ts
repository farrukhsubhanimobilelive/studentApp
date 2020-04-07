import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../../services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  name = 'Angular';
  page = 1;
  pageSize = 6;
  items = [];

  courses;

  constructor(
    private courseService: CourseService
  ) {
    for(let i = 1; i <= 100; i++){
      this.items.push({Name: 'Shop ' + i});
    }
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((res: any) => {
      this.courses = res;
    });
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course.id).subscribe((res: any) => {
      alert(`Course ${course.name} Deleted Successfully!`);
      this.getCourses();
    });
  }
}
