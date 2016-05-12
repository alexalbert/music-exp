'use strict';

System.register(['./note-info'], function (_export, _context) {
  var NoteInfo, Music;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_noteInfo) {
      NoteInfo = _noteInfo.NoteInfo;
    }],
    execute: function () {
      _export('Music', Music = function () {
        function Music() {
          _classCallCheck(this, Music);

          this.octave = [{ name: 'C', number: 0, flat: false }, { name: 'D', number: 2, flat: true }, { name: 'E', number: 4, flat: true }, { name: 'F', number: 5, flat: false }, { name: 'G', number: 7, flat: true }, { name: 'A', number: 9, flat: true }, { name: 'B', number: 11, flat: true }];
          this.chordTypes = [{ name: 'Major', symbol: '', notes: [0, 4, 7] }, { name: 'Minor', symbol: 'm', notes: [0, 3, 7] }, { name: 'Diminished', symbol: 'dim', notes: [0, 3, 6] }, { name: 'Augmented', symbol: 'aug', notes: [0, 4, 8] }, { name: 'Suspended 4th', symbol: 'sus4', notes: [0, 5, 7] }, { name: 'Major Seventh', symbol: 'maj7', notes: [0, 4, 7, 11] }, { name: 'Dominant 7', symbol: '7', notes: [0, 4, 7, 10] }, { name: 'Minor Seventh', symbol: 'min7', notes: [0, 3, 7, 10] }, { name: 'Minor 7 b5', symbol: 'min7b5', notes: [0, 3, 6, 10] }, { name: 'Diminished 7', symbol: 'dim7', notes: [0, 3, 6, 9] }];
          this.keys = {
            'Major': [0, 2, 4, 5, 7, 9, 11],
            'Minor': [0, 2, 3, 5, 7, 8, 10]
          };
          this.triads = {
            "Major": ['', 'm', 'm', '', '', 'm', 'dim'],
            "Minor": ['m', 'dim', '', 'm', 'm', '', '']
          };
          this.triadSymbols = {
            "Major": ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii' + '˚'],
            "Minor": ['i', 'ii' + '˚', 'III', 'iv', 'v', 'VI', 'VII']
          };
          this.chordLeading = {
            1: [1, 2, 3, 4, 5, 6, 7],
            2: [4, 5, 7],
            3: [2, 4, 6],
            4: [1, 3, 5, 7],
            5: [1],
            6: [2, 4, 5, 1],
            7: [1, 3]
          };
        }

        Music.prototype.noteName = function noteName(noteNumber) {
          var number = noteNumber % 12;
          var name = '';
          for (var _iterator = this.octave, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var note = _ref;

            if (note.number == number) {
              name = note.name;
              break;
            }
            if (note.number > number) {
              name = _prevName + '#';
              break;
            }
            var _prevName = note.name;
          }
          return name;
        };

        Music.prototype.getChord = function getChord(symbol) {
          for (var _iterator2 = this.chordTypes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var chord = _ref2;

            if (chord.symbol === symbol) {
              return chord;
            }
          }
          return undefined;
        };

        Music.prototype.getKeyNotes = function getKeyNotes(rootNumber, key) {
          var notes = new NoteInfo();
          for (var _iterator3 = this.keys[key], _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref3 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref3 = _i3.value;
            }

            var n = _ref3;

            notes.push(rootNumber + n);
          }
          return notes;
        };

        Music.prototype.getChordNotes = function getChordNotes(rootNumber, chordSymbol) {
          var notes = new NoteInfo();
          var chord = this.getChord(chordSymbol);
          for (var _iterator4 = chord.notes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
              if (_i4 >= _iterator4.length) break;
              _ref4 = _iterator4[_i4++];
            } else {
              _i4 = _iterator4.next();
              if (_i4.done) break;
              _ref4 = _i4.value;
            }

            var n = _ref4;

            notes.push(rootNumber + n);
          }
          return notes;
        };

        Music.prototype.getTriads = function getTriads(triadRoot, key) {
          var notes = this.getKeyNotes(triadRoot.number, key).notes;
          var triads = [];
          for (var i = 0; i < notes.length; i++) {
            var chordRoot = notes[i];
            var chordSymbol = this.triads[key][i];
            var chord = this.getChord(chordSymbol);
            var chordNotes = new NoteInfo();
            for (var _iterator5 = chord.notes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
              var _ref5;

              if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref5 = _iterator5[_i5++];
              } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref5 = _i5.value;
              }

              var n = _ref5;

              var number = chordRoot.number + n;
              var name = this.noteName(number);
              chordNotes.push(number, name);
            }

            triads.push({ name: this.noteName(chordRoot.number), number: chordRoot.number, chord: chordSymbol, notes: chordNotes });
          }
          return triads;
        };

        Music.prototype.getNextTriadNumbers = function getNextTriadNumbers(triadNumber) {
          return this.chordLeading[triadNumber + 1];
        };

        return Music;
      }());

      _export('Music', Music);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
