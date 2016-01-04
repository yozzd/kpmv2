/**
 * Usul model events
 */

'use strict';

import {EventEmitter} from 'events';
var Usul = require('./usul.model');
var UsulEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UsulEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Usul.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UsulEvents.emit(event + ':' + doc._id, doc);
    UsulEvents.emit(event, doc);
  }
}

export default UsulEvents;
