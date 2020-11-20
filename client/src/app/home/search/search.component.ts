import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  articles: Article[];
  sub: Subscription;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.sub = this.articlesService.articles$.subscribe((_articles) => {
      this.articles = _articles['hydra:member'];
    });

    this.articlesService.getAll().subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
