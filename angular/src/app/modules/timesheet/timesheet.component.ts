import { Component, OnInit, Injector } from '@angular/core';
import { DetailComponent } from './detail/detail.component';
import { MatDialog, PageEvent } from '@angular/material';
import { TableComponentBase } from '@shared/table-component-base';
import { FilterRequest } from '@app/service/api/model/common-DTO';
import { Observable } from 'rxjs';
import { TimesheetService } from '@app/service/api/timesheet.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent extends TableComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private _dialog: MatDialog,
    private timesheetService: TimesheetService
  ) {
    super(injector)
   }

  ngOnInit() {
    this.search();
  }

  buildParam(): FilterRequest {
    let searchParam = new FilterRequest();
    searchParam.includes = "Member,TimesheetItems.Project";
    searchParam.page = this.pageDto.currentPage + 1;

    return searchParam;
  }

  searchApi(param: FilterRequest): Observable<any> {
    return this.timesheetService.filterAndPaging(param);
  }

  buildData(data: Array<any>){
    data = _(data)
    .groupBy(x => x.member.id)
    .map((value: any, key) => {
      console.log(value, key);
      value = value.map(timesheet => {
        timesheet.totalWorkingTime = timesheet.timesheetItems.reduce((total, currentItem) => {
          console.log(currentItem);
          return total += currentItem.workingTime;
        }, 0);
        timesheet.projectName = timesheet.timesheetItems.reduce((name, currentItem) => {
          console.log(currentItem);
          return name += ', ' + currentItem.project.name;
        }, '');

        return timesheet;
      });
      let time = value.reduce((total, currentItem) => {
        console.log(currentItem);
        return total += currentItem.totalWorkingTime;
      }, 0);
      return {
        name: value[0].member.name, 
        title: value[0].member.name, 
        startDate: value[0].startDate, 
        endDate: value[value.length - 1].endDate,
        totalWorkingTime: time, 
        items: value
      };
    })
    .value();

    return data;
  }

  showDetailDialog(timesheet?: any): void {
    let showDetailDialog = this._dialog.open(DetailComponent, {
        data: {
          timesheetId: timesheet.id
        }
      });
    }
}
