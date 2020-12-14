import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-validation-alert',
    templateUrl: './validation-alert.component.html',
    styleUrls: ['./validation-alert.component.scss']
})
export class ValidationAlertComponent {
    @Input('field-name') name: string;
    @Input('field-control') field: AbstractControl;

    constructor() {
    }

    /**
     * generate message about required field
     * @param {string} name field name
     * @return {string} message
     */
    required(name: string): string {
        return `${name} field is required`;
    }

    /**
     * generate message about maxlength
     * @param {string} name field name
     * @param {number} maxlength maxlength
     * @return {string} message
     */
    maxlength(name: string, maxlength: number): string {
        return `${name} maximal length is ${maxlength} characters`;
    }

    /**
     * generate message about minlength
     * @param {string} name field name
     * @param {number} minlength minlength
     * @return {string} message
     */
    minlength(name, minlength): string {
        return `${name} minimal length is ${minlength} characters`;
    }

    /**
     * generate message about pattern
     * @param {string} name field name
     * @return {string} message
     */
    pattern(name: string): string {
        return `${name} contains invalid characters`;
    }
}
