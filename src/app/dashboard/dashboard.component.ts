import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {Room} from "../room";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  // heroes: Hero[] = [];

  rooms: Room[] = [];

  //constructor(private heroService: HeroService) { }
  constructor(private roomService: RoomService) { }
  ngOnInit(): void {
    //this.getHeroes();
    this.getRooms()
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  // }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms.slice(1, 5));
  }
}
