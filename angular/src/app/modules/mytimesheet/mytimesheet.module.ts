import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MytimesheetComponent } from './mytimesheet.component';
import { MytimesheetRoutingModule } from './mytimesheet-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreateEditTimesheetItemComponent } from './create-edit-timesheet-item/create-edit-timesheet-item.component';
import { CreateEditTimesheetComponent } from './create-edit-timesheet/create-edit-timesheet.component';

@NgModule({
  declarations: [
    MytimesheetComponent,
    CreateEditTimesheetItemComponent,
    CreateEditTimesheetComponent
  ],
  imports: [
    CommonModule,
    MytimesheetRoutingModule,
    SharedModule,
    FormsModule,
  ],
  entryComponents: [
    CreateEditTimesheetItemComponent
  ]
})
export class MytimesheetModule { }
