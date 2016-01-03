/**
 * Laboratorium model events
 */

'use strict';

import {EventEmitter} from 'events';
var Laboratorium = require('./laboratorium.model');
var LaboratoriumEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LaboratoriumEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Laboratorium.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LaboratoriumEvents.emit(event + ':' + doc._id, doc);
    LaboratoriumEvents.emit(event, doc);
  }
}

export default LaboratoriumEvents;
