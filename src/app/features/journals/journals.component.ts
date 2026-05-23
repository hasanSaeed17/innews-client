import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalsService } from '../../services/journals/journals.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-journals',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './journals.component.html',
  styleUrl: './journals.component.css'
})
export class JournalsComponent implements OnInit {

  journals: any[] = [];
  filteredJournals: any[] = [];
  loading = true;

  searchTerm = '';

  constructor(
    private journalService: JournalsService,
    private sanitizer: DomSanitizer
  ) {}
 ngOnInit(): void {
    this.journalService.getUserJournals().subscribe({
      next: data => {
        this.journals = data.map(journal => ({
          ...journal,
          safePdfUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
            journal.pdfUrl + '#page=1&view=FitH'
          )
        }));

        this.filteredJournals = this.journals;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  filterJournals(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredJournals = this.journals.filter(journal =>
      journal.title.toLowerCase().includes(term) ||
      journal.description.toLowerCase().includes(term)
    );
  }
}
