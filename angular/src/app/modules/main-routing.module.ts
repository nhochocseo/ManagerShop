import { AppRouteGuard } from './../../shared/auth/auth-route-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
const routes: Routes = [
  {
    path: 'project-manager',
    component: MainComponent,
    canActivate: [AppRouteGuard],
    children: [{
      path: '',
      children: [
        {
          path: '',
          loadChildren: '../modules/project-manager/project-manager.module#ProjectManagerModule',
          data: {
            preload: true
          }
        }
      ]
    }]
  },
  {
    path: 'customer',
    component: MainComponent,
    canActivate: [AppRouteGuard],
    children: [{
      path: '',
      children: [
        {
          path: '',
          loadChildren: '../modules/customer/customer.module#CustomerModule',
          data: {
            preload: true
          }
        }
      ]
    }]
  },
  {
    path: 'task',
    component: MainComponent,
    canActivate: [AppRouteGuard],
    children: [{
      path: '',
      children: [
        {
          path: '',
          loadChildren: '../modules/task/task.module#TaskModule',
          data: {
            preload: true
          }
        }
      ]
    }]
  },
  {
    path: 'timesheet',
    component: MainComponent,
    canActivate: [AppRouteGuard],
    children: [{
      path: '',
      children: [
        {
          path: '',
          loadChildren: '../modules/timesheet/timesheet.module#TimesheetModule',
          data: {
            preload: true
          }
        }
      ]
    }]
  },
  {
    path: 'mytimesheet',
    component: MainComponent,
    canActivate: [AppRouteGuard],
    children: [{
      path: '',
      children: [
        {
          path: '',
          loadChildren: '../modules/mytimesheet/mytimesheet.module#MytimesheetModule',
          data: {
            preload: true
          }
        }
      ]
    }]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }