import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/jwt';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  sub: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.userService.isAuthenticated$.subscribe(
      (_isAuthenticated) => {
        this.isAuthenticated = _isAuthenticated;
      }
    );
  }

  onAuth() {
    if (this.isAuthenticated) {
      this.userService.purgeAuth();
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
