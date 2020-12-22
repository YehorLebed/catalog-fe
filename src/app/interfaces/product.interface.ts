import {ICategory} from './category.interface';
import {WithPagination} from './pagination.interface';
import {ISelect} from './select.interface';

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
    image?: IProductImage;
    imageFile?: Blob;
};

export interface IProductsResponse {
    products: IProduct[];
};

export interface IProductQueryParameters extends WithPagination {
    isPopular?: boolean;
    categoryId?: number;
    isRecentlyAdded?: boolean;
    orderBy?: string;
    isDesc?: boolean;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export interface IProductOrderSelect extends ISelect {
    field?: string;
    isDesc?: boolean;
    isDefault?: boolean;
}


