import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserStateService } from '../../../core/user-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() loginClick = new EventEmitter<void>();

  constructor(public userState: UserStateService) {}

  triggerLogin() {
    this.loginClick.emit();
  }
}