import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HomeComponent } from './home';
import { AddArticleComponent } from './home/article/add-article/add-article.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'edit/:articleId',
    component: AddArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
