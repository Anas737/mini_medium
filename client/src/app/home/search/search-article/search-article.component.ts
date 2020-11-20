import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css'],
})
export class SearchArticleComponent implements OnInit {
  @Input()
  article: Article;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {}

  onSelectArticle() {
    this.articlesService.select(this.article).subscribe();
  }
}
