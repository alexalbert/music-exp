'use strict';

System.register([], function (_export, _context) {
  var NoteInfo, Action;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('NoteInfo', NoteInfo = function () {
        function NoteInfo(noteNumber, noteName) {
          _classCallCheck(this, NoteInfo);

          this.actions = [];
          this.notes = [];
          this.channel = 0;

          if (noteNumber && noteName) {
            this.push(noteNumber, noteName);
          }
        }

        NoteInfo.prototype.push = function push(noteNumber, noteName) {
          this.notes.push({ number: noteNumber, name: noteName });
        };

        return NoteInfo;
      }());

      _export('NoteInfo', NoteInfo);

      _export('Action', Action = {
        playChord: 'playChord',
        play: 'play',
        activate: 'activate',
        picked: 'picked'
      });

      _export('Action', Action);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzswQkFBYSxRO0FBS1gsMEJBQVksVUFBWixFQUF3QixRQUF4QixFQUFrQztBQUFBOztBQUFBLGVBSmxDLE9BSWtDLEdBSnhCLEVBSXdCO0FBQUEsZUFIbEMsS0FHa0MsR0FIMUIsRUFHMEI7QUFBQSxlQUZsQyxPQUVrQyxHQUZ4QixDQUV3Qjs7QUFDaEMsY0FBSSxjQUFjLFFBQWxCLEVBQTRCO0FBQzFCLGlCQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLFFBQXRCO0FBQ0Q7QUFDRjs7MkJBQ0QsSSxpQkFBSyxVLEVBQVksUSxFQUFVO0FBQ3ZCLGVBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsRUFBQyxRQUFRLFVBQVQsRUFBcUIsTUFBTSxRQUEzQixFQUFoQjtBQUNILFM7Ozs7Ozs7d0JBR1EsTSxHQUFTO0FBQ2xCLG1CQUFZLFdBRE07QUFFbEIsY0FBTyxNQUZXO0FBR2xCLGtCQUFZLFVBSE07QUFJbEIsZ0JBQVM7QUFKUyxPIiwiZmlsZSI6Im5vdGUtaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
