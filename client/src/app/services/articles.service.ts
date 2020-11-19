import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { Article, Articles, Comment, Reaction, Tag, User } from '../models';
import { ApiService } from './api.service';
import { ProfilesService } from './profiles.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesSubject: BehaviorSubject<Articles> = new BehaviorSubject(
    {} as Articles
  );
  private articleSubject: BehaviorSubject<Article> = new BehaviorSubject(
    {} as Article
  );

  constructor(
    private apiService: ApiService,
    private profilesService: ProfilesService
  ) {}

  get articles(): Articles {
    return this.articlesSubject.value;
  }

  get displayedArticle(): Article {
    return this.articleSubject.value;
  }

  get articles$(): Observable<Articles> {
    return this.articlesSubject.pipe(distinctUntilChanged());
  }

  get displayedArticle$(): Observable<Article> {
    return this.articleSubject.pipe(distinctUntilChanged());
  }

  updateArticles(articles: Articles) {
    this.articlesSubject.next(articles);
  }

  select(article: Article): Observable<User> {
    if (!article.user) return;

    const user$ = this.profilesService.getOne(
      article.user.replace('users', 'profiles')
    );
    const comments$ = this.getComments(article['@id']);
    const reactions$ = this.getReactions(article['@id']);
    const tags$ = this.getTags(article['@id']);

    forkJoin([user$, comments$, reactions$, tags$]).subscribe(
      ([_user, _comments, _reactions, _tags]) => {
        article.populatedUser = _user;
        article.populatedComments = _comments['hydra:member'];
        article.populatedReactions = _reactions['hydra:member'];
        article.populatedTags = _tags['hydra:member'];

        this.articleSubject.next(article);
      }
    );

    return user$;
  }

  getAll(): Observable<Articles> {
    return this.apiService
      .get('/articles')
      .pipe(tap((_articles) => this.articlesSubject.next(_articles)));
  }

  query() {}

  getOne(articleId: number): Observable<Article> {
    return this.apiService
      .get(`/articles${articleId}`)
      .pipe(tap((_article) => this.articleSubject.next(_article)));
  }

  create(articleData: Article): Observable<Article> {
    return this.apiService.post('articles', articleData);
  }

  update(articleId: number, articleData: Article): Observable<Article> {
    return this.apiService.put(`/articles/${articleId}`, articleData);
  }

  delete(articleId: number): Observable<Article> {
    return this.apiService.delete(`/articles/${articleId}`).pipe(
      tap(() => {
        const _articles = this.articles['hydra:member'].filter((_article) => {
          _article.id !== articleId;
        });

        const articles = { ...this.articles };
        articles['hydra:member'] = _articles;

        this.updateArticles(articles);

        if (this.displayedArticle && this.displayedArticle.id === articleId) {
          this.articleSubject.next({} as Article);
        }
      })
    );
  }

  // Comments
  getComments(articleIRI: string): Observable<Comment[]> {
    return this.apiService
      .get(
        `/comments`,
        new HttpParams({
          fromObject: {
            article: articleIRI,
          },
        })
      )
      .pipe(
        tap((_comments: Comment[]) => {
          const articles = { ...this.articles };

          const article = articles['hydra:member'].find(
            (_article) => _article['@id'] === articleIRI
          );

          article.populatedComments = _comments;

          this.updateArticles(articles);
        })
      );
  }

  addComment(commentData: Comment): Observable<Comment> {
    return this.apiService.post('/comments', commentData).pipe(
      tap((_comment: Comment) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === commentData.article
        );

        article.populatedComments.push(_comment);

        this.updateArticles(articles);
      })
    );
  }

  updateComment(commentId: number, commentData: Comment): Observable<Comment> {
    return this.apiService.put(`/comments/${commentId}`, commentData).pipe(
      tap((_comment: Comment) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === commentData.article
        );

        article.populatedComments.push(_comment);

        this.updateArticles(articles);
      })
    );
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.apiService.delete(`/comments/${commentId}`).pipe(
      tap((_comment: Comment) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === _comment.article
        );

        article.populatedComments = article.populatedComments.filter(
          (__comment) => __comment.id === _comment.id
        );

        this.updateArticles(articles);
      })
    );
  }

  // Reactions
  getReactions(articleIRI: string): Observable<Reaction[]> {
    return this.apiService
      .get(
        `/reactions`,
        new HttpParams({
          fromObject: {
            article: articleIRI,
          },
        })
      )
      .pipe(
        tap((_reactions: Reaction[]) => {
          const articles = { ...this.articles };

          const article = articles['hydra:member'].find(
            (_article) => _article['@id'] === articleIRI
          );

          article.populatedReactions = _reactions;

          this.updateArticles(articles);
        })
      );
  }

  addReaction(reactionData: Reaction): Observable<Reaction> {
    return this.apiService.post('/reactions', reactionData).pipe(
      tap((_reaction: Reaction) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === reactionData.article
        );

        article.populatedReactions.push(_reaction);

        this.updateArticles(articles);
      })
    );
  }

  updateReaction(
    reactionId: number,
    reactionData: Reaction
  ): Observable<Reaction> {
    return this.apiService.put(`/reactions/${reactionId}`, reactionData).pipe(
      tap((_reaction: Reaction) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === reactionData.article
        );

        article.populatedReactions.push(_reaction);

        this.updateArticles(articles);
      })
    );
  }

  deleteReaction(reactionId: number): Observable<Reaction> {
    return this.apiService.delete(`/reactions/${reactionId}`).pipe(
      tap((_reaction: Reaction) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === _reaction.article
        );

        article.populatedComments = article.populatedComments.filter(
          (__reaction) => __reaction.id === _reaction.id
        );

        this.updateArticles(articles);
      })
    );
  }

  // Tags
  getTags(articleIRI: string): Observable<Tag[]> {
    return this.apiService
      .get(
        `/tags`,
        new HttpParams({
          fromObject: {
            article: articleIRI,
          },
        })
      )
      .pipe(
        tap((_tags: Tag[]) => {
          const articles = { ...this.articles };

          const article = articles['hydra:member'].find(
            (_article) => _article['@id'] === articleIRI
          );

          article.populatedTags = _tags;

          this.updateArticles(articles);
        })
      );
  }

  addTag(articleIRI: string, tagData: Tag): Observable<Tag> {
    return this.apiService.post('/tags', tagData).pipe(
      tap((_tag: Tag) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === articleIRI
        );

        article.populatedTags.push(_tag);

        this.updateArticles(articles);
      })
    );
  }

  updateTag(articleIRI: string, tagId: number, tagData: Tag): Observable<Tag> {
    return this.apiService.put(`/tags/${tagId}`, tagData).pipe(
      tap((_tag: Tag) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === articleIRI
        );

        article.populatedTags.push(_tag);

        this.updateArticles(articles);
      })
    );
  }

  deleteTag(articleIRI: string, tagId: number): Observable<Tag> {
    return this.apiService.delete(`/tags/${tagId}`).pipe(
      tap((_tag: Tag) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article['@id'] === articleIRI
        );

        article.populatedTags = article.populatedTags.filter(
          (__tag) => __tag.id === _tag.id
        );

        this.updateArticles(articles);
      })
    );
  }
}
