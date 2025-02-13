import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";


@Component({
  selector: 'app-distribution-page',
  templateUrl: './distribution-page.component.html',
  styleUrls: ['./distribution-page.component.css']
})
export class DistributionPageComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }



}
