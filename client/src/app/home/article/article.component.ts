import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article, Comment, Reaction, User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  currentUser: User;
  userReaction: Reaction;
  userSub: Subscription;

  article: Article;
  articlesReactions = {
    like: 0,
    love: 0,
    insightful: 0,
  };
  articleSub: Subscription;

  isSubmitting: boolean;
  commentsForm: FormGroup;

  commentToEdit: Comment;
  isEdittingComment: boolean = false;

  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private formBuilder: FormBuilder
  ) {}

  get hasArticle() {
    return Boolean(this.article['@id']);
  }

  get isUser() {
    return this.currentUser['@id'] === this.article.user;
  }

  get isAdmin() {
    return this.currentUser.role === 'admin';
  }

  get likesCount(): number {
    return this.articlesReactions['like'];
  }

  get lovesCount(): number {
    return this.articlesReactions['love'];
  }

  get insightfulsCount(): number {
    return this.articlesReactions['insightful'];
  }

  ngOnInit(): void {
    this.userSub = this.userService.currentUser$.subscribe((_user) => {
      this.currentUser = _user;
    });

    this.articleSub = this.articlesService.displayedArticle$.subscribe(
      (_article) => {
        console.log('nezaneaze', _article);
        this.article = _article;

        const _articlesReactions = {
          like: 0,
          love: 0,
          insightful: 0,
        };

        for (const reaction of this.article.populatedReactions) {
          _articlesReactions[reaction.type] += 1;
        }

        this.articlesReactions = _articlesReactions;

        this.userReaction = this.article.populatedReactions.find(
          (_reaction) => this.currentUser['@id'] === _reaction.user
        );
      }
    );

    this.commentsForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.userService.isAuthenticated) return;

    this.isSubmitting = true;

    const commentData: Comment = {
      content: this.commentsForm.value['comment'],
      user: this.currentUser['@id'],
      article: this.article['@id'],
    };

    this.commentsForm.reset();

    let comment$ = null;

    if (this.isEdittingComment) {
      console.log(this.commentToEdit.id);

      comment$ = this.articlesService.updateComment(
        this.article.id,
        this.commentToEdit.id,
        commentData
      );
    } else {
      comment$ = this.articlesService.addComment(this.article.id, commentData);
    }

    comment$.subscribe((_comment) => {
      this.isSubmitting = false;
      this.isEdittingComment = false;
      this.commentToEdit = null;
    });
  }

  onDelete() {
    this.articlesService.delete(this.article.id).subscribe();
  }

  onEditComment(comment: Comment) {
    this.commentToEdit = comment;
    this.isEdittingComment = true;
    this.commentsForm.controls['comment'].setValue(comment.content);
  }

  onReact(reactionType: string) {
    if (!this.userService.isAuthenticated) return;

    const reactionData: Reaction = {
      article: this.article['@id'],
      user: this.userService['@id'],
      type: reactionType,
    };

    let reaction$ = null;

    if (!this.userReaction) {
      reaction$ = this.articlesService.addReaction(
        this.article.id,
        reactionData
      );
    } else if (this.userReaction.type === reactionType) {
      reaction$ = this.articlesService.deleteReaction(
        this.article.id,
        this.userReaction.id
      );
    } else if (this.userReaction.type !== reactionType) {
      reaction$ = this.articlesService.updateReaction(
        this.article.id,
        this.userReaction.id,
        reactionData
      );
    }

    reaction$.subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.articleSub.unsubscribe();
  }
}
