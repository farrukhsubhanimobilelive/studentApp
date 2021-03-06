import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  name = 'Angular';
  page = 1;
  pageSize =9;
  items = [];

  students: Student[];

  constructor(
    private studentService: StudentService,
    private route: Router
  ) {
    for(let i = 1; i <= 100; i++){
      this.items.push({Name: 'Shop ' + i});
    }
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((studentsResponse: any) => {
      if (studentsResponse) {
        this.students = studentsResponse;
        console.log(this.students);
      }
    });
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student.id).subscribe(() => {
      alert(`Student ${student.name} Deleted Successfully!`);
      this.getStudents();
    });
  }
}
