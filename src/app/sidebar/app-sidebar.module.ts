import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';

import { AppTrendsModule } from 'src/app/trends';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [
    AppTrendsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CardModule,
    SidebarModule,
  ],
})
export class AppSidebarModule {}
