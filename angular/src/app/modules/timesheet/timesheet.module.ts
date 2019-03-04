import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [TimesheetComponent, DetailComponent],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedModule
  ],
  entryComponents:[DetailComponent]
})
export class TimesheetModule { }
