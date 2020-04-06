import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../../models/course';
import { StudentService } from './../../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  courses: Course[] = [];
  studentId: number;

  studentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required)
  });

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getCourses();
    if (this.route.snapshot.paramMap.get('id')) {
      this.studentId = +this.route.snapshot.paramMap.get('id');
      this.getStudent();
    }
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((res) => {
      this.courses = res;
    });
  }

  onSubmit(): void {
    this.studentId ? this.editStudent() : this.addStudent();
  }

  addStudent(): void {
    if(this.studentForm.status === 'INVALID') {
      this.studentForm.markAllAsTouched();
    }
    this.studentService.addStudent(this.studentForm.value).subscribe((res) => {
      alert('Student Added Successfully!');
      this.router.navigate(['/students']);
    });
  }

  getStudent(): void {
    this.studentService.getStudent(this.studentId).subscribe({
      next: (student: any) => {
        this.studentForm.setValue({
          name: student.name,
          age: student.age,
          class: student.class,
          section: student.section,
          address: student.address,
          courseId: student.courseId
        });
      }
    });
  }

  editStudent(): void {
    const courseId = +this.studentForm.value.courseId;
    const student = this.studentForm.value;
    student.courseId = courseId;
    this.studentService.editStudent(student, this.studentId).subscribe((res) => {
      if (res) {
        alert('Student Updated Successfully!');
        this.router.navigate(['/students']);
      }
    });
  }
}
