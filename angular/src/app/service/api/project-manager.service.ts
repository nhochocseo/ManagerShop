import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService extends BaseApiService {
  constructor(
   http: HttpClient
  ) {
    super(http);
   }
  changeUrl() {
    return '/api/services/app/ProjectService';
  }

  changeStatusProject(param: {id: number, status: number}): Observable<any> {
    return this.http.post(this.rootUrl + '/ChangeStatusProject', param);
  }
}
