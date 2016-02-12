/**
 * Obat model events
 */

'use strict';

import {EventEmitter} from 'events';
var Obat = require('./obat.model');
var ObatEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ObatEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Obat.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ObatEvents.emit(event + ':' + doc._id, doc);
    ObatEvents.emit(event, doc);
  }
}

export default ObatEvents;
