import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  //create the Note array 
  notes : Note[] = new Array<Note>();

  constructor() { }

  getAll(){
    return this.notes;
  }

  //create ID for the note
  get(id: number) {
    return this.notes[id];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  //add method will add the note to the notes array and return the id of the note 
  //the id = index
  add(note: Note) {
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    this.notes.slice(id, 1);
  }
}
