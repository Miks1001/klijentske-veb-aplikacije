import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('sr-RS')
  }

  public generateDestinationImage(dest: string) { //ovdje vidi za home.component.html
    return `https://s3proxygw.cineplexx.at/cms-live/asset/_default_upload_bucket/${dest.split(' ')[0].toLowerCase()}.jpg`
  }
}
