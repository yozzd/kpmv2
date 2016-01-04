/**
 * Terapi model events
 */

'use strict';

import {EventEmitter} from 'events';
var Terapi = require('./terapi.model');
var TerapiEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TerapiEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Terapi.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TerapiEvents.emit(event + ':' + doc._id, doc);
    TerapiEvents.emit(event, doc);
  }
}

export default TerapiEvents;
