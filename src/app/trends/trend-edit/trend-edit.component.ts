import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CustomBreakpointObserver } from 'src/app/layout';
import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import { TrendProviderDropdown } from 'src/app/trends/models/trend-provider-dropdown.model';
import { Trend } from 'src/app/trends/models/trend.model';
import {
  createTrend,
  editTrend,
} from 'src/app/trends/store/actions/trend-edit-page.actions';
import { selectSelectedTrend } from 'src/app/trends/store/selectors';
import { TrendProvider } from '../models/trend-provider.model';
import { selectSidebarState } from 'src/app/store/selectors';

@Component({
  selector: 'app-trend-edit',
  template: `
    <aside class="trend-edit__container">
      <div class="trend-edit-header__container">
        <h2 class="trend-edit-header__title">
          {{ isNewTrend ? 'Nueva noticia' : 'Edita la noticia' }}
        </h2>
        <div
          *ngIf="(isSmallScreen$ | async) === false"
          class="trend-edit-header__actions">
          <button
            class="app-button app-button--secondary"
            (click)="closeSidebar()">
            Cancelar
          </button>
          <button class="app-button app-button--primary" (click)="saveTrend()">
            Guardar
          </button>
        </div>
      </div>
      <form [formGroup]="trendForm" class="trend-edit-content__container">
        <label
          for="trendUrl"
          class="trend-edit-content__label"
          [ngClass]="{
            'trend-edit-content__label--error':
              url.invalid && url.dirty && url.touched
          }"
          >URL</label
        >
        <input
          id="trendUrl"
          type="text"
          class="trend-edit-content__input"
          [ngClass]="{
            'trend-edit-content__input--error':
              url.invalid && url.dirty && url.touched
          }"
          formControlName="url" />

        <label
          for="trendTitle"
          class="trend-edit-content__label"
          [ngClass]="{
            'trend-edit-content__label--error':
              title.invalid && title.dirty && title.touched
          }"
          >Título</label
        >
        <input
          id="trendTitle"
          type="text"
          class="trend-edit-content__input"
          [ngClass]="{
            'trend-edit-content__input--error':
              title.invalid && title.dirty && title.touched
          }"
          formControlName="title" />

        <label
          for="trendProvider"
          class="trend-edit-content__label"
          [ngClass]="{
            'trend-edit-content__label--error':
              provider.invalid && provider.dirty && provider.touched
          }"
          >Proveedor</label
        >
        <p-dropdown
          id="trendProvider"
          class="trend-edit-content__dropdown"
          [options]="providers"
          optionLabel="name"
          optionValue="provider"
          formControlName="provider">
          <ng-template let-provider pTemplate="item">
            <div class="provider-item">
              <img src="assets/Logos/{{ provider.logo }}.svg" />
            </div>
          </ng-template>
        </p-dropdown>

        <label
          for="trendImage"
          class="trend-edit-content__label"
          [ngClass]="{
            'trend-edit-content__label--error':
              image.invalid && image.dirty && image.touched
          }"
          >Imagen</label
        >
        <input
          id="trendImage"
          type="text"
          class="trend-edit-content__input"
          [ngClass]="{
            'trend-edit-content__input--error':
              image.invalid && image.dirty && image.touched
          }"
          formControlName="image" />

        <label
          for="trendBody"
          class="trend-edit-content__label"
          [ngClass]="{
            'trend-edit-content__label--error':
              body.invalid && body.dirty && body.touched
          }"
          >Contenido</label
        >
        <textarea
          name=""
          id="trendBody"
          class="trend-edit-content__textarea"
          [ngClass]="{
            'trend-edit-content__textarea--error':
              body.invalid && body.dirty && body.touched
          }"
          formControlName="body"></textarea>
      </form>

      <div *ngIf="isSmallScreen$ | async" class="trend-edit-footer__container">
        <button
          class="app-button app-button--secondary"
          (click)="closeSidebar()">
          Cancelar
        </button>
        <button class="app-button app-button--primary" (click)="saveTrend()">
          Guardar
        </button>
      </div>
    </aside>
  `,
  styleUrls: ['./trend-edit.component.scss'],
})
export class TrendEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private sidebarStatus$ = this.store.select(selectSidebarState);
  private trend$ = this.store.select(selectSelectedTrend);
  private trend?: Trend;

  public providers: TrendProviderDropdown[] = [
    { name: 'El Mundo', provider: 'elmundo', logo: 'El_Mundo' },
    { name: 'El Pais', provider: 'elpais', logo: 'El_Pais' },
  ];
  public isSmallScreen$ = this.breakpointsObserver.isSmall$;
  public isNewTrend!: boolean;
  public trendForm!: FormGroup;

  get url() {
    return this.trendForm.get('url')!;
  }

  get title() {
    return this.trendForm.get('title')!;
  }

  get provider() {
    return this.trendForm.get('provider')!;
  }

  get image() {
    return this.trendForm.get('image')!;
  }

  get body() {
    return this.trendForm.get('body')!;
  }

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createTrendForm();

    this.subscription.add(
      this.trend$.subscribe(trend => {
        this.isNewTrend = !trend;
        this.trend = trend!;
        this.patchTrendForm();
      })
    );

    this.subscription.add(
      this.sidebarStatus$.subscribe(sidebarStatus => {
        !sidebarStatus.isOpen && this.setTouchedAndDirtyTrendForm(false);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public closeSidebar(): void {
    this.store.dispatch(updateSidebarState({ isOpen: false }));
  }

  public saveTrend(): void {
    if (this.trendForm.invalid) {
      this.setTouchedAndDirtyTrendForm(true);
      return;
    }

    this.isNewTrend ? this.createTrend() : this.updateTrend();
  }

  private createTrendForm(): void {
    this.trendForm = this.formBuilder.group({
      url: ['', Validators.required],
      title: ['', Validators.required],
      provider: ['', Validators.required],
      image: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  private patchTrendForm(): void {
    this.trendForm.patchValue({
      url: this.trend?.url,
      title: this.trend?.title,
      provider: this.trend?.provider ?? 'elpais',
      image: this.trend?.image,
      body: this.trend?.body,
    });
  }

  private createTrend(): void {
    this.store.dispatch(
      createTrend({
        newTrend: this.trendForm.value,
      })
    );
  }

  private updateTrend(): void {
    this.store.dispatch(
      editTrend({
        trendToUpdate: {
          ...this.trend!,
          ...this.trendForm.value,
          body: [this.body.value][0],
        },
      })
    );
  }

  private setTouchedAndDirtyTrendForm(isTouchedAndDirty: boolean): void {
    Object.keys(this.trendForm.controls).forEach(controlName => {
      const control = this.trendForm.controls[controlName];
      isTouchedAndDirty ? control.markAsDirty() : control.markAsPristine();
      isTouchedAndDirty ? control.markAsTouched() : control.markAsUntouched();
    });
  }
}
