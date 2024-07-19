import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import {Room} from "./room";



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsUrl = 'http://localhost:8080/api/rooms';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET rooms from the server. Will 404 if id not found*/
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl+"/findall")
      .pipe(
        tap(_ => this.log('fetched rooms')),
        catchError(this.handleError<Room[]>('getRooms', []))
      );
  }

  /** GET room by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      tap(_ => this.log(`fetched room id=${id}`)),
      catchError(this.handleError<Room>(`getRoom id=${id}`))
    );
  }

  /** PUT: update the room on the server */
  updateRoom(room: Room): Observable<any> {
    return this.http.put(this.roomsUrl, room, this.httpOptions).pipe(
      tap(_ => this.log(`updated room id=${room.id}`)),
      catchError(this.handleError<any>('updateRoom'))
    );
  }

  /** POST: add a new room to the server */
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, this.httpOptions).pipe(
      tap((newRoom: Room) => this.log(`added room w/ id=${newRoom.id}`)),
      catchError(this.handleError<Room>('addRoom'))
    );
  }

  /** DELETE: delete a room from the server */
  deleteRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;

    return this.http.delete<Room>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted room with id=${id}`)),
      catchError(this.handleError<Room>('deleteRoom'))
    );
  }

  /** GET rooms whose name contains search term */
  searchRooms(term: string): Observable<Room[]> {
    if (!term.trim()) {
      // if not search term, return empty room array.
      return of([]);
    }
    return this.http.get<Room[]>(`${this.roomsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found rooms matching "${term}"`) :
        this.log(`no rooms matching "${term}"`)),
      catchError(this.handleError<Room[]>('searchRooms', []))
    );
  }
  /** Log a RoomService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RoomService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
