import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input
} from '@angular/core';
import {
  CurrencyPipe,
  NgIf
} from "@angular/common";

export interface CardUi {
  currencyCode: string,
  discountPrice?: number,
  regularPrice: number,
  teaser: {
    src: string,
    alt: string
  }
}

@Component({
  standalone: true,
  selector: 'bf-card-ui',
  templateUrl: './card-ui.component.html',
  styleUrls: ['./card-ui.component.scss'],
  imports: [
    NgIf,
    CurrencyPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardUiComponent {
  @Input() card?: CardUi;

  get _card(): CardUi {
    if (!this.card) {
      throw new Error('Property card must be set');
    }

    return this.card;
  }
}
