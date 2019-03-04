import { APP_CONSTANT } from '@app/constant/api.constants';
import { FilterRequest } from './../../../service/api/model/common-DTO';
import { ProjectManagerService } from './../../../service/api/project-manager.service';
import { AppComponentBase } from '@shared/app-component-base';
import { APP_CONFIG } from './../../../constant/api-config.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Optional, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from '@app/service/api/task.service';
import { TimesheetItemService } from '@app/service/api/timesheet-item.service';

@Component({
  selector: 'app-create-edit-timesheet-item',
  templateUrl: './create-edit-timesheet-item.component.html',
  styleUrls: ['./create-edit-timesheet-item.component.css']
})
export class CreateEditTimesheetItemComponent extends AppComponentBase implements OnInit {
  title: any;
  formTimesheetItem: FormGroup;
  listTypeWork: any = [];
  listProject: any = [];
  listTask: any = [];
  filterRequest = new FilterRequest();
  constructor(
    private fb: FormBuilder,
    private injector: Injector,
    private _dialogRef: MatDialogRef<CreateEditTimesheetItemComponent>,
    private taskService: TaskService,
    private projectManagerService: ProjectManagerService,
    private timesheetItemService: TimesheetItemService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    super(injector);
   }

  ngOnInit() {
    this.listTypeWork = APP_CONFIG.EnumTypeOfWork;
    this.taskService.filter(this.filterRequest).subscribe(res => {
      this.listTask = res['result'].map(vl => {
        return {
          value: vl.id,
          name: vl.name
        }
      });
    })
    this.projectManagerService.filter(this.filterRequest).subscribe(res => {
      this.listProject = res['result'].map(vl => {
        return {
          value: vl.id,
          name: vl.name
        }
      })
    })
    this.formTimesheetItem = this.fb.group({
      id: '',
      workingTime:['', Validators.required],
      timesheetId: [this.data.timesheetId, Validators.required],
      memberId:[1, Validators.required],
      projectId:['', Validators.required],  
      taskId:['', Validators.required],
      note:[''],
      dayOfWeek: [this.data.dayOfWeek, Validators.required],
      typeOfWork: [this.listTypeWork[0].value, Validators.required],
      isCharged: false,
      createDate: new Date(),
      updateDate: new Date()
    })
    console.log(this.data);
    if(this.data.id == null || this.data.id == undefined){
      this.title = 'New Time Entry';
    }
    else{
      this.title = 'Edit Time Entry';
      this.patchValueToForm(this.data.id);
    }
  }

  patchValueToForm(id: any): any {
    this.timesheetItemService.getOne(id).subscribe(res => {
      this.formTimesheetItem.patchValue(res.result);
    })
  }

  save(){
    if(!this.formTimesheetItem.valid){
      return;
    }
    let bodyTimesheetItem = this.formTimesheetItem.value;
    this.timesheetItemService.save(bodyTimesheetItem).subscribe(res => {
      if(res.success == true){
        if(this.data.id == null || this.data.id == undefined){
          this.notify.success(this.l('Create timesheetItem successfully'));
        }
        else{
          this.notify.success(this.l('Edit timesheetItem successfully'));
        }
        this.close(true);
      }
    })
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
