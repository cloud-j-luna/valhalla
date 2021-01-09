import { Component, OnInit } from '@angular/core';
import { RequesterService } from '../services/requester.service';

@Component({
  selector: 'app-starting-point',
  templateUrl: './starting-point.component.html',
  styleUrls: ['./starting-point.component.scss']
})
export class StartingPointComponent implements OnInit {

  selectedMethod: string = 'GET';
  url: string = '';
  supportedMethods: string[] = [
    'GET',
    'POST',
    'PUT',
    'DELETE'  
  ];

  constructor(private requesterService: RequesterService) { }

  ngOnInit(): void {
  }

  onMethodClick(method: string) {
    this.selectedMethod = method;
  }

  search() {
    const request = {
      method: this.selectedMethod,
      url: this.url
    };

    this.requesterService.makeRequest({
      method: this.selectedMethod,
      url: this.url
    }).subscribe(res => console.log(res));
  }
}
