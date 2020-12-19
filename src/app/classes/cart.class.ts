import {ICart, ICartRequest} from '../interfaces/cart.interface';
import {ICartProduct} from '../interfaces/cart-product.interface';
import {IUser} from '../interfaces/user.interface';

export class Cart implements ICart {
    public id?: number;
    public user?: IUser;
    public products: ICartProduct[];
    public updatedAt?: number;

    constructor(id: number = null, user: IUser = null, products: ICartProduct[] = [], updatedAt: number = null) {
        this.id = id;
        this.user = user;
        this.products = products;
        this.updatedAt = updatedAt;
    }

    /**
     * remove unnecessary data from products cart
     * @param cart
     */
    static prepareRequestData(cart: ICart): ICartRequest {
        const productsData = cart.products.map(p => ({id: p.product.id, quantity: p.quantity}));
        return {...cart, products: productsData};
    }
}
