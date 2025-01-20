import { Injectable } from '@angular/core';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public courses: Course[] = [];
  public registrations: Registration[] = [];
  public registrationTotalCount: number = 0;
  public currentPage: number = 1;
  public couesesLoading = false;
  public registrationsLoading = true;
  public sortOrder: string = 'asc';
  
}

