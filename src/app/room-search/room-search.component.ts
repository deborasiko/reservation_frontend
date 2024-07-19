import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {RoomService} from "../room.service";
import {Room} from "../room";

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrl: './room-search.component.scss'
})
export class RoomSearchComponent implements OnInit{
  rooms$!: Observable<Room[]>;
  private searchTerms = new Subject<string>();

  constructor(private roomService: RoomService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.rooms$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.roomService.searchRooms(term)),
    );
  }
}
