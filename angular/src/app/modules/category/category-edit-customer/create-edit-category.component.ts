import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CategoryManagerService } from '@app/service/api/category.service';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
})
export class CreateEditCategoryComponent extends AppComponentBase implements OnInit {
  formEdit: FormGroup;
  saving = false;
  title: string;
  editParam: any = {};
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cateService: CategoryManagerService,
    private _dialogRef: MatDialogRef<CreateEditCategoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private cate: any
  ) {
    super(injector);
   }

  ngOnInit() {
    this.formEdit = this.fb.group({
      name: ['', Validators.required]
    });
    if (this.cate == null || this.cate === undefined) {
      this.title = 'Tạo mới';
    } else {
      this.formEdit.patchValue(this.cate);
      this.title = 'Sửa';
    }
  }

  save(){
    console.log(this.formEdit);
    if (!this.formEdit.valid) {
      return;
    } else {
      this.editParam = this.formEdit.value;
      if (this.cate != null && this.cate !== undefined) {
        this.editParam.id = this.cate.id;
      }
      this.cateService.save(this.editParam).subscribe(res => {
        if (res.success === true) {
          if (this.cate == null || this.cate === undefined) {
            this.notify.success(this.l('Tạo mới thành công'));
          } else {
            this.notify.success(this.l('Sửa tành công'));
          }
          this.close(true);
        }
      });
    }
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
