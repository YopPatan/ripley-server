import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './pages/product/product.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'product/:sku',
    component: ProductComponent
  },
  {
    path: '',
    component: CatalogComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
