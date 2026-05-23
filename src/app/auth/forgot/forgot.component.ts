import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {

  email = '';
  message = '';

  constructor(private auth: AuthService) {}

  submit() {
    this.auth.forgotPassword(this.email)
      .subscribe(() => {
        this.message = 'If email exists, reset link sent';
      });
  }  

}
