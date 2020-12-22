import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-single-product-page',
    templateUrl: './product-detail-page.html',
    styleUrls: ['./product-detail-page.scss']
})
export class ProductDetailPage implements OnInit, OnDestroy {

    public product: IProduct;
    public loading = false;

    private paramsProductId: number;
    private routeSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private authService: AuthService,
        private cartService: CartService,
        private router: Router
    ) {
    }

    public get isAdmin() {
        return this.authService.isRole('admin');
    }

    /**
     * add category to cart
     */
    public handleAddToCart() {
        this.cartService.addProduct(this.product, 1);
    }

    ngOnInit(): void {
        this.subscribe();
    }

    /**
     * fetch category from server by id
     * @param id category id
     * @private
     */
    private fetchProduct(id: number): Promise<IProduct> {
        this.loading = true;
        return this.productService.fetchProductById(id).then(product => {
            this.loading = false;
            return product;
        });
    }

    /**
     * subscribe on route params change
     * @private
     */
    private subscribe() {
        this.routeSubscription = this.activatedRoute.params.subscribe(async params => {
            const productFromRoute = this.getProductFromRoute();
            const paramsProductId = params['categoryId'];

            if (paramsProductId != this.paramsProductId) {
                this.paramsProductId = paramsProductId;
            }

            if (!this.product || this.paramsProductId != this.product.id) {
                this.product = (productFromRoute && productFromRoute.id == this.paramsProductId)
                    ? productFromRoute : await this.fetchProduct(this.paramsProductId);
            }
        });
    }

    public getProductFromRoute(): IProduct {
        return history.state.productToShow || null;
    }

    public getImageSrc() {
        return environment.url + this.product.image.original;
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    handleNavigateManage() {
        const extras = {state: {productToUpdate: this.product}};
        this.router.navigateByUrl(`/admin/products/${this.product.id}`, extras);
    }
}
