import { baseURL } from './../shared/baseurl';
import { User } from './../shared/user';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  createUser(user: User): Observable<User> {
    const submittedUser = JSON.stringify(user);
    console.log("submitted:", submittedUser);
    const headers = new Headers ({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:3000/user/create', submittedUser, options)
      .map((response: Response) =>  {response.json()})
      .catch((error:Response) => Observable.throw(error.json()));
  }
}
