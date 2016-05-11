//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';
import {Music} from './music';

@inject(EventAggregator, Music)
export class Chords {
  playNotes = false;

  heading = 'Keys';

  chordLeading = [];

  constructor(eventAggregator, music) {
    this.eventAggregator = eventAggregator;
    this.music = music;
    this.keys = music.keys;

    this.selectedKey = 'Major';
    this.keyNames = Object.keys(this.keys);
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
        this.root = {...notes.notes[0]};
        this.setKeyAndRoot();
        if (this.playNotes) {
          this.playComposition(this.root);
        }
      }
    });
  }

  onTypeChange(key) {
    this.selectedKey = key;
    this.setKeyAndRoot();
  }

  setKeyAndRoot() {
    this.triads = this.music.getTriads(this.root, this.selectedKey);
    this.triadSymbols = this.music.triadSymbols[this.selectedKey];
    this.showKey(this.root);
  }

  playComposition(root) {
    let notes = this.compose(16);
    let noteInfo = new NoteInfo();
    noteInfo.notes = notes;
    noteInfo.actions = [Action.play];
    this.eventAggregator.publish(noteInfo);
  }

  showKey(root) {
    let notes = this.music.getKeyNotes(root.number, this.selectedKey);
    notes.actions = [Action.activate];
    this.eventAggregator.publish(notes);
  }

  getRandomNote(notes) {
    return notes[Math.floor(Math.random() * 7)];
  }

  compose(length) {
    let key = this.music.getKeyNotes(this.root.number, this.selectedKey);
    let notes = [{...key.notes[0]}];
    for (let i = 0; i < length-2; i++) {
      let note = {...this.getRandomNote(key.notes)};
      notes.push(note);
    }
    notes.push({...key.notes[0]});
    let delay = 0;
    let len = 0.25;
    for (var i = 0; i < notes.length; i++) {
      let note = notes[i]
      note.start = delay;
      delay += len;
      note.end = delay;
    }
    return notes;
  }

  clickedTriad(root, chord, index) {
    this.playTriad(root, chord);
    this.resetLeading(index);
  }

  leadingClick(index1, index2) {
     console.log(index1 + " " + index2);
     // Max 6 chords
     if (index1 < 5) {
       this.nextLeading(index1, index2);
    }
  }

  resetLeading(index) {
    this.leading = [];
    this.leading.push(
      {selected: 0, triads: [this.triads[index].name + this.triads[index].chord]});
    this.nextLeading(0, index);
  }

  nextLeading(index1, index2) {

    let nextChordNumbers = this.music.getNextTriadNumbers(index2);
    let nextChords = [];
    for (let chordIndex in nextChordNumbers) {
      nextChords.push(this.triads[chordIndex].name + this.triads[chordIndex].chord);
    }
    this.leading.splice(index1+1);
    this.leading.push({selected: 2, triads: nextChords});
  }

  playTriad(root, chord) {
    let notes = this.music.getChordNotes(root, chord);
    notes.actions = [Action.activate, Action.play];
    this.eventAggregator.publish(notes);
  }

  getChordLeading(triadNumber) {
    nextTriads = [];
    nextTriadNumbers = this.music.getNextTriadNumbers(triad)
    for (i of nextTriadNumbers) {
      nextTriads.push(this.triads[i+1]);
    }
    return nextTriad;
  }
}
