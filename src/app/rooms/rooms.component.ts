import {Component, OnInit} from '@angular/core';
import {Room} from '../room'
import {RoomService} from "../room.service";
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.roomService.addRoom({ name } as Room)
      .subscribe(room => {
        this.rooms.push(room);
      });
  }

  delete(room: Room): void {
    this.rooms = this.rooms.filter(h => h !== room);
    this.roomService.deleteRoom(room.id).subscribe();
  }
}
