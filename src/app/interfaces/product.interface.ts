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

export interface IProductCatalogPageParams {
    page: number;
    amount: number;
    categoryId?: number;
}

export interface IRecentlyAddedPageParams {
    isRecentlyAdded: boolean;
    page: number;
    amount: number;
}

export interface IPopularProducts {
    isPopular: boolean;
    page: number;
    amount: number;
}
