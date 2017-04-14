import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';

import { AppComponent }  from './app.component';

import { ToolCatSearchComponent } from './tool-cat-search.component';


@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent,
                  ToolCatSearchComponent,
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
