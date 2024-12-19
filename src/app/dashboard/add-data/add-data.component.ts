import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
// @ts-ignore
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-data',
  standalone: true, // standalone-Komponente
  imports: [SharedModule], // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    // Formular mit erweiterten Feldern und Validierungen
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]], // Name ist erforderlich
      courseId: ['', Validators.required], // Kursauswahl ist erforderlich
      birthdate: [null, Validators.required], // Geburtsdatum ist erforderlich
      email: ['', [Validators.required, Validators.email]], // E-Mail mit Validierung
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+]{9,15}$/)]], // Telefonnummer
      newsletter: [false], // Newsletter ist optional
      message: ['', Validators.maxLength(500)] // Nachricht (max. 500 Zeichen)
    });
    this.backendService.getCourses();
    this.backendService.getRegistrations(this.storeService.currentPage);
  }

 // Methode zum Absenden des Formulars
  onSubmit() {
    if(this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage).subscribe(result=>{
        if(result){
          var modal = document.getElementById("successModal") as HTMLElement;
          var modal1 = new bootstrap.Modal(modal, {backdrop: false});
          modal1.show();
        }
      });
      this.registrationForm.reset();
    }
  }
}
