import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../interfaces/category.interface';
import {Category} from '../../classes/category.class';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

    @Output('onSubmit') onSubmit = new EventEmitter<ICategory>();
    @Input('category') category: ICategory = new Category();
    public form: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        const defaultValues = this.prepareDefaultValues();
        this.form = new FormGroup({
            title: new FormControl(defaultValues.title, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ]),
            parent: new FormControl(defaultValues.parent),
        });
    }

    /**
     * emit synthetic event
     */
    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

    /**
     * prepare default values
     */
    prepareDefaultValues() {
        return {
            title: this.category ? this.category.title : '',
            parent: this.category && this.category.parent || null,
        };
    }

    /**
     * get selected category
     */
    getSelectedParent() {
        return this.category && this.category.parent || null;
    }

    /**
     * handle category select
     * @param category
     */
    onParentSelect(category: ICategory) {
        this.form.get('parent').setValue(category);
        this.form.markAsDirty();
    }

    get title() {
        return this.form.get('title');
    }
}
