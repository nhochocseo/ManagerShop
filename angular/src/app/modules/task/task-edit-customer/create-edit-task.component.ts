import { AppComponentBase } from '@shared/app-component-base';
import { TaskService } from '../../../service/api/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-task',
  templateUrl: './create-edit-task.component.html',
})
export class CreateEditTaskComponent extends AppComponentBase implements OnInit {
  formTaskEdit: FormGroup;
  saving = false;
  title: string;
  editParam: any = {};
  constructor(
    injector: Injector,
    private fb : FormBuilder,
    private taskService: TaskService,
    private _dialogRef: MatDialogRef<CreateEditTaskComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private task: any
  ) {
    super(injector);
   }

  ngOnInit() {
    this.formTaskEdit = this.fb.group({
      name: ['', Validators.required],
      billable: ['', Validators.required],
      type: ['', Validators.required],
    })
    if(this.task == null || this.task == undefined){
      this.title = 'Create Task';
    }
    else{
      this.formTaskEdit.patchValue(this.task);
      this.title = 'Edit Task';
    }
  }

  save(){
    console.log(this.formTaskEdit);
    if(!this.formTaskEdit.valid){
      return;
    }
    else{
      this.editParam = this.formTaskEdit.value;
      if(this.task != null && this.task != undefined){
        this.editParam.id = this.task.id;
      }
      this.taskService.save(this.editParam).subscribe(res => {
        if(res.success == true){
          if(this.task == null || this.task == undefined){
            this.notify.success(this.l('Create Task Successfully'));
          }
          else{
            this.notify.success(this.l('Edit Task Successfully'));
          }
          this.close(true);
        }
      })
    }
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
