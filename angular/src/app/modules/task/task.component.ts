import { Component, OnInit, inject, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialog, PageEvent } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PaginationDTO } from '@shared/pagination/pagination-DTO';
import { TaskService } from '@app/service/api/task.service';
import {CreateEditTaskComponent} from './task-edit-customer/create-edit-task.component';
import * as _ from 'lodash';
import { TableComponentBase } from '@shared/table-component-base';
import { FilterRequest } from '@app/service/api/model/common-DTO';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [appModuleAnimation()]
})
export class TaskComponent extends TableComponentBase implements OnInit {
  taskForm: FormGroup;
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    injector: Injector
  ) {
    super(injector);
   }

  ngOnInit() {
    this.taskForm = this.fb.group({
      includes: ['', Validators.required],
      filters: ['', Validators.required],
      sorts: ['', Validators.required],
      page: [this.pageDto.currentPage, Validators.required],
      pageSize: [this.pageDto.pageSize, Validators.required]
    });
    this.search();
  }
  
  buildParam(): FilterRequest {
    let searchParam = this.taskForm.value;
    searchParam.page = this.pageDto.currentPage + 1;

    return searchParam;
  }
  
  buildData(data: Array<any>) {
    return _(data)
    .groupBy(x => x.type)
    .map((value, key) => ({name: key == '0' ? 'Common Task' : 'Other Task', items: value}))
    .value();;
  }

  searchApi(param: FilterRequest): Observable<any> {
    return this.taskService.filterAndPaging(param);
  }

  createTask(): void {
    this.showCreateOrEditTaskDialog();
  }

  editTask(task): void {
    this.showCreateOrEditTaskDialog(task);
  }
  showCreateOrEditTaskDialog(customer?: any): void {
    let   createOrEditTaskDialog;
    if (customer === undefined || customer === null) {
      createOrEditTaskDialog = this._dialog.open(CreateEditTaskComponent);
    } else {
      createOrEditTaskDialog = this._dialog.open(CreateEditTaskComponent, {
        data: customer
      });
    }

    createOrEditTaskDialog.afterClosed().subscribe(result => {
        if (result) {
          this.search();
        }
    });
  }
  deleteTask(task): void {
    this.taskService.delete(task.id).subscribe(res => {
      this.notify.success(this.l('Delete Customer Successfully'));
      this.search();
    })
  }
}
