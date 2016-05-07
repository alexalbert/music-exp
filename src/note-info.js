export class NoteInfo {
  actions = [];
  notes = [];

  constructor(noteNumber, noteName) {
    if (noteNumber && noteName) {
      this.push(noteNumber, noteName);
    }
  }
  push(noteNumber, noteName) {
      this.notes.push({number: noteNumber, name: noteName});
  }
}

export var Action = {
  playChord : 'playChord',
  play : 'play',
  activate  : 'activate',
  picked : 'picked'
}
