import { Component, OnInit, inject, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialog, PageEvent } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PaginationDTO } from '@shared/pagination/pagination-DTO';
import { TaskService } from '@app/service/api/task.service';
import * as _ from 'lodash';
import { TableComponentBase } from '@shared/table-component-base';
import { FilterRequest } from '@app/service/api/model/common-DTO';
import { Observable } from 'rxjs';
import { CreateEditCategoryComponent } from './category-edit-customer/create-edit-category.component';
import { CategoryManagerService } from '@app/service/api/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [appModuleAnimation()]
})
export class CategoryComponent extends TableComponentBase implements OnInit {
  appForm: FormGroup;
  constructor(
    private taskService: CategoryManagerService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    injector: Injector
  ) {
    super(injector);
   }

  ngOnInit() {
    this.appForm = this.fb.group({
      includes: ['', Validators.required],
      filters: ['', Validators.required],
      sorts: ['', Validators.required],
      page: [this.pageDto.currentPage, Validators.required],
      pageSize: [this.pageDto.pageSize, Validators.required]
    });
    this.search();
  }

  buildParam(): FilterRequest {
    let searchParam = this.appForm.value;
    searchParam.page = this.pageDto.currentPage + 1;

    return searchParam;
  }

  buildData(data: Array<any>) {
    return _(data)
    .groupBy(x => x.type)
    .map((value, key) => ({items: value}))
    .value();
  }

  searchApi(param: FilterRequest): Observable<any> {
    return this.taskService.filterAndPaging(param);
  }

  create(): void {
    this.showCreateOrEditDialog();
  }

  showCreateOrEditDialog(customer?: any): void {
    let   createOrEditTaskDialog;
    if (customer === undefined || customer === null) {
      createOrEditTaskDialog = this._dialog.open(CreateEditCategoryComponent);
    } else {
      createOrEditTaskDialog = this._dialog.open(CreateEditCategoryComponent, {
        data: customer
      });
    }

    createOrEditTaskDialog.afterClosed().subscribe(result => {
        if (result) {
          this.search();
        }
    });
  }
  edit(data: any): void {
    this.showCreateOrEditDialog(data);
  }
  delete(data: any): void {
    this.taskService.delete(data.id).subscribe(res => {
      this.notify.success(this.l('Delete Customer Successfully'));
      this.search();
    });
  }
}
