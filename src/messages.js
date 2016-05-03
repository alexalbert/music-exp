export class NoteInfo {
  actions = [];
  notes = [];

  constructor(noteNumber, noteName) {
    if (noteNumber && noteName) {
      this.notes = [{number: noteNumber, name: noteName}];
    }
  }
  push(noteNumber, noteName) {
      this.notes.push({number: noteNumber, name: noteName});
  }
}
