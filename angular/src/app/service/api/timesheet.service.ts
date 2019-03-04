import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService extends BaseApiService{
  submitTimesheet(timesheetId: any): any {
    return this.http.post(this.getUrl('SubmitTimesheet?timesheetId='+ timesheetId), {});
  }

  constructor(http: HttpClient) {
    super(http);
  }
  changeUrl() {
    return '/api/services/app/TimesheetService';
  }

  createOrGetMyTimesheet() {
    return this.http.post(this.getUrl('CreateMyTimesheet'), {});
  }
}
