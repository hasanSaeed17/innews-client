import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JournalsService } from '../../services/journals/journals.service';
import { CommonModule } from '@angular/common';
import { Journal } from '../../models/journalModel';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

 journalForm!: FormGroup;
  selectedFile: File | null = null;
  uploadProgress = 0;
  message = '';
  uploading = false;

  totalPdfs = 0;
  journals: Journal[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private journalService: JournalsService,
    private auth: AuthService,
    private router: Router
  ) {}

  // ✅ OnInit lifecycle hook
  ngOnInit(): void {
    this.journalForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

    this.fetchJournals();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (this.selectedFile.type !== 'application/pdf') {
        this.message = 'Only PDF files are allowed';
        this.selectedFile = null;
      }
    }
  }

  submit(): void {
    if (!this.journalForm.valid || !this.selectedFile) {
      this.message = 'Please fill title and select a PDF';
      return;
    }

    this.uploading = true;
    this.uploadProgress = 0;
    this.message = '';

    const { title, description } = this.journalForm.value;

    this.journalService
      .uploadJournal(title, description, this.selectedFile)
      .subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(
              (event.loaded / event.total) * 100
            );
          }

          if (event.type === HttpEventType.Response) {
            this.message = 'Upload successful!';
            this.journalForm.reset();
            this.selectedFile = null;
            this.uploadProgress = 0;
            this.uploading = false;
            this.fetchJournals(); // refresh list
          }
        },
        error: err => {
          this.message = err.error?.error || 'Upload failed';
          this.uploading = false;
        }
      });
  }

  fetchJournals(): void {
    this.journalService.getAdminJournals().subscribe({
      next: data => {
        this.journals = data;
        this.totalPdfs = data.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Failed to fetch journals');
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  viewPdf(url: string): void {
    window.open(url, '_blank');
  }

  deleteJournal(id: string): void {
    if (!confirm('Are you sure you want to delete this journal permanently?')) return;

    this.journalService.deleteJournal(id).subscribe({
      next: () => {
        alert('Journal deleted successfully');
        this.fetchJournals();
      },
      error: err => console.error(err)
    });
  }

  toggleHide(journal: Journal): void {
    const hideValue = !journal.hide;
    this.journalService.setHide(journal._id, hideValue).subscribe({
      next: res => journal.hide = res.hide,
      error: err => console.error(err)
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  
}
