import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { Course } from 'src/app/models/course';
import { CourseService } from './../../../services/course.service';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[0], 10),
        day : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[0], 10),
        day : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class CourseFormComponent implements OnInit {
  courseId: number;
  course: Course[] = [];

  courseForm = this.fb.group({
    name: ['', Validators.required],
    duration: ['', Validators.required],
    fee: ['', Validators.required],
    startDate: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private fb: FormBuilder,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.courseId = +this.route.snapshot.paramMap.get('id');
      this.getCourse();
    }
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  onSubmit(): void {
    this.courseId ? this.editCourse() : this.addCourse();
  }

  addCourse(): void {
    if(this.courseForm.status === 'INVALID') {
      this.courseForm.markAllAsTouched();
    }
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
