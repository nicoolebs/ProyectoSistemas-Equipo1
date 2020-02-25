import { AppRoutingModule } from './../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavDashComponent } from './nav-dash/nav-dash.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavDashComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavDashComponent
  ]
})
export class SharedModule { }
