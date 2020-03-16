import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

const API_URL = 'https://sis-rest-api.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url: string;

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    this.url = `${API_URL}/students`;
    return this.http.get<Student[]>(this.url);
  }

  getStudent(id: number): Observable<Student[]> {
    this.url = `${API_URL}/students/${id}`;
    return this.http.get<Student[]>(this.url);
  }

  addStudent(student: Student): Observable<Student> {
    this.url = `${API_URL}/students`;
    return this.http.post<Student>(this.url, student);
  }

  editStudent(student: any, studentId: number): Observable<Student> {
    this.url = `${API_URL}/students/${studentId}`;
    return this.http.put<Student>(this.url, student);
  }

  deleteStudent(id: number): Observable<Student[]> {
    this.url = `${API_URL}/students/${id}`;
    return this.http.delete<Student[]>(this.url);
  }
}
