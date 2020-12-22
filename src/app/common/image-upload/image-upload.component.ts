import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
    @Input('imageSrc') imageSrc: any = '';
    @Output('onUpload') onUpload = new EventEmitter<File>();
    public invalidType = false;
    public loading = false;
    public file: File;

    public handleUpload(file: File) {
        if (!file || (file && file.type && file.type.match(/image\/*/) == null)) {
            this.invalidType = true;
            file = null;
            this.imageSrc = '';
        } else {
            this.invalidType = false;
        }

        this.file = file;
        this.previewImage(this.file);
        this.onUpload.emit(this.file);
    }

    getImageAlt() {
        return this.file ? this.file.name : 'default';
    }

    getImageSrc() {
        return this.file ? this.imageSrc : environment.url + this.imageSrc;
    }

    private previewImage(file: File) {
        if (!file || !(file instanceof Blob)) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (_event) => {
            this.imageSrc = reader.result;
            this.loading = false;
        };

        this.loading = true;
        reader.readAsDataURL(file);
    }
}
