import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IFilterPrice, PriceValidator} from '../../classes/price-validator.class';

@Component({
    selector: 'app-filter-price',
    templateUrl: './filter-price.component.html',
    styleUrls: ['./filter-price.component.scss']
})
export class FilterPriceComponent implements OnInit {

    @Output('onApply') onApply = new EventEmitter<IFilterPrice>();
    public filterPrice: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.filterPrice = new FormGroup({
            minPrice: new FormControl(null, [
                Validators.min(PriceValidator.min),
                Validators.max(PriceValidator.max),
            ]),
            maxPrice: new FormControl(null, [
                Validators.min(PriceValidator.min),
                Validators.max(PriceValidator.max),
            ]),
        }, {
            validators: [
                PriceValidator.checkIfBothValuesExist,
                PriceValidator.checkIfMaxPriceBiggerThanMinPrice,
            ]
        });
    }

    get minPrice() {
        return this.filterPrice.get('minPrice');
    }

    get maxPrice() {
        return this.filterPrice.get('maxPrice');
    }

    onSubmit() {
        this.onApply.emit(this.filterPrice.value);
    }
}
