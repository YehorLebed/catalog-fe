import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {environment} from '../../../environments/environment';

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
        private cartService: CartService,
    ) {
    }

    /**
     * add product to cart
     */
    public handleAddToCart() {
        this.cartService.addProduct(this.product, 1);
    }

    ngOnInit(): void {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            if (params.productId && params.productId !== this.paramsProductId) {
                this.paramsProductId = params.productId;
                this.loadProduct();
            }
        });
    }

    /**
     * load product data (using history state or fetch from the server)
     * @private
     */
    private loadProduct() {
        const {product} = history.state;
        if (product && this.paramsProductId === product.id) {
            this.product = product;
        } else {
            this.fetchProduct(this.paramsProductId);
        }
    }

    /**
     * fetch product from server by id
     * @param id product id
     * @private
     */
    private fetchProduct(id: number) {
        this.loading = true;
        this.productService.fetchProductById(id).then(product => {
            this.product = product;
            this.loading = false;
        });
    }

    /**
     * subscribe on route params change
     * @private
     */
    private subscribe() {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            if (params.productId && params.productId !== this.paramsProductId) {
                this.paramsProductId = params.productId;
                this.fetchProduct(this.paramsProductId);
            }
        });
    }

    public getImageSrc() {
        return environment.url + this.product.image.original;
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

}
