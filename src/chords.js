//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';
import {Music} from './music';

@inject(EventAggregator, Music)
export class Chords {
  heading = 'Chords';

  constructor(eventAggregator, music) {
      this.eventAggregator = eventAggregator;
      this.chordTypes = music.chordTypes;;

      this.selectedChord = this.chordTypes[0];
      this.chordTypes[0].selected = true;
  }

  attached() {
    this.subscription = this.subscribe();
  }

  detached() {
      this.subscription.dispose();
  }

  subscribe() {
     return this.eventAggregator.subscribe(NoteInfo, notes => {
       if (notes.actions.includes(Action.picked)) {
        this.root = notes.notes[0];
        this.playChord(this.root);
       }
     });
   }

   onTypeChange(index) {
     console.log(index);
     this.selectedChord.selected = false;
     this.selectedChord = this.chordTypes[index];
     this.selectedChord.selected = true;
     this.playChord(this.root);
   }

   playChord(root) {
     let notes = new NoteInfo();
     for (let n of this.selectedChord.notes) {
       notes.push(root.number+n);
     }
     notes.actions = [Action.playChord, Action.activate];
     this.eventAggregator.publish(notes);
   }
}
