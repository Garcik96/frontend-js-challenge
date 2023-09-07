import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';

import { AppTrendsRoutingModule } from './app-trends-routing.module';
import { AuthInterceptor } from './auth-interceptor';
import { trendsEffects } from './store/effects';
import { trendsFeatureKey, trendsReducer } from './store/reducers';
import { TrendDetailComponent } from './trend-detail/trend-detail.component';
import { TrendEditComponent } from './trend-edit/trend-edit.component';
import { TrendService } from './trend.service';
import { TrendsListComponent } from './trends-list/trends-list.component';

@NgModule({
  declarations: [TrendsListComponent, TrendDetailComponent, TrendEditComponent],
  imports: [
    AppTrendsRoutingModule,
    CommonModule,
    DropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(trendsFeatureKey, trendsReducer),
    EffectsModule.forFeature(trendsEffects),
  ],
  exports: [TrendsListComponent, TrendEditComponent],
  providers: [
    TrendService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppTrendsModule {}
