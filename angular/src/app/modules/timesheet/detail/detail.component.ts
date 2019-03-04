import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { TimesheetService } from '@app/service/api/timesheet.service';
import { APP_CONFIG } from '@app/constant/api-config.constant';
import * as _ from 'lodash';
import { APP_CONSTANT } from '@app/constant/api.constants';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  enumDayOfWeek = APP_CONFIG.EnumDayOfWeek;
  timesheet: any;
  timesheetId: any;

  constructor(
    private _dialog: MatDialog,
    private timesheetService: TimesheetService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    this.timesheetId = this.data.timesheetId;
    this.getOne(this.timesheetId);
  }

  getOne(timesheetId: any): any {
    this.timesheetService.getOne(timesheetId, "Member,TimesheetItems.Task,TimesheetItems.Project").subscribe((res: any) => {
      this.handleAfterGetTimesheet(res);
    });
  }

  private handleAfterGetTimesheet(res: any) {
    this.timesheet = res.result;
    // map // enumDayOfWeek
    // this.enumDayOfWeek = this.enumDayOfWeek.map((res: any) => {
    //   res.items = (this.timesheet.timesheetItems || []).filter(it => it.dayOfWeek == res.value || res.value == -1);
    //   res.totalTime = res.items.reduce((total, currentValue, currentIndex, arr) => {
    //     return total + currentValue.workingTime;
    //   }, 0);
    //   return res;
    // });
    this.timesheet.timesheetItems = _(this.timesheet.timesheetItems)
      .groupBy(x => x.project.id + '' + x.task.id)
      .map((value: any, key) => {
        console.log(value, key);
        return {
          projectName: value[0].project.name,
          taskName: value[0].task.name,
          mon: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Monday),
          tue: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Tuesday),
          wed: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Wednesday),
          thu: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Thursday),
          fri: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Friday),
          sat: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Saturday),
          sun: this.getTimesheetItemByDayOfWeek(value, APP_CONSTANT.EnumDayOfWeek.Sunday),
          total: this.getTimesheetItemByDayOfWeek(value)
        };
      }).value();
      console.log(this.timesheet);
  }
  getTimesheetItemByDayOfWeek(value: any, day: number = -1): any {
    let tmIt = value.filter(res => res.dayOfWeek == day || day == -1);
    if (!tmIt || tmIt.length == 0) {
      return {
        hours: 0,
        tooltip: ''
      };
    }

    const hours = tmIt.reduce((total, currentItem) => {
      return total += currentItem.workingTime;
    }, 0);
    if (day == -1) {
      return {
        hours: hours,
        tooltip: ''
      };
    }

    const tooltip = tmIt.reduce((total, currentItem) => {
      return total += currentItem.note + ',';
    }, '');
    return {
      hours: hours,
      tooltip: tooltip
    };
  }
}
