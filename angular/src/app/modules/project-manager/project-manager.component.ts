import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectManagerService } from './../../service/api/project-manager.service';
import { Component, OnInit, Injector } from '@angular/core';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDialog } from '@angular/material';
import { TableComponentBase } from '@shared/table-component-base';
import { FilterRequest } from '@app/service/api/model/common-DTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.less']
})
export class ProjectManagerComponent extends TableComponentBase implements OnInit { 
  searchForm: FormGroup;
  constructor(
    private projectManagerService : ProjectManagerService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    injector: Injector
  ) 
  {
    super(injector);
  }

  ngOnInit() {
    this.searchForm =this.fb.group({
      name: '',
      status: [this.APP_CONSTANT.EnumProjectStatus.Active]
    })
    this.search();
    this.searchForm.get('status').valueChanges.subscribe(res => {
      this.search();
    })
    console.log(this.APP_CONFIG, this.APP_CONSTANT);
  }

  buildParam(): FilterRequest {
    const status = this.searchForm.get('status').value;
    const name = this.searchForm.get('name').value;
    let searchParam: any = {};
    searchParam.sorts = 'name';
    searchParam.filters = `status==${status}`;
    searchParam.filters += name ? `,name@=${name}` : '';
    searchParam.includes = 'ProjectCustomers.Customer';
    return searchParam;
  }
  
  searchApi(param: FilterRequest): Observable<any> {
    return this.projectManagerService.filterAndPaging(param);
  }

  createProject(): void {
    this.showCreateOrEditProjectDialog();
  }

  editProject(id): void {
    this.showCreateOrEditProjectDialog(id);
  }

  deactiveProject(project): void {
    this.projectManagerService.changeStatusProject({
      id: project.id,
      status: this.APP_CONSTANT.EnumProjectStatus.Deactive
    }).subscribe(res => {
      this.notify.success(this.l('Xóa thành công'));
      this.search();
    })
  }

  deleteProject(project): void {
    this.projectManagerService.delete(project.id).subscribe(res => {
      this.notify.success(this.l('Xóa thành công'));
      this.search();
    })
  }
  
  private showCreateOrEditProjectDialog(id?: number): void {
    let showCreateOrEditProjectDialog;
    if (id === undefined || id == null) {
      showCreateOrEditProjectDialog = this._dialog.open(CreateProjectComponent);
    } 
    else {
      showCreateOrEditProjectDialog = this._dialog.open(CreateProjectComponent, {
            data: id
        });
    }

    showCreateOrEditProjectDialog.afterClosed().subscribe(result => {
      if (result) {
        this.search();
      }
    });
  }
}
