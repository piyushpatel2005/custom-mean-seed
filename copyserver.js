const fs = require('fs-extra');

fs.copy('server/', 'dist/server')
    .then(() => console.log('Server files copied to dist'))
    .catch(err => console.log(err));