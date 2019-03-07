import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService extends BaseApiService {
  constructor(
   http: HttpClient
  ) {
    super(http);
   }
  changeUrl() {
    return '/api/services/app/CategoryService';
  }

}
