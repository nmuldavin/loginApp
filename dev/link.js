const fs = require('fs');

const symLink = (to, from) => fs.exists(
    from,
    exists => exists || fs.symlinkSync(to, from, 'dir')
);

symLink('../', 'node_modules/app');
symLink('../src/client', 'node_modules/client');
symLink('../src/server', 'node_modules/server');
symLink('../src/shared', 'node_modules/shared');
