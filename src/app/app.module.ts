import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    BottomNavbarComponent,
    TopNavbarComponent,
    CategoriesListComponent,
    OverviewComponent,
    SettingsComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TransactionFormComponent]
})
export class AppModule { }
