import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { JwtService } from '../auth/jwt';
import { User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject({} as User);
  private isAuthenticatedSubject: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  get currentUser(): User {
    return this.userSubject.value;
  }

  get currentUser$(): Observable<User> {
    return this.userSubject.asObservable().pipe(distinctUntilChanged());
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  authenticate() {
    if (!this.jwtService.getToken()) {
      this.purgeAuth();

      return;
    }

    this.isAuthenticatedSubject.next(true);

    this.get().subscribe();
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.userSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  register(credentials: User): Observable<User> {
    return this.apiService.post('/users', credentials);
  }

  login(credentials: User): Observable<User> {
    return this.apiService.post('/users/login', credentials).pipe(
      tap((loggedUser) => {
        this.setAuth(loggedUser);
      })
    );
  }

  get(): Observable<User> {
    return this.apiService.get('/user').pipe(
      tap(
        (currentUser) => {
          this.userSubject.next(currentUser);
        },
        (err) => {
          console.log(err);
          this.purgeAuth();
        }
      )
    );
  }

  update(toUpdate: User): Observable<User> {
    return this.apiService.post('/user', toUpdate).pipe(
      tap((updatedUser) => {
        this.userSubject.next(updatedUser);
      })
    );
  }
}
