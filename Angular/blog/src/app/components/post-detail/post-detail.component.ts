import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.sass']
})
export class PostDetailComponent implements OnInit {
  public id: number;
  private $sub: any;

  constructor(private route: ActivatedRoute, private posts: PostsService) { }

  ngOnInit() {
    this.$sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
  }

   get post(){
    return this.posts.getPostById(this.id);
   }
  

}
