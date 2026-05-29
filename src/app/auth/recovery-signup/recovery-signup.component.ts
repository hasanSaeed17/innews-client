import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-recovery-signup',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './recovery-signup.component.html',
  styleUrl: './recovery-signup.component.css'
})
export class RecoverySignupComponent {


  adminEmail = '';
  userEmail = '';
  userPassword = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

 
signup() {
  this.auth.recoverySignupDeveloper(
    this.userEmail,
    this.userPassword
  ).subscribe({
    next: (response) => {
      console.log('Signup successful:', response);
      alert(response.message);
    },
    error: (error) => {
      console.error('Signup failed:', error);
      alert(error.error?.message || 'Signup failed');
    }
  });
}


}
