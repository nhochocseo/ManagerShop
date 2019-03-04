import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagerComponent } from './project-manager.component';
import { SharedModule } from '@shared/shared.module';
import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { FormsModule } from '@angular/forms';
import { CreateEditCustomerComponent } from '../customer/create-edit-customer/create-edit-customer.component';
import { CustomerModule } from '../customer/customer.module';
import { CreateProjectComponent } from './create-project/create-project.component';

@NgModule({
  declarations: [ProjectManagerComponent, CreateProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectManagerRoutingModule,
    FormsModule,
    CustomerModule
  ],
  entryComponents:[CreateProjectComponent,CreateEditCustomerComponent]
})
export class ProjectManagerModule { }
