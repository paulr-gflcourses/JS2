import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {
  title = 'Home page sggdfgdfg dfg d fg';
  list = [
    'sdfsfsdf',
    'sdfsfsdf',
    'sdfsfsdf',
    'sdfsfsdf',
    'sdfsfsdf',
    'sdfsfsdf',
    'sdfsfsdf',
    'sdfsfsdf'
  ];

  constructor() { }

  ngOnInit() {
    this.title = 'asdfasdf';
  }

}
