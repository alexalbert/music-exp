'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './note-info'], function (_export, _context) {
  var inject, EventAggregator, NoteInfo, Action, _dec, _class, Chords;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_noteInfo) {
      NoteInfo = _noteInfo.NoteInfo;
      Action = _noteInfo.Action;
    }],
    execute: function () {
      _export('Chords', Chords = (_dec = inject(EventAggregator), _dec(_class = function () {
        function Chords(eventAggregator) {
          _classCallCheck(this, Chords);

          this.heading = 'Piano';

          this.eventAggregator = eventAggregator;
        }

        Chords.prototype.attached = function attached() {
          this.subscription = this.subscribe();
        };

        Chords.prototype.detached = function detached() {
          this.subscription.dispose();
        };

        Chords.prototype.subscribe = function subscribe() {
          var _this = this;

          return this.eventAggregator.subscribe(NoteInfo, function (notes) {
            if (notes.actions.includes(Action.picked)) {
              notes.actions = [Action.play];
              _this.eventAggregator.publish(notes);
            }
          });
        };

        return Chords;
      }()) || _class));

      _export('Chords', Chords);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleWJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDUSxZLHFCQUFBLE07O0FBQ0EscUIsMkJBQUEsZTs7QUFDQSxjLGFBQUEsUTtBQUFVLFksYUFBQSxNOzs7d0JBR0wsTSxXQURaLE9BQU8sZUFBUCxDO0FBSUMsd0JBQVksZUFBWixFQUE2QjtBQUFBOztBQUFBLGVBRjdCLE9BRTZCLEdBRm5CLE9BRW1COztBQUN6QixlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDSDs7eUJBRUQsUSx1QkFBVztBQUNULGVBQUssWUFBTCxHQUFvQixLQUFLLFNBQUwsRUFBcEI7QUFDRCxTOzt5QkFFRCxRLHVCQUFXO0FBQ1QsZUFBSyxZQUFMLENBQWtCLE9BQWxCO0FBQ0QsUzs7eUJBRUQsUyx3QkFBWTtBQUFBOztBQUNULGlCQUFPLEtBQUssZUFBTCxDQUFxQixTQUFyQixDQUErQixRQUEvQixFQUF5QyxpQkFBUztBQUN2RCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQXVCLE9BQU8sTUFBOUIsQ0FBSixFQUEyQztBQUN6QyxvQkFBTSxPQUFOLEdBQWdCLENBQUMsT0FBTyxJQUFSLENBQWhCO0FBQ0Esb0JBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixLQUE3QjtBQUNEO0FBQ0YsV0FMTSxDQUFQO0FBTUQsUyIsImZpbGUiOiJrZXlib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
