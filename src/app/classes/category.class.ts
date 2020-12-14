import {ICategory} from '../interfaces/category.interface';

export class Category implements ICategory {
    id: number;
    title: string;
    parent: ICategory;

    constructor(id: number, title: string, parent: ICategory) {
        this.id = id;
        this.title = title;
        this.parent = parent;
    }

}
