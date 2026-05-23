import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  password = '';
  message = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.token = this.route.snapshot.params['token'];
  }

  reset() {
    this.auth.resetPassword(this.token, this.password)
      .subscribe(() => {
        this.message = 'Password updated successfully';
      });
  }
}
