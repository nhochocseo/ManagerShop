import { CreateEditTimesheetComponent } from './create-edit-timesheet/create-edit-timesheet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MytimesheetComponent } from './mytimesheet.component';


const routes: Routes = [
  {
    path: '',
    component: MytimesheetComponent
  },
  {
    path: 'create-timesheet',
    component: CreateEditTimesheetComponent
  },
  {
    path: 'edit-timesheet/:id',
    component: CreateEditTimesheetComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MytimesheetRoutingModule { }
