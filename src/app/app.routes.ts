import { Routes } from '@angular/router';
import { NewsComponent } from './features/news/news.component';
import { JournalsComponent } from './features/journals/journals.component';
import { AdminComponent } from './features/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ResetComponent } from './auth/reset/reset.component';
import { AuthGuardService } from './services/auth/auth-guard.service';


export const routes: Routes = [

  { path: '', redirectTo: 'news/home', pathMatch: 'full' },

  //explicit routes for each category, all pointing to NewsComponent
  { path: 'news/home', component: NewsComponent },
  { path: 'news/latest', component: NewsComponent },
  { path: 'news/business', component: NewsComponent },
  { path: 'news/world', component: NewsComponent },
  { path: 'news/politics', component: NewsComponent },
  { path: 'news/sports', component: NewsComponent },
  { path: 'news/health', component: NewsComponent },
  { path: 'news/technology', component:NewsComponent},

  //Journals
  { path: 'journals', component: JournalsComponent },

  //login
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password/:token', component: ResetComponent },

  // Admin(protected)
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },

  // fallback
  { path: '**', redirectTo: 'news/home' }

];