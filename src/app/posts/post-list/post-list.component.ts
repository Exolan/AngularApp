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
  id = ''
  title = ''
  content = ''
  modal = false
  posts:Post[] = []
  private postsSub!: Subscription;

  constructor(public postsService: PostsService, private http: HttpClient){}

  async ngOnInit(){
    this.http.get('http://localhost:5000/todo/getAll').subscribe((data: any)=>{this.posts = data})

    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(id: string){
    this.postsService.deletePost(id)
  }

  onEdit(id: string, title: string, content: string){
    this.id = id
    this.title = title
    this.content = content
    this.modal = true
  }

  onSave(){
    this.modal = false
  }

  onCancel(){
    this.modal = false
  }
}
