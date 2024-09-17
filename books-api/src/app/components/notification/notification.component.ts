import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="notification-popup" [ngClass]="notificationType">
      {{ message }}
    </div>
  `,
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  message: string | null = null;
  notificationType: 'success' | 'error' = 'success';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((data) => {
      this.message = data.message;
      this.notificationType = data.type;

      setTimeout(() => {
        this.message = null;
      }, 4000);
    });
  }
}
