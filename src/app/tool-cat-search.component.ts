import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';


// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { ToolCatSearchService } from './tool-cat-search.service';
import { ToolCat } from './tool-cat';

@Component({
  selector: 'tool-cat-search',
  templateUrl: './tool-cat-search.component.html',
  styleUrls: ['./tool-cat-search.component.css'],
  providers: [ ToolCatSearchService ]
})

export class ToolCatSearchComponent implements OnInit {

  toolCats: Observable<ToolCat[]>;

  private searchTerms = new Subject<string>();

  constructor(
    private toolCatSearchService: ToolCatSearchService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.toolCats = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.toolCatSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<ToolCat[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<ToolCat[]>([]);
      });
  }
}
