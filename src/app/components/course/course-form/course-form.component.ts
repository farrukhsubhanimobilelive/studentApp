import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Course } from 'src/app/models/course';
import { CourseService } from './../../../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseId: number;
  course: Course[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  courseForm = this.fb.group({
    name: ['', Validators.required],
    duration: ['', Validators.required],
    fee: ['', Validators.required],
    startDate: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.courseId = +this.route.snapshot.paramMap.get('id');
      this.getCourse();
    }
  }

  onSubmit(): void {
    this.courseId ? this.editCourse() : this.addCourse();
  }

  addCourse(): void {
    this.courseService.addCourse(this.courseForm.value).subscribe((res) => {
      console.log(res);
      alert('Course Added Successfully!');
      this.router.navigate(['/courses']);
    });
  }

  getCourse(): void {
    this.courseService.getCourse(this.courseId).subscribe({
      next: (course: any) => {
        this.courseForm.setValue({
          name: course.name,
          duration: course.duration,
          fee: course.fee,
          startDate: course.startDate,
        });
      }
    });
  }

  editCourse(): void {
    this.courseService.editCourse(this.courseForm.value, this.courseId).subscribe((res) => {
      if (res) {
        console.log(res);
        alert('Course Updated Successfully!');
        this.router.navigate(['/courses']);
      }
    });
  }
}
