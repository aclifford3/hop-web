import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import {GetReservationsResponse, HopApiService, Reservation} from "./hop-api.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  shouldHide: boolean;

  // ngOnInit() {
  //   this.isLoading = true;
  //   this.quoteService.getRandomQuote({ category: 'dev' })
  //     .pipe(finalize(() => { this.isLoading = false; }))
  //     .subscribe((quote: string) => { this.quote = quote; });
  // }

  constructor(private hopApiService: HopApiService) { }

  reservations: Reservation[];
  propertyNameFilter: string
  version: string = environment.version;

  ngOnInit() {
    this.shouldHide = true;
    this.isLoading = true;
    this.hopApiService.getReservations()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((reservations: GetReservationsResponse) => {
        this.reservations = reservations.Items;
      });
  }

}
