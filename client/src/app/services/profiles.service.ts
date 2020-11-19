import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<User[]> {
    return this.apiService.get('/users');
  }

  getOne(userIRI: string): Observable<User> {
    return this.apiService.get(userIRI);
  }
}
