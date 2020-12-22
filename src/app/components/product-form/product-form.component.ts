import {Component, Input, OnInit, EventEmitter, Output, OnChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProduct, IProductImage} from '../../interfaces/product.interface';
import {ICategory} from '../../interfaces/category.interface';
import {Product} from '../../classes/product.class';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

    @Output('onSubmit') onSubmit = new EventEmitter<IProduct>();
    @Input('product') product: IProduct = new Product();
    public productForm: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        const defaultValues = this.prepareDefaultValues();
        this.productForm = new FormGroup({
            title: new FormControl(defaultValues.title, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ]),
            price: new FormControl(defaultValues.price, [
                Validators.required,
                Validators.min(0),
                Validators.max(999999),
            ]),
            description: new FormControl(defaultValues.description, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(3000),
            ]),
            isPromo: new FormControl(defaultValues.isPromo, [
                Validators.required,
            ]),
            category: new FormControl(defaultValues.category, [
                Validators.required
            ]),
            imageFile: new FormControl(null)
        });
    }

    /**
     * emit syntetic event
     */
    handleSubmit() {
        this.onSubmit.emit(this.productForm.value);
    }

    /**
     * prepare default values
     */
    prepareDefaultValues() {
        return {
            title: this.product ? this.product.title : '',
            description: this.product ? this.product.description : '',
            price: this.product ? +this.product.price : '',
            isPromo: this.product ? this.product.isPromo : false,
            category: this.product && this.product.category || null,
        };
    }

    /**
     * get image src as preview
     */
    getImageSrc() {
        return this.product && this.product.image && this.product.image.original || '';
    }

    /**
     * get selected category
     */
    getSelectedCategory() {
        return this.product && this.product.category || null;
    }

    /**
     * handle upload image
     * @param image
     */
    onImageUpload(image: Blob | null) {
        this.productForm.get('imageFile').setValue(image);
        this.productForm.markAsDirty();
    }

    /**
     * handle category select
     * @param category
     */
    onCategorySelect(category: ICategory) {
        this.productForm.get('category').setValue(category);
        this.productForm.markAsDirty();
    }

    get title() {
        return this.productForm.get('title');
    }

    get price() {
        return this.productForm.get('price');
    }

    get description() {
        return this.productForm.get('description');
    }

    get isPromo() {
        return this.productForm.get('isPromo');
    }
}
