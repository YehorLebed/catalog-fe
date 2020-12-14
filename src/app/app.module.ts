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
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';


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
        ProductPageComponent
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
