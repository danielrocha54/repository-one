import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { reducers, metaReducers } from '../store';
import { AppDataEffects } from '../store/effects/data.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppTableComponent } from './app-table/app-table.component';
import { AppCounterComponent } from './app-counter/app-counter.component';
import { NgbdSortableHeader } from './app-table/app-table-sort.directive';
import { MyFilterPipe } from './app-table/app-table-filter.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppMainPageComponent } from './app-main-page/app-main-page.component';
import { LoginPasswordDirective } from './login/login.password.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppTableComponent,
    AppCounterComponent,
    NgbdSortableHeader,
    MyFilterPipe,
    LoginComponent,
    RegisterComponent,
    AppMainPageComponent,
    LoginPasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2TableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppDataEffects])
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
