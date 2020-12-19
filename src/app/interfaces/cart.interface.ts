import {IUser} from './user.interface';
import {ICartProduct} from './cart-product.interface';

export interface ICart {
    id?: number;
    user?: IUser;
    products: ICartProduct[];
    updatedAt?: number;
}

export interface ICartRequest {
    id?: number;
    user?: IUser;
    products: { id: number, quantity: number }[];
    updatedAt?: number;
}
