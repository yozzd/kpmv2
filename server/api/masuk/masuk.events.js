/**
 * Masuk model events
 */

'use strict';

import {EventEmitter} from 'events';
var Masuk = require('./masuk.model');
var MasukEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MasukEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Masuk.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MasukEvents.emit(event + ':' + doc._id, doc);
    MasukEvents.emit(event, doc);
  }
}

export default MasukEvents;
