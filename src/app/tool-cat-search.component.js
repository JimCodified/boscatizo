"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
var tool_cat_search_service_1 = require("./tool-cat-search.service");
var ToolCatSearchComponent = (function () {
    function ToolCatSearchComponent(toolCatSearchService) {
        this.toolCatSearchService = toolCatSearchService;
        this.searchTerms = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    ToolCatSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    ToolCatSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toolCats = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.toolCatSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    return ToolCatSearchComponent;
}());
ToolCatSearchComponent = __decorate([
    core_1.Component({
        selector: 'tool-cat-search',
        templateUrl: './tool-cat-search.component.html',
        styleUrls: ['./tool-cat-search.component.css'],
        providers: [tool_cat_search_service_1.ToolCatSearchService]
    }),
    __metadata("design:paramtypes", [tool_cat_search_service_1.ToolCatSearchService])
], ToolCatSearchComponent);
exports.ToolCatSearchComponent = ToolCatSearchComponent;
//# sourceMappingURL=tool-cat-search.component.js.map