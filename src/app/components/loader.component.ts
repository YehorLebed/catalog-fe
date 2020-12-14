import {Component} from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `
})
export class LoaderComponent {
}
