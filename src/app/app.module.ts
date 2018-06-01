import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Core Module forRoot registers all the core Singleton providers for the application
    CoreModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {
}
