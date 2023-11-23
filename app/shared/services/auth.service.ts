import { Platform, MenuController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Storage } from '@capacitor/storage';
// import { User } from '../types/types';
import { Subject } from 'rxjs';
// import { ProxyService } from './proxy.service';
import * as YaleConnect from '../types/YaleConnect.Types';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
// import { AccessControlUsers } from '../types/users.type';
import { LoadingService } from './loading.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../types/YaleConnect.Types';
import { ApisURL } from '../types/Apis_URL';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	controllerApi: string = ApisURL.API_LOGINSUPPORT;
	loggedStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
	redirectUrl: string;
	accountObserver = false;
	stoken: YaleConnect.AccessToken = new YaleConnect.AccessToken();
	entryCode: string = '';
	firebaseToken: BehaviorSubject<string> = new BehaviorSubject(null);
	accessControlUserChange: Subject<any> = new Subject<any>();
	loginRequest = new LoginRequest();


	//INFO USUARIO
	token: string;
	accountID: number;
	idRol: number;


	constructor(
		private platform: Platform,
		//private storage: Storage,
		private menu: MenuController,
		private router: Router,
		private api: ApiService,
		private loadingService: LoadingService,
		public http: HttpClient
	) {
		this.platform.ready().then(() => {
			// this.isLoggedIn();
		});

	}

	login2(email: string, password: string): Observable<LoginResponse> {

		this.loginRequest.email = email;
		this.loginRequest.password = password;
		return this.http.post<LoginResponse>(environment.apiUrlCore + this.controllerApi, this.loginRequest)
			.pipe(
				tap(resp => {
					if (resp.accessToken != "Error") {

						window.sessionStorage.setItem('token', resp.accessToken.toString());
						this.accountID = resp.accountID;
						this.token = resp.accessToken.toString();
						this.idRol = resp.idRol;

					}
				}),
				map(resp => resp),
				catchError(error => of(error.error))
			);
	}

	async login(email: string, password: string): Promise<string> {

		this.loginRequest.email = email;
		this.loginRequest.password = password;

		return new Promise((resolve, rejects) => {

			this.getToken(this.loginRequest).then((value) => {
				resolve(value.toString());
			}).catch((e => {
				resolve(e);
			}));
		}
		);
	}

	async getToken(login: LoginRequest): Promise<string> {

		return new Promise(async (resolve, reject) => {
			this.http.post<LoginResponse>(environment.apiUrlCore + this.controllerApi, login).subscribe((res: LoginResponse) => {
				console.log(res.accessToken, 'TOKEN')

				window.sessionStorage.setItem('token', res.accessToken.toString());
				this.accountID = res.accountID;
				this.token = res.accessToken.toString();
				this.idRol = res.idRol;

				resolve(res.accessToken.toString());


			},
				(err: HttpErrorResponse) => { //HttpErrorResponse
					resolve(err.statusText.toString());
				})
		});
	}

	async logout(): Promise<void> {
		await window.sessionStorage.removeItem('token');
	}

	async isLoggedIn() {

		const res = window.sessionStorage.getItem('token');

		if (res) {
			this.loggedStatus.next(true);
		} else {

			this.loggedStatus.next(false);
		}

		return this.loggedStatus.value;
	}
}
