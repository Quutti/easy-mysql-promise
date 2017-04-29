# easy-mysql-with-promise
This package is a simple wrapper for mysqljs/mysql package. Package uses connection pool and releases connections after every query. Works with Promises only.

The main reason for this package is to be really easy-to-use and set-up configuration for using MySQL database in NPM project. There might be situations when this package is not enough for your needs. In these cases, I advice you to go with original mysqljs/mysql package.

## Quick start

Start with running `npm install easy-mysql-with-promise --save` and on startup of your app import methods and init module.

All options can be found from this source:
https://github.com/mysqljs/mysql#pooling-connections

```js
import * as DB from 'easy-mysql-with-promise';

DB.init({
    host: 'localhost',
    port: 3306, // defaults to 3306,
    user: 'mysql-username',
    password: 'mysql-pass',
    database: 'name-of-database',
    connectionLimit: 50 // defaults to 50
});
```

And after this you can use module anywhere to create mysql query to your database.

Queries are constructed just like original library does them, so feel free to use their documentation to know how the query and parameters works:
https://github.com/mysqljs/mysql#performing-queries

```js
let resourceId = 1;
DB.query("SELECT * FROM table WHERE id = ?", [resourceId])
    .then(result => {
        // do something with result
    })
    .catch(err => {
        // Promise is rejected if database query returns
        // any mysql errors
    });
```

## Build

Run `npm run build` to compile typescript files to javascript es5. Builded content will be inserted in ./dist folder.

## Tests

Run `npm test` to run tests with mocha.