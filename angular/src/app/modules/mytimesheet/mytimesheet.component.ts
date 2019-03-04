import { APP_CONFIG } from '@app/constant/api-config.constant';
import { Observable } from 'rxjs';
import { FilterRequest } from './../../service/api/model/common-DTO';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from '@app/service/api/timesheet.service';
import { TableComponentBase } from '@shared/table-component-base';

@Component({
  selector: 'app-mytimesheet',
  templateUrl: './mytimesheet.component.html',
  styleUrls: ['./mytimesheet.component.css']
})
export class MytimesheetComponent extends TableComponentBase implements OnInit {
  filterRequest: FilterRequest = new FilterRequest();
  constructor(
    injector: Injector,
    private router: Router,
    private timesheetService: TimesheetService
  ) {
    super(injector)
   }

  ngOnInit() {
    this.search();
  }
  buildParam(): FilterRequest{
    let searchParam = this.filterRequest;
    searchParam.page = this.pageDto.currentPage + 1;

    return searchParam;
  }
  searchApi(param: FilterRequest): Observable<any> {
    return this.timesheetService.filterAndPaging(param);
  }
  createOrEditTimesheet(id?){
    let title;
    if(id){
      title = `edit-timesheet/${id}`;
    }
    else{
      title = 'create-timesheet';
    }
    this.router.navigate([`/app/main/mytimesheet/${title}`]);
  }
  buildData(data: Array<any>){
    data.map(vl => {
      let startDate = new Date(vl.startDate);
      let endDate = new Date(vl.endDate);
      vl.startDate = `${startDate.getDate()} - ${startDate.getMonth()+1} - ${startDate.getFullYear()}`;
      vl.endDate = `${endDate.getDate()} - ${endDate.getMonth()+1} - ${endDate.getFullYear()}`;
      APP_CONFIG.TimesheetStatus.map(result => {
        if(vl.status == result.value){
          vl.status = result.name;
        }
      })
    })
    return data;
  }

  deleteTimesheet(id){
    this.timesheetService.delete(id).subscribe(res => {
      this.notify.success(this.l('Delete Timesheet Successfully'));
      this.search();
    })
  }
}