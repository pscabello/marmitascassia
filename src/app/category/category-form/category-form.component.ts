import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';



@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html'
  })

  export class CategoryFormComponent implements OnInit {

    formTitle: String;
    model: Category = null;
    isNew: boolean;
    submitted: boolean = false;

    constructor(private categoryService: CategoryService,
      private route: ActivatedRoute,
      private location: Location,
      private router : Router) {

    }

    //TODO:get categories from DB

    newCategory() {
      this.model = new Category();
    }

    onSubmit() {
      this.categoryService.updateCategory(this.model, this.isNew)
      .then(_ => {
        this.submitted = true;

        if (this.isNew) {

          this.router.navigate([`/categories`]);

        } else {

          this.router.navigate([`categories/detail/${this.model.$key}`]);

        }

      });
    }

    onChange(value) {
      if (!this.isNew) {
        this.formTitle = 'Editando Categoria: ' + value;
      }
    }

    goBack() {
  	  this.router.navigate([`/categories`]);
  	}

    ngOnInit() {
      this.route.params.subscribe((params) => {
        if(params['id']) {
          this.isNew = false;
          this.route.params
            .map(params => params['id'])
            .switchMap(id => this.categoryService.getCategory(id))
            .subscribe(category => {
              this.model = category,
              this.formTitle = 'Editando Categoria: ' + category.name
            });
        } else {
          this.formTitle = 'Nova Categoria';
          this.isNew = true;
          this.newCategory();
        }
      });
    }
  }
