import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import {
  createTrend,
  editTrend,
} from '../store/actions/trend-edit-page.actions';
import { selectSelectedTrend } from '../store/selectors';
import { Trend } from '../models/trend.model';

@Component({
  selector: 'app-trend-edit',
  template: `
    <div class="trend-header__container">
      <h2 class="trend-header__title">
        {{ isNewTrend ? 'Nueva noticia' : 'Edita la noticia' }}
      </h2>
      <div class="trend-header__actions">
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
  `,
  styleUrls: ['./trend-edit.component.scss'],
})
export class TrendEditComponent implements OnInit {
  private trend$ = this.store.select(selectSelectedTrend);
  private trend?: Trend;

  public isNewTrend!: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.trend$.subscribe(trend => {
      this.isNewTrend = !trend;
      this.trend = trend!;
    });
  }

  public closeSidebar(): void {
    this.store.dispatch(updateSidebarState({ isOpen: false }));
  }

  public saveTrend(): void {
    console.log({ isNewTrend: this.isNewTrend });
    this.isNewTrend ? this.createTrend() : this.updateTrend();
  }

  private createTrend(): void {
    this.store.dispatch(
      createTrend({
        newTrend: {
          title: 'El dueño de Dulcesol :)',
          body: 'Después de visitar la factoría por primera vez desde que fundó la empresa en el año 1962, el dueño de Panrico ha entrado hoy en cólera tras darse cuenta de que los donuts tienen un agujero en medio debido a un defecto de fábrica.\n\n«¿Pero qué le habéis hecho a mi bollo?», ha exclamado el empresario frente a toda la plantilla, insistiendo en que «siempre me habéis dicho que todo estaba bien, y mira esto, mira este boquete enorme. ¡No me puedo fiar de vosotros!».\n\n“¡No me puedo creer que nadie me haya avisado de esto!”, ha insistido entre gritos en medio de la fábrica. “¿Por qué salen así mis bollos y desde cuándo?”, ha exclamado furioso. El dueño ha tirado al suelo miles de donuts y los ha pisado con rabia. “¿Pero cómo podemos estar vendiendo esta basura?”, ha gritado fuera de sí. “¿Un agujero en medio? ¿Timando al personal? ¿Estamos locos? ¡Pero qué mierda habéis estado haciendo!”, ha abroncado inconsolable.\n\nNo es la primera vez que el dueño de una importante compañía de alimentación recibe un disgusto semejante. En el año 2014, el fundador de Kinder despidió a más del 80% de su plantilla tras descubrir que llevaban décadas metiendo juguetes en el interior de sus huevos de chocolate.',
          url: 'https://www.elmundotoday.com/2020/02/el-dueno-de-panrico-se-da-cuenta-ahora-de-que-los-donuts-salen-con-un-agujero-por-un-defecto-de-fabrica-y-entra-en-colera/',
          image: 'https://emtstatic.com/2020/02/iStock-922747782.jpg',
          provider: 'elmundo',
        },
      })
    );
  }

  private updateTrend(): void {
    this.store.dispatch(
      editTrend({
        trendToUpdate: { ...this.trend!, title: 'Hola mundo' },
      })
    );
  }
}
