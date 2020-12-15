import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCategoryPage} from './pages/product-category-page/product-category-page';
import {ProductDetailPage} from './pages/product-detail-page/product-detail-page';
import {AuthenticationPageComponent} from './pages/authentication-page/authentication-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RecentlyAddedPageComponent} from './pages/recently-added-page/recently-added-page.component';
import {PopularProductsPageComponent} from './pages/popular-products-page/popular-products-page.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: MainPageComponent},
    {path: 'authentication', component: AuthenticationPageComponent,},
    {path: 'newest', pathMatch: 'full', component: RecentlyAddedPageComponent,},
    {path: 'popular', pathMatch: 'full', component: PopularProductsPageComponent,},
    {path: 'categories/:categoryId', pathMatch: 'full', component: ProductCategoryPage,},
    {path: 'products/:productId', pathMatch: 'full', component: ProductDetailPage,},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
