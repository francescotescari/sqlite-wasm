import sqlite3InitModule from '../index.mjs';

const container = document.querySelector('.main-thread');

const logHtml = function (cssClass, ...args) {
  const div = document.createElement('div');
  if (cssClass) div.classList.add(cssClass);
  div.append(document.createTextNode(args.join(' ')));
  container.append(div);
};

const log = (...args) => logHtml('', ...args);
const error = (...args) => logHtml('error', ...args);

const start = function (sqlite3) {
  log('Running SQLite3 version', sqlite3.version.libVersion);
  const db = new sqlite3.oo1.DB('/mydb.sqlite3', 'c');
  log('Created transient database', db.filename);

  try {
    log('Creating a table...');
    db.exec(`CREATE TABLE IF NOT EXISTS t(
       aaaaaaaaaaaaaaaaaaaaaa0,
       aaaaaaaaaaaaaaaaaaaaaa1,
       aaaaaaaaaaaaaaaaaaaaaa2,
       aaaaaaaaaaaaaaaaaaaaaa3,
       aaaaaaaaaaaaaaaaaaaaaa4,
       aaaaaaaaaaaaaaaaaaaaaa5,
       aaaaaaaaaaaaaaaaaaaaaa6,
       aaaaaaaaaaaaaaaaaaaaaa7,
       aaaaaaaaaaaaaaaaaaaaaa8,
       aaaaaaaaaaaaaaaaaaaaaa9,
       aaaaaaaaaaaaaaaaaaaaaa10,
       aaaaaaaaaaaaaaaaaaaaaa11,
       aaaaaaaaaaaaaaaaaaaaaa12,
       aaaaaaaaaaaaaaaaaaaaaa13,
       aaaaaaaaaaaaaaaaaaaaaa14,
       aaaaaaaaaaaaaaaaaaaaaa15,
       aaaaaaaaaaaaaaaaaaaaaa16,
       aaaaaaaaaaaaaaaaaaaaaa17,
       aaaaaaaaaaaaaaaaaaaaaa18,
       aaaaaaaaaaaaaaaaaaaaaa19,
       aaaaaaaaaaaaaaaaaaaaaa20
             );`);
    log('Insert some data using exec()...');
    for (let i = 0; i < 10000; ++i) {
      db.exec({
        sql: 'INSERT INTO t VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        bind: [i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i],
      });
    }
    log('Query data with exec()...');
    const time = Date.now();
    // replace with 'object' to see difference in performance
    const rowMode = 'array';
    const result = db.exec({
      sql: 'SELECT * FROM t;',
      rowMode,
      returnValue: 'resultRows',
    });
    const timeTaken = Date.now() - time;
    console.log(result);
    console.log(`Time taken for rowMode ${rowMode}: ${timeTaken}ms`);
  } finally {
    db.close();
  }
};

log('Loading and initializing SQLite3 module...');
sqlite3InitModule({
  print: log,
  printErr: error,
}).then((sqlite3) => {
  log('Done initializing. Running demo...');
  try {
    start(sqlite3);
  } catch (err) {
    error(err.name, err.message);
  }
});
