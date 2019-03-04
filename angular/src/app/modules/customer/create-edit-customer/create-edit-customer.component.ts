import { AppComponentBase } from '@shared/app-component-base';
import { CustomerService } from '../../../service/api/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html',
  styleUrls: ['./create-edit-customer.component.css']
})
export class CreateEditCustomerComponent extends AppComponentBase implements OnInit {
  formCreateEdit: FormGroup;
  saving = false;
  title: string;
  editParam: any = {};
  constructor(
    injector: Injector,
    private fb : FormBuilder,
    private customerService: CustomerService,
    private _dialogRef: MatDialogRef<CreateEditCustomerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private customer: any
  ) {
    super(injector);
   }

  ngOnInit() {
    this.formCreateEdit = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', (Validators.required, Validators.email)]
    })
    if(this.customer == null || this.customer == undefined){
      this.title = 'Create Customer';
    }
    else{
      this.formCreateEdit.patchValue(this.customer);
      this.title = 'Edit Customer';
    }
  }

  save(){
    if(!this.formCreateEdit.valid){
      return;
    }
    else{
      this.editParam = this.formCreateEdit.value;
      if(this.customer != null && this.customer != undefined){
        this.editParam.id = this.customer.id;
      }
      this.customerService.save(this.editParam).subscribe(res => {
        if(res.success == true){
          if(this.customer == null || this.customer == undefined){
            this.notify.success(this.l('Create Customer Successfully'));
          }
          else{
            this.notify.success(this.l('Edit Customer Successfully'));
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
