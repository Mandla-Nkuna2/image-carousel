import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
})
export class MyGalleryComponent implements OnInit {
  images: any[] = [];
  topics: any;
  topicsBool = true;
  loaderBool = false;
  topic = '';
  imageTotal = 3;
  url = 'https://api.unsplash.com/topics/';
  apiId = 'oTsf5M6-RS2bjI6bMnzy-fasHMqpWq1PON1oy2Tj-5g';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTopics().then(() => {});
  }

  async getTopics() {
    this.http
      .get(`${this.url}?client_id=${this.apiId}`)
      .subscribe((topics: any) => {
        this.topics = topics;
        this.getImages(topics[0]);
      });
  }

  getImages(obj: any) {
    this.loaderBool = true;
    this.topicsBool = false;
    this.images = [];
    this.http
      .get(`${this.url}${obj.id}/photos/?client_id=${this.apiId}`)
      .subscribe((data: any) => {
        this.loaderBool = false;
        this.topic = obj.title;
        data.forEach((elm: any) => {
          this.images.push({ path: elm.urls['full'] });
        });
      });
  }

  onMove() {
    this.topicsBool = false;
  }

  onMenu() {
    this.topicsBool = true;
  }
}
