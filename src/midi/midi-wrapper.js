import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo} from '../messages';
import {Container} from 'aurelia-dependency-injection';


@inject(EventAggregator)
export class MidiWrapper {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribe();
  }

  subscribe() {
     this.eventAggregator.subscribe(NoteInfo, notes => {
       if (notes.actions.includes('play')) {
         this.playNotes(notes);
       }
     });
   }

   playNotes(notes) {
     var delay = 0; // play one note every quarter second
     var velocity = 127; // how hard the note hits
     // play the note
     MIDI.setVolume(0, 127);
     for (let note of notes.notes) {
       MIDI.noteOn(0, note.number, velocity, delay);
       MIDI.noteOff(0, note.number, delay + 0.75);
      }
   }
}

let container = Container.instance;
var mw = container.get(MidiWrapper);
