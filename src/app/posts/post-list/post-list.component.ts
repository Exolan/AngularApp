import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts:Post[] = []
  private postsSub!: Subscription;

  constructor(public postsService: PostsService, private http: HttpClient){}

  async ngOnInit(){
    const array = this.http.get('https://localhost:5000/todo/getAll').subscribe()
    // const array = await fetch("https://localhost:5000/todo/getAll")
    console.log(array);

    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(id: number){
    this.postsService.deletePost(id)
  }
}
