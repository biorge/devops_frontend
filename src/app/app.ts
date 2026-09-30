import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule для [(ngModel)]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // Добавляем в imports
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  inputText = '';
  status = '';

  constructor(private http: HttpClient) {}

  sendData() {
    if (!this.inputText) return;

    this.http.post('http://localhost:5000/api/save', this.inputText, { responseType: 'json' })
      .subscribe({
        next: () => {
          this.status = 'Сохранено!';
          this.inputText = ''; // Очищаем поле после отправки
        },
        error: () => this.status = 'Ошибка отправки'
      });
  }
}