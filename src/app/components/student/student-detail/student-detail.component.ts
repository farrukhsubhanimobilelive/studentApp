import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  student;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const studentId = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(studentId).subscribe({
      next: (studentResponse: any) => {
        if (studentResponse) {
          return this.student = studentResponse;
        }
      }
    });
  }
}
