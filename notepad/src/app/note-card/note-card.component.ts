import {Component, OnInit, ViewChild, ElementRef, Renderer2, Input} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;

  //getting reference from html
  @ViewChild('truncation') truncation: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    //work out the text overflow if not, hide the truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewHeight = parseInt(style.getPropertyValue("height"), 10);

    if(this.bodyText.nativeElement.scrollHeight > viewHeight) {
      //if the text is overflow, show the fade out truncator
      this.renderer.setStyle(this.truncation.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncation.nativeElement, 'display', 'none');
    }
  }

}
