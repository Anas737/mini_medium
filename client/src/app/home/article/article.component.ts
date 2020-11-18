import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: Article;
  sub: Subscription;

  constructor(private articlesService: ArticlesService) {}

  get hasArticle() {
    return Object.entries(this.article).length > 0;
  }

  ngOnInit(): void {
    this.sub = this.articlesService.displayedArticle$.subscribe((_article) => {
      this.article = _article;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
