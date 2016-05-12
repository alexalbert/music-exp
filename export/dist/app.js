'use strict';

System.register(['midi-wrapper'], function (_export, _context) {
  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_midiWrapper) {}],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Music experiments';
          config.map([{ route: ['', 'piano'], name: 'piano', moduleId: 'keyboard', nav: true, title: 'Piano' }, { route: ['chords'], name: 'chords', moduleId: 'chords', nav: true, title: 'Chords' }, { route: ['keys'], name: 'keys', moduleId: 'keys', nav: true, title: 'Keys' }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztxQkFFYSxHOzs7OztzQkFDWCxlLDRCQUFnQixNLEVBQVEsTSxFQUFRO0FBQzlCLGlCQUFPLEtBQVAsR0FBZSxtQkFBZjtBQUNBLGlCQUFPLEdBQVAsQ0FBVyxDQUNULEVBQUUsT0FBTyxDQUFDLEVBQUQsRUFBSyxPQUFMLENBQVQsRUFBd0IsTUFBTSxPQUE5QixFQUE0QyxVQUFVLFVBQXRELEVBQXVFLEtBQUssSUFBNUUsRUFBa0YsT0FBTyxPQUF6RixFQURTLEVBRVQsRUFBRSxPQUFPLENBQUMsUUFBRCxDQUFULEVBQXFCLE1BQU0sUUFBM0IsRUFBMEMsVUFBVSxRQUFwRCxFQUFtRSxLQUFLLElBQXhFLEVBQThFLE9BQU8sUUFBckYsRUFGUyxFQUdULEVBQUUsT0FBTyxDQUFDLE1BQUQsQ0FBVCxFQUFtQixNQUFNLE1BQXpCLEVBQXNDLFVBQVUsTUFBaEQsRUFBNkQsS0FBSyxJQUFsRSxFQUF3RSxPQUFPLE1BQS9FLEVBSFMsQ0FBWDs7QUFNQSxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0QsUyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
