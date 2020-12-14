import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCategoryPage} from './pages/product-category-page/product-category-page';
import {ProductDetailPage} from './pages/product-detail-page/product-detail-page';
import {AuthenticationPageComponent} from './pages/authentication-page/authentication-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: MainPageComponent},
    {path: 'authentication', component: AuthenticationPageComponent,},
    {path: 'products', pathMatch: 'full', component: ProductCategoryPage,},
    {path: 'products/:id', pathMatch: 'full', component: ProductDetailPage,},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
