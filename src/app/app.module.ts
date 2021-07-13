import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    BottomNavbarComponent,
    TopNavbarComponent,
    CategoriesListComponent,
    OverviewComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
