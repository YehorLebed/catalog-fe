import {IProduct, IProductImage, IProductOrderSelect} from '../interfaces/product.interface';
import {ICategory} from '../interfaces/category.interface';

export class Product implements IProduct {
    category: ICategory;
    createdAt: number;
    description: string;
    id: number;
    image: IProductImage;
    isPromo: boolean;
    price: number;
    title: string;

    static getOrderOptions(): IProductOrderSelect[] {
        return [
            {name: 'Select order', value: 0, isSelected: true},
            {name: 'By title', value: 1, field: 'title', isDesc: false,},
            {name: 'By title desc', value: 2, field: 'title', isDesc: true},
            {name: 'By price', value: 3, field: 'price', isDesc: false},
            {name: 'By price desc', value: 4, field: 'price', isDesc: true},
            {name: 'By date', value: 5, field: 'created_at', isDesc: false},
            {name: 'By date desc', value: 6, field: 'created_at', isDesc: false},
        ];
    }
}
