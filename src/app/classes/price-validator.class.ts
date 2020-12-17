import {AbstractControl} from '@angular/forms';

export class PriceValidator {
    static get min() {
        return 0;
    }

    static get max() {
        return 999999;
    }

    static checkIfBothValuesExist(c: AbstractControl) {
        const minPrice = c.get('minPrice').value;
        const maxPrice = c.get('maxPrice').value;

        if (minPrice === null && maxPrice === null) {
            return {invalidValues: true};
        }

        return null;
    }

    static checkIfMaxPriceBiggerThanMinPrice(c: AbstractControl) {
        const minPrice = c.get('minPrice').value;
        const maxPrice = c.get('maxPrice').value;

        if (minPrice === null || maxPrice === null) {
            return null;
        }

        if (+minPrice < +maxPrice) {
            return null;
        }

        return {invalidMaxPrice: true};
    }

}

export interface IFilterPrice {
    minPrice: number;
    maxPrice: number;
}
