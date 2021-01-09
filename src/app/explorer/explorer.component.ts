import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RequesterService } from '../services/requester.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  response$ = this.requesterService.response$;

  constructor(private requesterService: RequesterService) { }

  ngOnInit(): void {
  }

  getLinksObject(response: any): string[] {
    return Object.keys(response['_links']);
  }

  getObjectWithoutMetadata(response: any): string[] {
    return Object.keys(response).filter(key => !key.startsWith('_'));
  }

  newSearch(newUrl: string) {
    this.requesterService.makeRequest({
      method: 'GET',
      url: newUrl
    }).subscribe(res => console.log(res));
  }

  getHrefFromResponse(response: any, link: string): string {
    return response['_links'][link].href;
  }

  prettyResponse(json: any) {
    const clone = JSON.parse(JSON.stringify(json));
    delete clone['_links'];
    return JSON.stringify(clone, null, 2);
  }

  getValueAsString(obj: any, key: string) {
    return obj[key];
  }

  propertyIsObject(obj: any, key: string) {
    return typeof(obj[key]) !== 'number' && typeof(obj[key]) !== 'string';
  }
}
