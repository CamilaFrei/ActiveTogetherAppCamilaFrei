import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  isZoomed: boolean = false; // Steuert die Vergrößerung
  deleteId: string = '';
  
  constructor(
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onSortChange(): void {
    if(this.storeService.sortOrder == 'asc'){
      this.storeService.sortOrder = 'desc';
    } else{
      this.storeService.sortOrder='asc';
    }
    this.backendService.getRegistrations(this.storeService.currentPage)
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

  // Lösch- bzw. Abmeldefunktion für eine Registrierung
  onCancelRegistration(registrationId: string | undefined): void {
    this.deleteId = registrationId as string;
    this.backendService.deleteRegistration(registrationId as string).subscribe(response =>{ 
      this.backendService.getRegistrations(this.storeService.currentPage);
      this.deleteId = '';
    });
  }
  
  toggleZoom(): void {
    this.isZoomed = !this.isZoomed; // Zustand wechseln
  }
  
}

