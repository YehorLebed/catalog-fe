import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AuthenticationPageComponent} from './pages/authentication-page/authentication-page.component';
import {ValidationAlertComponent} from './components/validation-alert/validation-alert.component';
import {NotificationComponent} from './components/notification/notification.component';
import {HeaderComponent} from './layouts/header/header.component';
import {MainComponent} from './layouts/main/main.component';
import {AppComponent} from './app.component';
import {ShoppingCartIconComponent} from './components/shopping-cart-icon.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductListItemComponent} from './components/product-list-item/product-list-item.component';
import {ProductCategoryPage} from './pages/product-category-page/product-category-page';
import {ProductDetailPage} from './pages/product-detail-page/product-detail-page';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {DropdownComponent} from './common/dropdown/dropdown.component';
import {CategoryComponent} from './components/category/category.component';
import {LoaderComponent} from './components/loader.component';
import {RecentlyAddedPageComponent} from './pages/recently-added-page/recently-added-page.component';
import {PopularProductsPageComponent} from './pages/popular-products-page/popular-products-page.component';
import {ProductOutletComponent} from './components/product-outlet/product-outlet.component';
import {SidebarComponent} from './common/sidebar/sidebar.component';
import {ButtonIconComponent} from './common/button-icon.component';
import {FilterOrderComponent} from './components/filter-order/filter-order.component';
import { FilterPriceComponent } from './components/filter-price/filter-price.component';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ImageUploadComponent } from './common/image-upload/image-upload.component';
import { AdminManageProductPageComponent } from './pages/admin-manage-product-page/admin-manage-product-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CategoryInputComponent } from './common/category-input/category-input.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationPageComponent,
        HeaderComponent,
        MainComponent,
        ValidationAlertComponent,
        NotificationComponent,
        ShoppingCartIconComponent,
        ProductListComponent,
        ProductListItemComponent,
        ProductCategoryPage,
        ProductDetailPage,
        MainPageComponent,
        DropdownComponent,
        CategoryComponent,
        LoaderComponent,
        RecentlyAddedPageComponent,
        PopularProductsPageComponent,
        ProductOutletComponent,
        SidebarComponent,
        ButtonIconComponent,
        FilterOrderComponent,
        FilterPriceComponent,
        FilterSearchComponent,
        CartPageComponent,
        ProductFormComponent,
        ImageUploadComponent,
        AdminManageProductPageComponent,
        NotFoundPageComponent,
        CategoryInputComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
