import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {environment} from '../../environments/environment';

const url = environment.serverUrl;
let headers = new HttpHeaders();


export interface Reservation {
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  checkOutTime: string;
  reservationSource: string;
  meetTime: string;
  guestsNum: number;
  apartment: boolean;
  lastName: string;
  carrier: string;
  email: string;
  firstName: string;
  flightArrivalTime: string;
  flightNum: string;
  flightOrigCity: string;
  instructionsSent: boolean;
  notes: string;
  phoneNum: string;
}

export interface GetReservationsResponse {
  Items: Reservation[];
}

export interface GetReservationResponse {
  Item: Reservation;
}

export interface Response {
  statusCode: string;
  body: string;
}

export const upcomingReservationsKey = 'upcomingReservations';
export const pastReservationsKey = 'pastReservations';

@Injectable()
export class HopApiService {

  reservations: Reservation[];

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
  }

  getReservations() {
    this.setHeaders();
    const obs = this.httpClient.get<GetReservationsResponse>(url + '/upcoming', {headers: headers });
    obs.subscribe((response: GetReservationsResponse) => {
      localStorage.setItem(upcomingReservationsKey, JSON.stringify(response));
    });
    return obs;
  }

  getReservationsSince(days: string) {
    this.setHeaders();
    const obs = this.httpClient.get<GetReservationsResponse>(url + '/history/days/' + days, {headers: headers});
    obs.subscribe((response: GetReservationsResponse) => {
      localStorage.setItem(pastReservationsKey, JSON.stringify(response));
    });
    return obs;
  }

  getReservation(propertyName: string, checkInDate: string) {
    this.setHeaders();
    return this.httpClient.get<GetReservationResponse>(url + '/propertyName/' + propertyName + '/checkInDate/'
      + checkInDate, {headers: headers }  );
  }
  addReservation(reservation: Reservation) {
    this.setHeaders();
    return this.httpClient.put<Response>(url + '/update', reservation, {headers: headers });
  }

  deleteReservation(propertyName: string, checkInDate: string) {
    this.setHeaders();
    return this.httpClient.delete<Response>(url + '/propertyName/' + propertyName + '/checkInDate/'
      + checkInDate, {headers: headers }  );
  }

  setHeaders() {
    headers = headers.set('Authorization', this.authService.credentials.idToken);
  }

}
