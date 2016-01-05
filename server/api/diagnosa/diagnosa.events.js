/**
 * Diagnosa model events
 */

'use strict';

import {EventEmitter} from 'events';
var Diagnosa = require('./diagnosa.model');
var DiagnosaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DiagnosaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Diagnosa.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DiagnosaEvents.emit(event + ':' + doc._id, doc);
    DiagnosaEvents.emit(event, doc);
  }
}

export default DiagnosaEvents;
