import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../models/course';

const API_URL = 'https://sis-rest-api.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url: string;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    this.url = `${API_URL}/courses`;
    return this.http.get<Course[]>(this.url);
  }

  getCourse(id: number): Observable<Course[]> {
    this.url = `${API_URL}/courses/${id}`;
    return this.http.get<Course[]>(this.url);
  }

  deleteCourse(id: number): Observable<Course[]> {
    this.url = `${API_URL}/courses/${id}`;
    return this.http.delete<Course[]>(this.url);
  }

  addCourse(course: Course): Observable<Course[]> {
    this.url = `${API_URL}/courses`;
    return this.http.post<Course[]>(this.url, course);
  }

  editCourse(course: any, courseId: number): Observable<Course[]> {
    this.url = `${API_URL}/courses/${courseId}`;
    return this.http.put<Course[]>(this.url, course);
  }
}
