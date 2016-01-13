/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
    // Insert routes below
    app.use('/api/kontrols', require('./api/kontrol'));
    app.use('/api/diagnosas', require('./api/diagnosa'));
    app.use('/api/usuls', require('./api/usul'));
    app.use('/api/konsultasis', require('./api/konsultasi'));
    app.use('/api/rehabilitasis', require('./api/rehabilitasi'));
    app.use('/api/terapis', require('./api/terapi'));
    app.use('/api/pengobatans', require('./api/pengobatan'));
    app.use('/api/mediss', require('./api/medis'));
    app.use('/api/laboratoriums', require('./api/laboratorium'));
    app.use('/api/radiologis', require('./api/radiologi'));
    app.use('/api/fisiks', require('./api/fisik'));
    app.use('/api/anamnesas', require('./api/anamnesa'));
    app.use('/api/pasiens', require('./api/pasien'));
    app.use('/api/things', require('./api/thing'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
}