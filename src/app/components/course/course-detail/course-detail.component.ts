import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { Course } from './../../../models/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseId;
  course;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCourse();

    console.log(this.route);
  }

  getCourse(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(this.courseId).subscribe((res) => {
      this.course = res;

      console.log(this.course);
    });
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course.id).subscribe((res: any) => {
      alert(`Course ${course.name} Deleted Successfully!`);
      this.router.navigate(['/courses']);
    });
  }
}
