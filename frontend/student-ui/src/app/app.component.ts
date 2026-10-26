import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';

  private readonly apiUrl = '/api/students';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.error = '';

    this.http.get<Student[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Could not load students. Try again.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
