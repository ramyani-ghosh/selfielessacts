sha1 = require('js-sha1');
// import * from 'js-sha1';
sha1('Message to hash');
var hash = sha1.create();
hash.update('Message to hash');
hash.hex();
