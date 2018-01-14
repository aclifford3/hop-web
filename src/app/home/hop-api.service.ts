import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {environment} from '../../environments/environment';

const url = environment.serverUrl;
const apiKey = 'Ai7RemrPPk96XGDz8pdHw1ZUeJZgDXGW18iispp9';
let headers = new HttpHeaders();

export interface Reservation {
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  reservationSource: string;
  meetTime: string;
  guestsNum: number;
  apartment: boolean;
  lastName: string;
  carrier: string;
  ddReturned: boolean;
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

@Injectable()
export class HopApiService {

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
  }

  getReservations() {
    this.setApiKey()
    return this.httpClient.get<GetReservationsResponse>(url, {headers: headers });
  }

  getReservationById(propertyName: string, checkInDate: string) {
    this.setApiKey();
    return this.httpClient
      .get<GetReservationResponse>(url + '/' + propertyName + '/' + checkInDate, {headers: headers });
  }

  addReservation(reservation: Reservation) {
    this.setHeaders();
    return this.httpClient.post<Response>(url, reservation, {headers: headers });
  }

  deleteReservation(propertyName: string, checkInDate: string) {
    this.setHeaders();
    return this.httpClient.delete<Response>(url + '/' + propertyName + '/' + checkInDate, {headers: headers }  );
  }

  setHeaders() {
    headers = headers.set('Authorization', this.authService.credentials.idToken);
  }

  setApiKey() {
    headers = headers.set('x-api-key', apiKey);
  }

  //
  // getRandomQuote(context: RandomQuoteContext): Observable<string> {
  //   return this.http.get(routes.quote(context), { cache: true })
  //     .pipe(
  //       map((res: Response) => res.json()),
  //       map(body => body.value),
  //       catchError(() => of('Error, could not load joke :-('))
  //     );
  // }

}
