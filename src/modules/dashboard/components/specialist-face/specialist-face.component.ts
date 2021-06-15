import { Component, Input, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
import { FirebaseStorageService, MEDIA_STORAGE_PATH } from '@modules/auth/services/firebase-storage.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sb-specialist-face',
  templateUrl: './specialist-face.component.html',
  styleUrls: ['./specialist-face.component.scss']
})
export class SpecialistFaceComponent implements OnInit {
    @Input() specialist: User;
    public foto: string = null;
    constructor(private fotoService: FirebaseStorageService) { }

    ngOnInit(): void {
        this.getPath();
    }

    public getPath() {
        if(this.specialist) {
            this.fotoService.referenciaCloudStorage(MEDIA_STORAGE_PATH + this.specialist.email + "_1.jpg")
            .getDownloadURL()
            .pipe(take(1))
            .subscribe(url => {
                console.log(url);
                this.foto = url;
            })
        }
    }
}
