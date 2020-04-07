import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../../services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  page = 1;
  pageSize = 6;

  courses;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((res: any) => {
      this.courses = res;
      console.log(this.courses);
    });
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course.id).subscribe(() => {
      alert(`Course ${course.name} Deleted Successfully!`);
      this.getCourses();
    });
  }
}
