import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    BottomNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
