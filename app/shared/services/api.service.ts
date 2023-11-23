import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
  };
  invalidApiKey: Subject<boolean> = new Subject();
  authHeaderName = 'access-token';

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {
    this.setApiKey();
  }

  async setApiKey(data?): Promise<void> {
    return new Promise(async resolve => {
      if (data && data.apiKey) {
        this.httpOptions.headers = this.httpOptions.headers.set(this.authHeaderName, data.apiKey);
      }
      resolve();
    });
  }

  /*
    Get data from a webservice
    @param uri Method
    @param data Query params
    @param notUseApiKey Not send api key header
   */
  get(uri: string, data?: object, notUseApiKey?: boolean): Observable<any> {
    if (notUseApiKey) {
      this.httpOptions.headers = this.httpOptions.headers.delete(this.authHeaderName);
    }

    let params = new HttpParams();

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    this.httpOptions.params = params;
    return this.http.get<any>(environment.apiUrlCore + uri, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /*
    Post data to a webservice
    @param uri Method
    @param data Data to post
    @param notUseApiKey Not send api key header
    @param queryParams Object with query params (optional)
   */
  post(uri: string, data: any, notUseApiKey?: boolean, queryParams?: object): Observable<any> {
    if (notUseApiKey) {
      this.httpOptions.headers = this.httpOptions.headers.delete(this.authHeaderName);
    }

    let params = new HttpParams();

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    this.httpOptions.params = params;

    return this.http.post<any>(environment.apiUrlCore + uri, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /*
    Put data to a webservice
    @param uri Method
    @param data Data to put
    @param notUseApiKey Not send api key header
    @param queryParams Object with query params (optional)
   */
  put(uri: string, data: any, notUseApiKey?: boolean, queryParams?: object): Observable<any> {
    if (notUseApiKey) {
      this.httpOptions.headers = this.httpOptions.headers.delete(this.authHeaderName);
    }

    let params = new HttpParams();

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    this.httpOptions.params = params;

    return this.http.put<any>(environment.apiUrlCore + uri, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /*
    Delete data
    @param uri Method
    @param data Query params
    @param notUseApiKey Not send api key header
   */
  delete(uri: string, data?: object, notUseApiKey?: boolean): Observable<any> {
    if (notUseApiKey) {
      this.httpOptions.headers = this.httpOptions.headers.delete(this.authHeaderName);
    }

    let params = new HttpParams();

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    this.httpOptions.params = params;

    return this.http.delete<any>(environment.apiUrlCore + uri, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /*
    Handle errors from server/webservice
    @param error Error http response type
   */
  private async handleError(error: HttpErrorResponse) {
    console.log('error status');

    console.log(error.status);



    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    const res = {
      message: error.error.message,
      errors: (error.error.errors) ? error.error.errors : null,
      status: (error.status) ? error.status : 0,
    };

    if (!error.error.message && error.message) {
      if (error.status === 0) {
        res.message = 'Check your internet conection';
      } else {
        res.message = 'An error occurred: ' + error.statusText;
      }
    }
    // return an observable with a user-facing error message
    return throwError(res);
  }
}
