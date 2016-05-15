//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';
import {Music} from './music';

@inject(EventAggregator, Music)
export class Chords {
  playNotes = false;

  heading = 'Keys';

  progressions = [];  // array of arrys of indices to triads [[int]]
  selectedProgression = []; // array of objects [{ triadIndex: int, active: bool}]

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

  leadingClick(sequence, clickIndex) {
     console.log(sequence + " " + triadIndex);
     let triadIndex = this.progressions[sequence][clickIndex];
     let chord = this.triads[triadIndex];
     chord.notes.actions = [Action.play];
     this.eventAggregator.publish(chord.notes);
     this.selectedProgression.splice(sequence);
     this.selectedProgression.push({triadIndex: triadIndex});

     // Max 6 chords
     if (sequence < 5) {
       this.nextLeading(sequence, triadIndex);
    }
  }

  resetLeading(index) {
    this.progressions = [];
    this.progressions.push([index]);
    this.nextLeading(0, index);
    this.selectedProgression = [{triadIndex: index}];
  }

  playSelectedProgression() {
    let timeout = 10;
    for (let triad of this.selectedProgression) {
        let chord = this.triads[triad.triadIndex];
        setTimeout(() => {
          triad.active = true;
          chord.notes.actions = [Action.playChord];
          this.eventAggregator.publish(chord.notes);
        }, timeout);
        timeout += 1000;
        setTimeout(() => {
          triad.active = false;
        }, timeout);
    }
  }

  nextLeading(sequenceNo, triadIndex) {
    let nextChordNumbers = this.music.getNextTriadNumbers(triadIndex);
    let nextChords = [];
    for (let chordIndex of nextChordNumbers) {
      nextChords.push(chordIndex-1);
    }
    this.progressions.splice(sequenceNo+1);
    this.progressions.push(nextChords);
  }

  playTriad(root, chord) {
    let notes = this.music.getChordNotes(root, chord);
    notes.actions = [Action.activate, Action.play];
    this.eventAggregator.publish(notes);
  }
}
