import { Component } from '@angular/core';
import {
  CardUi,
  CardUiComponent
} from "@bf/exercise-3/example/card-ui";
import { NgForOf } from "@angular/common";

export interface GetCustomerServiceResponse {
  img: {
    src: string,
    alt: string
  },
  price: {
    value: number,
    currencyCode: string
  }
}

export interface GetProductResponse {
  teaserImg: {
    src: string,
    alt: string
  },
  price: {
    customerPrice: number | null,
    listPrice: number,
    currencyCode: string
  }
}

@Component({
  standalone: true,
  selector: 'bf-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  imports: [CardUiComponent, NgForOf]
})
export class ContainerComponent {
  private readonly products: GetProductResponse[] = [
    {
      price: {
        customerPrice: 80,
        listPrice: 99,
        currencyCode: 'USD'
      },
      teaserImg: {
        src: '/assets/img_1.png',
        alt: ''
      }
    },
    {
      price: {
        customerPrice: 20,
        listPrice: 30,
        currencyCode: 'USD'
      },
      teaserImg: {
        src: '/assets/img_2.png',
        alt: ''
      }
    },
    {
      price: {
        customerPrice: 30,
        listPrice: 40,
        currencyCode: 'USD'
      },
      teaserImg: {
        src: '/assets/img_3.png',
        alt: ''
      }
    },
    {
      price: {
        customerPrice: 30,
        listPrice: 40,
        currencyCode: 'USD'
      },
      teaserImg: {
        src: '/assets/img_4.png',
        alt: ''
      }
    },
  ];

  private readonly services: GetCustomerServiceResponse[] = [
    {
      price: {
        currencyCode: 'USD',
        value: 10
      },
      img: {
        src: '/assets/img_0.png',
        alt: ''
      }
    }
  ];

  cards: CardUi[] = [
    ...this.services.map(this.mapServicesToCardUi),
    ...this.products.map(this.mapProductsToCardUi)
  ];

  private mapProductsToCardUi(response: GetProductResponse): CardUi {
    return {
      currencyCode: response.price.currencyCode,
      regularPrice: response.price.listPrice,
      discountPrice: response.price.customerPrice ?? undefined,
      teaser: {
        alt: response.teaserImg.alt,
        src: response.teaserImg.src
      }
    }
  }

  private mapServicesToCardUi(response: GetCustomerServiceResponse): CardUi {
    return {
      currencyCode: response.price.currencyCode,
      regularPrice: response.price.value,
      teaser: {
        alt: response.img.alt,
        src: response.img.src
      }
    }
  }
}
