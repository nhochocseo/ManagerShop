import { PaginationDTO } from './../../../shared/pagination/pagination-DTO';
import { CreateEditCustomerComponent } from './create-edit-customer/create-edit-customer.component';
import { MatDialog, PageEvent } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './../../service/api/customer.service';
import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TableComponentBase } from '@shared/table-component-base';
import { FilterRequest } from '@app/service/api/model/common-DTO';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  animations: [appModuleAnimation()]
})

export class CustomerComponent extends TableComponentBase implements OnInit {
  customerForm: FormGroup;
  isActive: boolean | null;
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      includes: ['', Validators.required],
      filters: ['', Validators.required],
      sorts: ['', Validators.required],
      page: [this.pageDto.currentPage, Validators.required],
      pageSize: [this.pageDto.pageSize, Validators.required]
    })
    this.search();
  }

  buildParam(): FilterRequest {
    let searchParam = this.customerForm.value;
    searchParam.page = this.pageDto.currentPage + 1;

    return searchParam;
  }

  searchApi(param: FilterRequest): Observable<any> {
    return this.customerService.filterAndPaging(param);
  }

  createCustomer(): void {
    this.showCreateOrEditUserDialog();
  }

  editCustomer(customer): void {
    this.showCreateOrEditUserDialog(customer);
  }

  deleteCustomer(cutomer): void {
    this.customerService.delete(cutomer.id).subscribe(res => {
      this.notify.success(this.l('Delete Customer Successfully'));
      this.search();
    })
  }

  showCreateOrEditUserDialog(customer?: any): void {
    let createOrEditUserDialog;
    if (customer === undefined || customer === null) {
        createOrEditUserDialog = this._dialog.open(CreateEditCustomerComponent);
    } else {
      createOrEditUserDialog = this._dialog.open(CreateEditCustomerComponent, {
        data: customer
      });
    }

    createOrEditUserDialog.afterClosed().subscribe(result => {
        if (result) {
          this.search();
        }
    });
  }
}
