import { TaskService } from './../../../service/api/task.service';
import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { ProjectManagerService } from './../../../service/api/project-manager.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerService } from '../../../service/api/customer.service';
import { MemberService } from './../../../service/api/member.service';
import { PaginationDTO } from './../../../../shared/pagination/pagination-DTO';
import { CreateEditCustomerComponent } from '@app/modules/customer/create-edit-customer/create-edit-customer.component';
import { map } from 'rxjs/operators';
import { FilterRequest } from '@app/service/api/model/common-DTO';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent extends AppComponentBase implements OnInit {
  formCreateEdit: FormGroup;
  title: string;
  listMember = [];
  listCustomer = [];
  memberForm = new FormControl();
  taskForm = new FormControl();
  listTask = [];
  projectTypes = this.APP_CONSTANT.EnumProjectType;
  project: any = {};
  searchTeamApiInput: Function;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private projectManagerService: ProjectManagerService,
    private memberService: MemberService,
    private customerService: CustomerService,
    private taskService: TaskService,
    private _dialogRef: MatDialogRef<CreateProjectComponent>,
    private _dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) private id: any
  ) {
    super(injector);
  }

  ngOnInit() {
    this.formCreateEdit = this.fb.group({
      projectCustomers: ['', Validators.required],
      name: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      status: [0],
      code: ['', Validators.required],
      projectType: [this.projectTypes.Timeandmaterials, Validators.required],
      note: ['',],
    })
    if (this.id == null || this.id == undefined) {
      this.title = 'Create Project';
    } else {
      this.title = 'Edit Project';
      this.projectManagerService.getOne(this.id, 'ProjectCustomers.Customer,ProjectMembers.Member,ProjectTasks.Task').subscribe(res => {
        console.log(res);
        this.project = res['result'];
        this.project.projectCustomers = this.project.projectCustomers.map(res => res.customerId);
        this.listTask = this.project.projectTasks;
        this.listMember = this.project.projectMembers;
        this.formCreateEdit.patchValue(this.project);
      })
    }
    this.getAllCustomer();
  }

  save() {
    if (!this.formCreateEdit.valid) {
      return;
    }

    let editParam = this.formCreateEdit.value;
    editParam.projectCustomers = (this.formCreateEdit.value.projectCustomers || []).map(vl => {
      return {
        customerId: vl,
      };
    });
    if (this.id != null && this.id != undefined) {
      editParam.id = this.project.id;
    }
    editParam.projectTasks = this.listTask;
    editParam.projectMembers = this.listMember;

    this.projectManagerService.save(editParam).subscribe(res => {

      if (res.success == true) {
        if (this.id == null || this.id == undefined) {
          this.notify.success(this.l('Create Project Successfully'));
        }
        else {
          this.notify.success(this.l('Edit Project Successfully'));
        }
        this.close(true);
      }
    })
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

  searchTeamApi(value) {
    console.log(this.memberForm);
    let searchParam = new FilterRequest();
    searchParam.filters = 'name@=' + value;
    return this.memberService.filter(searchParam).pipe(
      map((res: any) => {
        return res.result;
      })
    )
  }

  removeMember(member) {
    this.listMember = this.listMember.filter(item => item != member);
  }
  
  removeTask(member) {
    this.listTask = this.listTask.filter(item => item != member);
  }

  selectTeam(event) {
    event.memberId = event.id;
    event.id = null;
    event.isProjectAdmin = false;
    this.listMember.push(event);
    this.listMember = _.uniqBy(this.listMember, 'memberId');
  }
  
  selectTask(event) {
    event.taskId = event.id;
    event.id = null;
    event.billable = false;
    this.listTask.push(event);
    this.listTask = _.uniqBy(this.listTask, 'taskId');
  }

  searchTaskApi(value){
    let searchParam = new FilterRequest();
    searchParam.filters = 'name@=' + value;
    return this.taskService.filter(searchParam).pipe(
      map((res: any) => {
        return res.result;
      })
    )
  }

  getAllCustomer(callback?) {
    let searchParam = new FilterRequest();
    searchParam.pageSize = 1000;
    this.customerService.filterAndPaging(searchParam).subscribe(res => {
      this.listCustomer = res['result'].items;
    }, null, callback)
  }

  createCustomer() {
    let showCreateOrEditProjectDialog;
    showCreateOrEditProjectDialog = this._dialog.open(CreateEditCustomerComponent);
    showCreateOrEditProjectDialog.afterClosed().subscribe(result => {
      if (result == true) {
        this.getAllCustomer(() => {
          let listId = this.formCreateEdit.value.projectCustomers ? this.formCreateEdit.value.projectCustomers : [];
          listId.push(this.listCustomer[this.listCustomer.length - 1].id);
          this.formCreateEdit.patchValue({
            projectCustomers: listId
          })
        })
      }
    })
  }
}