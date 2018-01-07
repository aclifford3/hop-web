import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../core/authentication/authentication.service';

const url = 'https://ubk2kssfj5.execute-api.us-east-1.amazonaws.com/Stage/reservations';
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

declare let apigClientFactory: any;

@Injectable()
export class HopApiService {

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
    headers = headers.set('Authorization', authService.credentials.idToken);
  }

  getReservations() {
    return this.httpClient.get<GetReservationsResponse>(url, {headers: headers });
  }

  getReservationById(propertyName: string, checkInDate: string) {
    return this.httpClient
      .get<GetReservationResponse>(url + '/' + propertyName + '/' + checkInDate, {headers: headers });
  }

  addReservation(reservation: Reservation) {
    return this.httpClient.post<Response>(url, reservation, {headers: headers });
  }

  deleteReservation(propertyName: string, checkInDate: string) {
    return this.httpClient.delete<Response>(url + '/' + propertyName + '/' + checkInDate, {headers: headers }  );
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
