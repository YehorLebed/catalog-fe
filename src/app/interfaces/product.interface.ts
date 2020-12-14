import {Category} from './category.interface';

export interface ProductImage {
    small: string;
    medium: string;
    original: string;
};

export interface Product {
    id?: number;
    price: number;
    title: string;
    isPromo: boolean;
    createdAt: number
    description: string;
    category: Category;
    image: ProductImage;
};
