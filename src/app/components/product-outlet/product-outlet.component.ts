import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct, IProductOrderSelect, IProductQueryParameters} from '../../interfaces/product.interface';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product.class';
import {IFilterPrice} from '../../classes/price-validator.class';

@Component({
    selector: 'app-product-outlet',
    templateUrl: './product-outlet.component.html',
    styleUrls: ['./product-outlet.component.scss']
})
export class ProductOutletComponent implements OnInit {

    @Output('onParamsChange') onParamsChange = new EventEmitter<IProductQueryParameters>();
    @Input('params') inputParams: IProductQueryParameters;
    @Input('withFilterSearch') withFilterSearch = false;
    @Input('withFilterPrice') withFilterPrice = false;
    @Input('withOrdering') withOrdering = false;

    public loading = false;
    public isAllFetched = false;
    public products: IProduct[] = [];
    public orderOptions = this.options;
    public params: IProductQueryParameters = {
        page: 0,
        amount: 10,
    };

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.params = {...this.params, ...this.inputParams};
        this.fetchProducts();
    }

    get options(): IProductOrderSelect[] {
        return Product.getOrderOptions();
    }


    handleOrderChange(value) {
        const idxSelected = this.orderOptions.findIndex(o => o.isSelected);
        if (idxSelected !== -1) {
            this.orderOptions[idxSelected].isSelected = false;
        }

        const idx = this.orderOptions.findIndex(o => o.value == value.value);
        this.orderOptions[idx].isSelected = true;

        if (
            value.value !== 0 &&
            this.params.orderBy !== value.field ||
            this.params.isDesc !== value.isDesc
        ) {
            this.params.orderBy = value.field;
            this.params.isDesc = value.isDesc;

            this.reload();
        }
    }

    handleFilterPrice(value: IFilterPrice) {
        let shouldReload = false;
        const params = {...this.params};
        const {minPrice, maxPrice} = value;

        // if filter deleted
        if (minPrice === null && this.params.minPrice !== undefined) {
            delete params.minPrice;
            shouldReload = true;
        }
        if (maxPrice === null && this.params.maxPrice !== undefined) {
            delete params.maxPrice;
            shouldReload = true;
        }

        // if filter added and changes
        if (typeof minPrice === 'number' && minPrice !== this.params.minPrice) {
            params.minPrice = minPrice;
            shouldReload = true;
        }
        if (typeof maxPrice === 'number' && maxPrice !== this.params.maxPrice) {
            params.maxPrice = maxPrice;
            shouldReload = true;
        }

        if (shouldReload) {
            this.params = params;
            this.reload();
        }
    }

    private reload() {
        this.params.page = 0;
        this.products = [];
        this.fetchProducts();
    }

    fetchProducts() {
        this.params.page++;
        this.loading = true;
        this.productService.fetchProductsByParameters(this.params).then(products => {
            if (products.length < this.params.amount) {
                this.isAllFetched = true;
            }
            this.products.push(...products);
            this.loading = false;
        });
    }

    handleFilterSearch(search: string) {
        let shouldReload = false;
        const params = {...this.params};

        if(search && search !== this.params.search) {
            params.search = search;
            shouldReload = true;
        }
        if(!search && this.params.search) {
            delete params.search;
            shouldReload = true;
        }

        if(shouldReload) {
            this.params = params;
            this.reload();
        }
    }
}
