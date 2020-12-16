import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-button-icon',
    template: `
        <button [ngClass]="classes" (click)="handleClick()">
            <span class="material-icons">{{icon}}</span>
            <ng-content></ng-content>
        </button>
    `,
    styles: [`
        .btn-icon {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `]
})
export class ButtonIconComponent {
    @Output('onClick') onClick = new EventEmitter<void>();
    @Input('type') type = 'btn-primary';
    @Input('icon') icon = '';

    get classes() {
        return {
            ['btn']: true,
            ['btn-icon']: true,
            [this.type]: !!this.type,
        }
    }

    handleClick() {
        this.onClick.emit();
    }
}
