import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../../services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses;
  constructor( private courseService: CourseService ) { }

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
