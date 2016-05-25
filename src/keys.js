//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';
import {Music} from './music';
import {computedFrom} from 'aurelia-framework';

@inject(EventAggregator, Music)
export class Chords {
  playNotes = false;

  heading = 'Chord progression';

  harmonicProgression = true;

  selectedNotes = {};

  noteColor = {};

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

  onKeyChange(key) {
    this.selectedKey = key;
    this.setKeyAndRoot();
  }

  onTriadChange(root, chord, index) {
    this.playTriad(root, chord);
    this.resetLeading(index);
  }

  onProgressionTypeChange() {
    this.resetLeading(0);
    return true;
  }

  setKeyAndRoot() {
    this.triads = this.music.getTriads(this.root, this.selectedKey);
    this.triadSymbols = this.music.triadSymbols[this.selectedKey];
    this.updateSelectedNotes();
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

  playTriad(root, chord) {
    let notes = this.music.getChordNotes(root, chord);
    notes.actions = [Action.activate, Action.play];
    this.eventAggregator.publish(notes);
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

    this.updateSelectedNotes();
  }

 updateSelectedNotes() {
   this.selectedNotes = {};
    for (let triad of this.selectedProgression) {
      for (let note of this.triads[triad.triadIndex].notes.notes) {
        if (this.selectedNotes[note.name]) {
          this.selectedNotes[note.name] += 1;
        } else {
          this.selectedNotes[note.name] = 1;
        }
      }
    }
    for (let prop in this.selectedNotes) {
      if (this.selectedNotes.hasOwnProperty(prop)) {
         let count = this.selectedNotes[prop];
         if (count >= 4) this.noteColor[prop] = 'danger';
         else if (count === 3) this.noteColor[prop] = 'warning';
         else if (count === 2) this.noteColor[prop] = 'info';
         else this.noteColor[prop] = 'default';
      }
    }
 }

 resetLeading(index) {
    this.progressions = [];
    this.progressions.push([index]);
    this.nextLeading(0, index);
    this.selectedProgression = [{triadIndex: index}];
  }

  nextLeading(sequenceNo, triadIndex) {
    let nextChordNumbers = this.music.getNextTriadNumbers(
      this.harmonicProgression ? triadIndex : 0);
    let nextChords = [];
    for (let chordIndex of nextChordNumbers) {
      nextChords.push(chordIndex-1);
    }
    this.progressions.splice(sequenceNo+1);
    this.progressions.push(nextChords);
  }
}
