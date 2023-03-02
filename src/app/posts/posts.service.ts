import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http'


@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient){}


    getPosts(){
        return [...this.posts];
    }

    getPostsUpdateListener(){
        return this.postsUpdate.asObservable()
    }

    addPost(title: string, content: string){
        const body = {title: title, content: content}
        this.http.post('http://localhost:5000/todo/new', JSON.stringify(body)).subscribe()
        this.http.get('http://localhost:5000/todo/getAll').subscribe((data: any)=>{this.postsUpdate.next(data)})
    }

    deletePost(id: string){
        this.http.delete(`http://localhost:5000/todo/delete/${id}`).subscribe(()=>{
            this.http.get('http://localhost:5000/todo/getAll').subscribe((data: any)=>{this.postsUpdate.next(data)})})
    }

    editPost(id: number, post: object){
    }
}