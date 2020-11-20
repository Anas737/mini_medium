import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/models';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  isSubmitting = false;
  isEditting = false;

  articleId: number;

  constructor(
    private articlesService: ArticlesService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.activatedRouter.params.subscribe((data) => {
      if (data.articleId) {
        this.articleId = data.articleId;

        this.isEditting = true;

        this.articlesService.getOne(data.articleId).subscribe((_article) => {
          this.articleForm.controls['name'].setValue(_article.name);
          this.articleForm.controls['content'].setValue(_article.content);
        });
      }
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const articleData: Article = {
      ...this.articleForm.value,
      reference: '',
      draft: false,
    };

    let article$ = null;

    if (this.isEditting) {
      article$ = this.articlesService.update(this.articleId, articleData);
    } else {
      article$ = this.articlesService.create(articleData);
    }

    article$.subscribe(() => {
      this.isSubmitting = false;

      this.router.navigateByUrl('/');
    });
  }
}
