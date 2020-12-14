import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationPageComponent} from './pages/authentication-page/authentication-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';

const routes: Routes = [
    {path: 'authentication', component: AuthenticationPageComponent},
    {path: 'products', component: ProductPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
