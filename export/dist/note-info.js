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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzswQkFBYSxRO0FBSVgsMEJBQVksVUFBWixFQUF3QixRQUF4QixFQUFrQztBQUFBOztBQUFBLGVBSGxDLE9BR2tDLEdBSHhCLEVBR3dCO0FBQUEsZUFGbEMsS0FFa0MsR0FGMUIsRUFFMEI7O0FBQ2hDLGNBQUksY0FBYyxRQUFsQixFQUE0QjtBQUMxQixpQkFBSyxJQUFMLENBQVUsVUFBVixFQUFzQixRQUF0QjtBQUNEO0FBQ0Y7OzJCQUNELEksaUJBQUssVSxFQUFZLFEsRUFBVTtBQUN2QixlQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEVBQUMsUUFBUSxVQUFULEVBQXFCLE1BQU0sUUFBM0IsRUFBaEI7QUFDSCxTOzs7Ozs7O3dCQUdRLE0sR0FBUztBQUNsQixtQkFBWSxXQURNO0FBRWxCLGNBQU8sTUFGVztBQUdsQixrQkFBWSxVQUhNO0FBSWxCLGdCQUFTO0FBSlMsTyIsImZpbGUiOiJub3RlLWluZm8uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
