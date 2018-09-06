import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  constructor(protected posts: PostsService) { }

  ngOnInit() {
  }

  get list() {
    return this.posts.list;
  }

}
