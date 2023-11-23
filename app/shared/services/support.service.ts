import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { SupportType } from '../types/Support.Types';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApisURL } from '../types/Apis_URL';
import { DevicesActivity } from '../types/YaleConnect.Types';

@Injectable({
  providedIn: 'root'
})

export class SupportServices {

  // controllerApi: string = ApisURL.API_SUPPORT;

  constructor(
    public http: HttpClient) {


  }

  getDataObjects(email: string, mac: string, accountID: number) {

    return this.http.get<SupportType>(environment.apiUrlCore + ApisURL.API_SUPPORT + '?email=' + email + '&mac=' + mac + '&accountID=' + accountID);
  }

  getDevicesActivity() {

    return this.http.get<DevicesActivity>(environment.apiUrlCore + ApisURL.API_getDevicesActivit);

  }

  resendEmail(accountID: number):Observable<any> {
    return this.http.post(environment.apiUrlCore + ApisURL.API_reSendEmail, { accountID });
  }
}