import { Observable } from 'rxjs';
import { APP_CONFIG } from './../../../constant/api-config.constant';
import { CreateEditTimesheetItemComponent } from './../create-edit-timesheet-item/create-edit-timesheet-item.component';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { FilterRequest } from './../../../service/api/model/common-DTO';
import { Component, OnInit, Injector } from '@angular/core';
import { TimesheetItemService } from '@app/service/api/timesheet-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponentBase } from '@shared/table-component-base';
import { AppComponentBase } from '@shared/app-component-base';
import { TimesheetService } from '@app/service/api/timesheet.service';

@Component({
  selector: 'app-create-edit-timesheet',
  templateUrl: './create-edit-timesheet.component.html',
  styleUrls: ['./create-edit-timesheet.component.css']
})
export class CreateEditTimesheetComponent extends AppComponentBase implements OnInit {
  enumDayOfWeek = APP_CONFIG.EnumDayOfWeek;
  timesheet: any;
  timesheetId: any;
  activeDay: any;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private _dialog: MatDialog,
  ) {
    super(injector);
   }

  ngOnInit() {
    this.enumDayOfWeek.push({
      name: 'Total',
      value: -1
    });
    this.route.params.subscribe(param => {
      this.timesheetId = param.id;
      console.log(param);
      this.refreshTimesheetData();
    });
  }

  private refreshTimesheetData() {
    if (this.timesheetId) {
      this.getOne(this.timesheetId);
    }
    else {
      this.createOrGetMyTimesheet();
    }
  }

  getOne(timesheetId: any): any {
    this.timesheetService.getOne(timesheetId, "TimesheetItems.Task,TimesheetItems.Project").subscribe((res: any) => {
      this.handleAfterGetTimesheet(res);
    });
  }

  createOrGetMyTimesheet() {
    this.timesheetService.createOrGetMyTimesheet().subscribe((res: any) => {
      this.handleAfterGetTimesheet(res);
    });
  }

  private handleAfterGetTimesheet(res: any) {
    this.timesheet = res.result;
    // map // enumDayOfWeek
    this.enumDayOfWeek = this.enumDayOfWeek.map((res: any) => {
      res.items = (this.timesheet.timesheetItems || []).filter(it => it.dayOfWeek == res.value || res.value == -1);
      res.totalTime = res.items.reduce((total, currentValue, currentIndex, arr) => {
        return total + currentValue.workingTime;
      }, 0);
      return res;
    });
  }

  createTimesheetItem(): void {
    this.showCreateOrEditTimesheetItemDialog();
  }

  editTimesheetItem(item): void {
    this.showCreateOrEditTimesheetItemDialog(item);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    this.activeDay = this.enumDayOfWeek[tabChangeEvent.index].value;
  }

  showCreateOrEditTimesheetItemDialog(item?){
    let openDialog;
    if (item === undefined || item === null) {
      openDialog = this._dialog.open(CreateEditTimesheetItemComponent, {
        data: {
          timesheetId: this.timesheet.id,
          dayOfWeek: this.activeDay
        }
      });
    } else {
      openDialog = this._dialog.open(CreateEditTimesheetItemComponent, {
        data: {
          id: item.id,
          timesheetId: this.timesheet.id
        }
      });
    }
    openDialog.afterClosed().subscribe(result => {
        if (result) {
          this.refreshTimesheetData();
        }
    });
  }

  submitTimesheet() {
    this.timesheetService.submitTimesheet(this.timesheetId).subscribe(res => {
      this.notify.success("Submit success");
      this.router.navigate(['app/main/mytimesheet']);
    })
  }
}
