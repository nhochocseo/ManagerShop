import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseApiService {
  constructor(
   http: HttpClient
  ) {
    super(http);
   }
  changeUrl() {
    return '/api/services/app/TaskService';
  }
}
