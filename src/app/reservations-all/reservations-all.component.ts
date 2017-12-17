import { Component, OnInit } from '@angular/core';
import {GetReservationsResponse, HopApiService, Reservation} from "../home/hop-api.service";
import {finalize} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-reservations-all',
  templateUrl: './reservations-all.component.html',
  styleUrls: ['./reservations-all.component.scss']
})

export class ReservationsAllComponent implements OnInit {

  constructor(private hopApiService: HopApiService) { }

  reservations: Reservation[];
  isLoading: boolean;
  version: string = environment.version;

  ngOnInit() {
    this.isLoading = true;
    this.hopApiService.getReservations()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((reservations: GetReservationsResponse) => {
        this.reservations = reservations.Items;
      });
  }

}
