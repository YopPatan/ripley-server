import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any[];
  page = 1;

  constructor(
    public router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getCatalog().then( response => {
      console.log('response', response);
      this.products = response;
    }).catch(error => {
      console.log('error', error);
      if (error.status === 403 || error.status === 400) {
        this.router.navigate(['/login']);
      }
    });
  }

}
