import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideEnvironmentNgxMask(),
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
