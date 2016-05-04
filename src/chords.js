//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

import {EventAggregator} from 'aurelia-event-aggregator';
// import {MidiWrapper} from './midi-wrapper';
import {NoteInfo} from './messages';

@inject(EventAggregator)
export class Chords {
  chordTypes = [
    {name: 'Major', symbol: '', notes: [4, 7]},
    {name: 'Minor', symbol: 'm', notes: [3, 7]},
    {name: 'Diminished', symbol: 'dim', notes: [3, 6]},
    {name: 'Augmented', symbol: 'aug', notes: [4, 8]},
    {name: 'Suspended 4th', symbol: 'sus4', notes: [5, 7]},
    {name: 'Major Seventh', symbol: 'maj7', notes: [4, 7, 11]},
    {name: 'Dominant 7', symbol: '7', notes: [4, 7, 10]},
    {name: 'Minor Seventh', symbol: 'min7', notes: [3, 7, 10]},
    {name: 'Minor 7 b5', symbol: 'min7b5', notes: [3, 6, 10]},
    {name: 'Diminished 7', symbol: 'dim7', notes: [3, 6, 9]}
  ];

  heading = 'Chords';

  constructor(eventAggregator) {
      this.eventAggregator = eventAggregator;
      // this.midiWrapper = midiWrapper;
      this.selectedChord = this.chordTypes[0];
      this.chordTypes[0].selected = true;
      this.subscribe();
  }

  subscribe() {
     this.eventAggregator.subscribe(NoteInfo, notes => {
       console.log("dddddd");
       if (notes.actions.includes('picked')) {
         console.log('picked');
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
     let notes = new NoteInfo(this.root.number, this.root.name);
     for (let n of this.selectedChord.notes) {
       notes.push(root.number+n);
     }
     notes.actions = ['play', 'activate'];
     this.eventAggregator.publish(notes);
   }
}
