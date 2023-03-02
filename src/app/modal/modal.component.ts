import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() id = ''
  @Output() close = new EventEmitter<boolean>()

  newTitle = ''
  newContent = ''

  constructor(public postsService: PostsService){}

  onValueTitle(event: any){
    this.newTitle = event.target.value
  }

  onValueContent(event: any){
    this.newContent = event.target.value
  }

  onSave(form: NgForm){
    if(form.invalid) return
    
    this.postsService.editPost(this.id, this.newTitle, this.newContent)
    this.close.emit()
  }

  onBackgroundClick(e: Event){
    let {target} = e;
    if (target){
      if ((target as HTMLElement).className === 'backdrop') this.close.emit();
    }
  }
}
