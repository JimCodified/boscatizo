import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ToolCat }           from './tool-cat';

@Injectable()
export class ToolCatSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<ToolCat[]> {
    return this.http
               .get(`http://localhost:3005/toolCategories?q=${term}`)
               .map(response => response.json() as ToolCat[]);
  }
}
