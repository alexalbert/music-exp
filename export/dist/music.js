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
          this.chordTypes = [{ name: 'Major', symbol: '', notes: [0, 4, 7], ext: '' }, { name: 'Minor', symbol: 'm', notes: [0, 3, 7], ext: '' }, { name: 'Diminished', symbol: 'dim', notes: [0, 3, 6] }, { name: 'Augmented', symbol: 'aug', notes: [0, 4, 8] }, { name: 'Suspended 4th', symbol: 'sus4', notes: [0, 5, 7] }, { name: 'Major Seventh', symbol: 'maj7', notes: [0, 4, 7, 11] }, { name: 'Dominant 7', symbol: '7', notes: [0, 4, 7, 10] }, { name: 'Minor Seventh', symbol: 'min7', notes: [0, 3, 7, 10] }, { name: 'Minor 7 b5', symbol: 'min7b5', notes: [0, 3, 6, 10] }, { name: 'Diminished 7', symbol: 'dim7', notes: [0, 3, 6, 9] }];
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
            6: [1, 2, 4, 5],
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

            triads.push({ name: this.noteName(chordRoot.number),
              number: chordRoot.number,
              chord: chordSymbol,
              notes: chordNotes });
          }
          return triads;
        };

        Music.prototype.getNextTriadNumbers = function getNextTriadNumbers(triadNumber) {
          return this.chordLeading[triadNumber + 1];
        };

        Music.prototype.extendChord = function extendChord(chord, extension) {
          var rootNumber = chord.notes.notes[0].number;

          var extraNotes = undefined;
          switch (extension) {
            case '7':
              extraNotes = [10];
              break;
            case '9':
              extraNotes = [10, 14];
              break;
            case '11':
              extraNotes = [10, 17];
              break;
            case '13':
              extraNotes = [10, 21];
              break;
          }

          var notes = [].concat(chord.notes.notes);
          if (extraNotes) {
            for (var _iterator6 = extraNotes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
              var _ref6;

              if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref6 = _iterator6[_i6++];
              } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref6 = _i6.value;
              }

              var noteInterval = _ref6;

              var noteNumber = rootNumber + noteInterval;
              notes.push({ number: noteNumber, name: this.noteName(noteNumber) });
            }
          }

          return notes;
        };

        Music.prototype.clone = function clone(obj) {
          return JSON.parse(JSON.stringify(obj));
        };

        return Music;
      }());

      _export('Music', Music);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
