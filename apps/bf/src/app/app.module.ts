import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ContainerComponent } from "@bf/exercise-3/example/exercise-3-container";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, ContainerComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
