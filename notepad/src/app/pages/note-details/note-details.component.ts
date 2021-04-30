import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})

export class NoteDetailsComponent implements OnInit {

  note : Note;
  noteId : number;
  new : boolean;



  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    

    //to find out that we are creating new or editing an existing one
    //first inject the activatedRoute in constructor
    //second check the route parameters and passing params for observe
    this.route.params.subscribe((params : Params) => {
      this.note = new Note();
      //check param.id if it's have value or not 
        if(params.id) {
          this.note = this.notesService.get(params.id);
          this.noteId = params.id;
          this.new = false;
        } else {
          this.new = true;

        }
    })

    
  }

  onSubmit(Form : NgForm) {
    if (this.new) {
      //save the note
      this.notesService.add(Form.value);
    } else {
      //update the note 
      this.notesService.update(this.noteId, Form.value.title, Form.value.body);
    }

    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  delete() {
    this.notesService.delete(this.noteId);
    this.router.navigateByUrl('/');
  }
}

