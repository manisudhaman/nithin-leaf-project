import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LeafService {

  private headers = new Headers({ 'Content-Type': 'applileafion/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getLeafs(): Observable<any> {
    return this.http.get('/api/leafs').map(res => res.json());
  }

  countLeafs(): Observable<any> {
    return this.http.get('/api/leafs/count').map(res => res.json());
  }

  addLeaf(leaf): Observable<any> {
    return this.http.post('/api/leaf', JSON.stringify(leaf), this.options);
  }

  getLeaf(leaf): Observable<any> {
    return this.http.get(`/api/leaf/${leaf._id}`).map(res => res.json());
  }

  editLeaf(leaf): Observable<any> {
    return this.http.put(`/api/leaf/${leaf._id}`, JSON.stringify(leaf), this.options);
  }

  deleteLeaf(leaf): Observable<any> {
    return this.http.delete(`/api/leaf/${leaf._id}`, this.options);
  }

}
