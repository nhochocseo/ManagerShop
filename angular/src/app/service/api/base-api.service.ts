import { FilterRequest } from './model/common-DTO';
import { AppConsts } from './../../../shared/AppConsts';
import { Injectable,Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export abstract class BaseApiService {
    protected baseUrl = AppConsts.remoteServiceBaseUrl;
    protected get rootUrl() {
        return this.baseUrl + this.changeUrl();
    }

    protected http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    abstract changeUrl();

    protected getUrl(url: string) {
        return this.baseUrl + this.changeUrl() + '/' + url;
    }
    //
    getOne(id: any, includes: string = ''): Observable<any> {
        return this.http.get(this.rootUrl + '/Get?' + `id=${id}&includes=${includes}`);
    }

    filterAndPaging(key: FilterRequest): Observable<any> {
        return this.http.get(this.rootUrl + '/FilterAndPaging?' + `Includes=${key.includes}&Filters=${key.filters}&Sorts=${key.sorts}&Page=${key.page}&PageSize=${key.pageSize}`);
    }
    filter(key: FilterRequest): Observable<any> {
        return this.http.get(this.rootUrl + '/Filter?' + `Includes=${key.includes}&Filters=${key.filters}&Sorts=${key.sorts}&Page=${key.page}&PageSize=${key.pageSize}`);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(this.rootUrl + '/Delete?' + `id=${id}`);
    }
    save(data: object): Observable<any> {
        return this.http.post(this.rootUrl + '/Save', data);
    }
}
