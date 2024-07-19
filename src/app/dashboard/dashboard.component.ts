import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {Room} from "../room";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  rooms: Room[] = [];

  constructor(private roomService: RoomService) { }
  ngOnInit(): void {
    this.getRooms()
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms.slice(1, 5));
  }
}
