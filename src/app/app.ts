import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  userInput = '';
  infoMessage = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSend() {
    if (!this.userInput) {
      this.infoMessage = 'Введите что-нибудь!';
      return;
    }

    this.http.post('http://localhost:5000/api/save', this.userInput, { responseType: 'json' })
      .subscribe({
        next: () => {
          this.infoMessage = 'Сохранено!';
          this.userInput = '';
          this.cdr.detectChanges();
        },
        error: () => {
          this.infoMessage = 'Ошибка отправки';
          this.cdr.detectChanges();
        }
      });
  }
}