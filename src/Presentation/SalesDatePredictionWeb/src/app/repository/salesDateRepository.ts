import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class salesDateRepository {
  url:string= environment.endPoint ;
  constructor(private http: HttpClient) {}

  getData(urlfragment:string): Observable<any> {
    return this.http.get<any>(this.url + urlfragment);
  }
  getOne(id:number,urlfragment:string): Observable<any> {
    return this.http.get<any>(this.url + urlfragment +"/" + id);
  }
  Save(data:{},urlfragment:string): Observable<any> {
    return this.http.post<any>(this.url+ urlfragment,data);
  }
  Update(data:{},id:number,urlfragment:string): Observable<any> {
    return this.http.put<any>(this.url+ urlfragment+"/" +id,data);
  }
  Delete(id:number,urlfragment:string): Observable<any> {
    return this.http.delete<any>(this.url+ urlfragment+"/" +id);
  }
}