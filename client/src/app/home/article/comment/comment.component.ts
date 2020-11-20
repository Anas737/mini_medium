import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input()
  currentUser: string;

  @Input()
  comment: Comment;

  @Input()
  articleId: number;

  @Input()
  articleAuthor: string;

  @Input()
  isAdmin;

  @Output()
  editComment = new EventEmitter();

  canDelete = true;

  constructor(private articlesService: ArticlesService) {}

  get isAuthor(): boolean {
    return this.comment.user === this.articleAuthor;
  }

  get isUser(): boolean {
    return this.comment.user === this.currentUser;
  }

  ngOnInit(): void {}

  onEditComment() {
    this.editComment.emit();
  }

  onDeleteComment() {
    this.canDelete = false;

    this.articlesService
      .deleteComment(this.articleId, this.comment.id)
      .subscribe(() => (this.canDelete = true));
  }
}
