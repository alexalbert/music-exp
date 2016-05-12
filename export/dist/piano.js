'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './note-info', './music'], function (_export, _context) {
  var inject, EventAggregator, bindable, NoteInfo, Action, Music, _extends, _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, Piano;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_noteInfo) {
      NoteInfo = _noteInfo.NoteInfo;
      Action = _noteInfo.Action;
    }, function (_music) {
      Music = _music.Music;
    }],
    execute: function () {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      _export('Piano', Piano = (_dec = inject(EventAggregator, Music), _dec(_class = (_class2 = function () {
        function Piano(eventAggregator, music) {
          _classCallCheck(this, Piano);

          _initDefineProp(this, 'firstOctave', _descriptor, this);

          _initDefineProp(this, 'noteName', _descriptor2, this);

          _initDefineProp(this, 'numberOfNotes', _descriptor3, this);

          this.eventAggregator = eventAggregator;
          this.music = music;
        }

        Piano.prototype.attached = function attached() {
          this.piano = this.buildPiano(this.firstOctave, this.noteName, this.numberOfNotes);
          this.subscription = this.subscribe();
        };

        Piano.prototype.detached = function detached() {
          this.subscription.dispose();
        };

        Piano.prototype.click = function click(noteNumber, noteName) {
          console.log(noteNumber + '  ' + noteName);
          var ni = new NoteInfo(noteNumber, noteName);
          ni.actions = [Action.picked];
          this.eventAggregator.publish(ni);
        };

        Piano.prototype.subscribe = function subscribe() {
          var _this = this;

          return this.eventAggregator.subscribe(NoteInfo, function (notes) {
            console.log(notes);
            if (notes.actions.includes(Action.activate)) {
              _this.deactivateAll();
              _this.activate(notes);
            }
          });
        };

        Piano.prototype.deactivateAll = function deactivateAll() {
          for (var _iterator = this.piano, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

            note.active = undefined;
            note.flatactive = undefined;
          }
        };

        Piano.prototype.activate = function activate(notes) {
          for (var _iterator2 = notes.notes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var activeNote = _ref2;

            for (var _iterator3 = this.piano, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
              var _ref3;

              if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
              } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
              }

              var note = _ref3;

              if (note.number == activeNote.number) {
                note.active = "f-active";
                console.log(note.name);
                break;
              }
              if (note.flat && note.number - 1 == activeNote.number) {
                note.flatactive = "f-active";
                console.log(note.name);
                break;
              }
            }
          }
        };

        Piano.prototype.buildPiano = function buildPiano(firstOctave, noteName, numberOfNotes) {
          var noteNumber = undefined;
          for (var i = 0; i < this.music.octave.length; i++) {
            if (this.music.octave[i].name === noteName) {
              noteNumber = i;
              break;
            }
          }
          if (noteNumber === undefined) {
            console.log("Invalid note name " + noteName);
          }
          if (firstOctave > 8 || firstOctave < 0) {
            console.log("Octave number mst be between 0 and 8");
          }

          var firstNote = 7 * firstOctave + noteNumber;
          var lastNote = firstNote + numberOfNotes - 1;

          var piano = [];

          for (var n = firstNote; n <= lastNote; n++) {
            var note = _extends({}, this.music.octave[n % 7]);
            if (note.name === 'C' && n != firstNote) {
              firstOctave++;
            }
            note.number += firstOctave * 12 + 12;
            if (note.flat) {
              note.flatName = this.music.octave[(n - 1) % 7].name + '#';
            }
            piano.push(note);
          }

          return piano;
        };

        return Piano;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'firstOctave', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'noteName', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 'C';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'numberOfNotes', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 7;
        }
      })), _class2)) || _class));

      _export('Piano', Piano);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
