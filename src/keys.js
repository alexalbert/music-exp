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

  noteColors = {
    'A': 'red',
    'B': 'green',
    'C': 'blue',
    'D': 'purple',
    'E': 'lime',
    'F': 'magenta',
    'G': 'black',
    'C#': 'brown',
    'F#': 'maroon',
    'G#': 'cyan',
    'A#': 'olive',
  };

  extensionNames = [null, '7', '9', '11', '13'];
  extensions = ['','','','','','','','','','','','','',''];

  progressions = [];  // array of arrys of indices to triads [[int]]
  selectedProgression = []; // array of objects [{ triadIndex: int, active: bool, ext: string}]

  constructor(eventAggregator, music) {
    this.eventAggregator = eventAggregator;
    this.music = music;
    this.keys = music.keys;

    this.selectedKey = 'Major';
    this.keyNames = Object.keys(this.keys);
    this.selectedNotes = new Map();
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

  onExtensionChange(index) {
    this.updateSelectedChordNotes(index);
    this.updateSelectedNotes();
  }

  updateSelectedChordNotes(index) {
    let chord = this.triads[this.selectedProgression[index].triadIndex];
    let notes = this.music.extendChord(chord, this.extensions[index]);
    this.selectedProgression[index].notes = notes;
  }

  updateAllSelectedChordNotes() {
    for (var i = 0; i < this.selectedProgression.length; i++) {
      this.updateSelectedChordNotes(i);
    }
  }

  setKeyAndRoot() {
    this.triads = this.music.getTriads(this.root, this.selectedKey);
    this.triadSymbols = this.music.triadSymbols[this.selectedKey];
    this.updateAllSelectedChordNotes();
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
     let notes = this.music.extendChord(chord, this.extensions[sequence]);

     let chordNotes = new NoteInfo();
     chordNotes.actions = [Action.play];
     chordNotes.notes = notes;
     this.eventAggregator.publish(chordNotes);

     this.selectedProgression.splice(sequence);
     this.selectedProgression.push(
       {
         triadIndex: triadIndex,
         notes: notes
       }
     );
     // Max 6 chords
     if (sequence < 5) {
       this.nextLeading(sequence, triadIndex);
    }

    this.updateSelectedNotes();
  }

 updateSelectedNotes() {
   this.selectedNotes.clear();
    for (let triad of this.selectedProgression) {
      for (let note of triad.notes) {
        if (this.selectedNotes.has(note.name)) {
          let n = this.selectedNotes.get(note.name);
          this.selectedNotes.set(note.name, n+1);
        } else {
          this.selectedNotes.set(note.name, 1);
        }
      }
    }
 }

 resetLeading(index) {
    this.progressions = [];
    this.progressions.push([index]);
    this.selectedProgression = [{
      triadIndex: index,
      notes: this.music.extendChord(this.triads[index])
    }];
    this.nextLeading(0, index);
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
