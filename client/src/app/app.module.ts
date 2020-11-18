import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './home/article';
import { HeaderComponent } from './home/header';
import { SearchComponent } from './home/search';
import { SearchArticleComponent } from './home/search/search-article';
import { AuthComponent } from './auth';
import { HomeComponent } from './home';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeadersInterceptorProvider } from './interceptors';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent,
    HeaderComponent,
    SearchComponent,
    SearchArticleComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [HttpHeadersInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
