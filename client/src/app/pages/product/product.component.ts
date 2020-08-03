import { Component, OnInit } from '@angular/core';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  panelOpenState = false;
  images: GalleryItem[];
  product: any;

  constructor(
    public router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const sku = this.route.snapshot.paramMap.get('sku');
    this.productService.getProduct(sku).then(response => {
      this.product = response;
      this.images = this.product.images.map(item => {
        return new ImageItem({src: item, thumb: item});
      });
    }).catch(error => {
      if (error.status === 403 || error.status === 400) {
        this.router.navigate(['/login']);
      }
    });
  }

}
