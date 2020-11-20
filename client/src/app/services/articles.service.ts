import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Article, Articles, Comment, Reaction, Tag, User } from '../models';
import { ApiService } from './api.service';
import { ProfilesService } from './profiles.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesSubject: BehaviorSubject<Articles> = new BehaviorSubject(
    new Articles()
  );
  private articleSubject: BehaviorSubject<Article> = new BehaviorSubject(
    new Article()
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
    return this.articlesSubject;
  }

  get displayedArticle$(): Observable<Article> {
    return this.articleSubject;
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
        article.populatedComments = _comments;
        article.populatedReactions = _reactions;
        article.populatedTags = _tags;

        const articles = { ...this.articles };
        const articleIndex = articles['hydra:member'].findIndex(
          (_article) => _article.id === article.id
        );

        articles[articleIndex] = article;

        console.log('getAll', article);

        this.articlesSubject.next(articles);
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
    return this.apiService.get(`/articles/${articleId}`);
  }

  create(articleData: Article): Observable<Article> {
    return this.apiService.post('/articles', articleData);
  }

  update(articleId: number, articleData: Article): Observable<Article> {
    return this.apiService.put(`/articles/${articleId}`, articleData).pipe(
      tap((_article) => {
        const article = {
          ...this.displayedArticle,
          content: _article.content,
          name: _article.name,
        };

        this.articleSubject.next(article);
      })
    );
  }

  delete(articleId: number): Observable<Article> {
    return this.apiService.delete(`/articles/${articleId}`).pipe(
      tap(() => {
        const _articles = this.articles['hydra:member'].filter((_article) => {
          _article.id !== articleId;
        });

        const articles = { ...this.articles };
        articles['hydra:member'] = _articles;

        this.articlesSubject.next(articles);

        if (this.displayedArticle && this.displayedArticle.id === articleId) {
          this.articleSubject.next(new Article());
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
        map((_comments: Comment[]) => {
          return _comments['hydra:member'];
        })
      );
  }

  addComment(articleId: number, commentData: Comment): Observable<Comment> {
    return this.apiService.post('/comments', commentData).pipe(
      tap((_comment: Comment) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        article.populatedComments.push(_comment);

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }

  updateComment(
    articleId: number,
    commentId: number,
    commentData: Comment
  ): Observable<Comment> {
    console.log('azdazdaz', commentId);
    return this.apiService.put(`/comments/${commentId}`, commentData).pipe(
      tap((_comment: Comment) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        const commentIndex = article.populatedComments.findIndex(
          (__comment) => __comment.id === commentId
        );

        article.populatedComments[commentIndex] = _comment;

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }

  deleteComment(articleId: number, commentId: number): Observable<Comment> {
    return this.apiService.delete(`/comments/${commentId}`).pipe(
      tap((_comment: Comment) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        article.populatedComments = article.populatedComments.filter(
          (__comment) => __comment.id !== commentId
        );

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
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
        map((_reactions: Reaction[]) => {
          return _reactions['hydra:member'];
        })
      );
  }

  addReaction(articleId: number, reactionData: Reaction): Observable<Reaction> {
    return this.apiService.post('/reactions', reactionData).pipe(
      tap((_reaction: Reaction) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        article.populatedReactions.push(_reaction);

        console.log('addRextion', article);

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }

  updateReaction(
    articleId: number,
    reactionId: number,
    reactionData: Reaction
  ): Observable<Reaction> {
    return this.apiService.put(`/reactions/${reactionId}`, reactionData).pipe(
      tap((_reaction: Reaction) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        const reactionIndex = article.populatedReactions.findIndex(
          (__reaction) => __reaction.id === reactionId
        );

        article.populatedReactions[reactionIndex] = _reaction;

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }

  deleteReaction(articleId: number, reactionId: number): Observable<Reaction> {
    return this.apiService.delete(`/reactions/${reactionId}`).pipe(
      tap(() => {
        console.log('deleteReaction', articleId);

        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        article.populatedReactions = article.populatedReactions.filter(
          (_reaction) => _reaction.id !== reactionId
        );

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
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
        map((_tags: Tag[]) => {
          return _tags['hydra:member'];
        })
      );
  }

  addTag(articleId: number, tagData: Tag): Observable<Tag> {
    return this.apiService.post('/tags', tagData).pipe(
      tap((_tag: Tag) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        article.populatedTags.push(_tag);

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }

  updateTag(articleId: number, tagId: number, tagData: Tag): Observable<Tag> {
    return this.apiService.put(`/tags/${tagId}`, tagData).pipe(
      tap((_tag: Tag) => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id === articleId
        );

        const tagIndex = article.populatedTags.findIndex(
          (__tag) => __tag.id === _tag.id
        );

        article.populatedTags[tagIndex] = _tag;

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }

  deleteTag(articleId: number, tagId: number): Observable<Tag> {
    return this.apiService.delete(`/tags/${tagId}`).pipe(
      tap(() => {
        const articles = { ...this.articles };

        const article = articles['hydra:member'].find(
          (_article) => _article.id == articleId
        );

        article.populatedTags = article.populatedTags.filter(
          (_tag) => _tag.id !== tagId
        );

        this.articlesSubject.next(articles);
        this.articleSubject.next(article);
      })
    );
  }
}
