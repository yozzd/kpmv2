/**
 * Radiologi model events
 */

'use strict';

import {EventEmitter} from 'events';
var Radiologi = require('./radiologi.model');
var RadiologiEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RadiologiEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Radiologi.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RadiologiEvents.emit(event + ':' + doc._id, doc);
    RadiologiEvents.emit(event, doc);
  }
}

export default RadiologiEvents;
