import { Component } from '@angular/core';
import { AuthService } from '../core/services';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if has a logged user
    if (this.authService.hasLoggedUser()) {
      const loggedUser = localStorage.getItem('loggedUser')!;
      this.authService.setUser(JSON.parse(loggedUser));
      this.authService.setLoggedIn(true);
    } else {
      this.authService.logout();
    }
  }
}
