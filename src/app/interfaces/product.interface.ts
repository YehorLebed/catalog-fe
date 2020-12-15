import {ICategory} from './category.interface';

export interface IProductImage {
    small: string;
    medium: string;
    original: string;
};

export interface IProduct {
    id?: number;
    price: number;
    title: string;
    isPromo?: boolean;
    createdAt: number
    description: string;
    category?: ICategory;
    image: IProductImage;
};

export interface IProductsResponse {
    products: IProduct[];
};

export interface IProductQueryParams {
    page: number;
    amount: number;
    categoryId?: number;
}
