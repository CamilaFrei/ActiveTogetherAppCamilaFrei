import { Component,OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  constructor(
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Lädt die Kurse und Registrierungen
  loadData(): void {
    this.backendService.getCourses();
    this.backendService.getRegistrations(this.storeService.currentPage);
  }

  // Pagination: Alle Seiten berechnen
  returnAllPages(): number[] {
    const totalPages = Math.ceil(this.storeService.registrationTotalCount / 2); // 2 pro Seite
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Seite wechseln und Registrierungen laden
  selectPage(page: number): void {
    this.storeService.currentPage = page;
    this.storeService.registrationsLoading = true;
    this.backendService.getRegistrations(page);
  }
  
}
