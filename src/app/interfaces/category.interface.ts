export interface ICategory {
    id?: number;
    title: string;
    parent: ICategory;
};

export interface CategoriesResponse {
    categories: ICategory[];
}
