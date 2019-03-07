import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CreateEditCategoryComponent } from './category-edit-customer/create-edit-category.component';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent, CreateEditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    CreateEditCategoryComponent
  ]
})
export class CategoryModule { }
