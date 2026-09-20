/*
 * Prints a bcrypt hash for an admin password, to be set as ADMIN_PASSWORD_HASH
 * on the server. The password is read from stdin rather than an argument so it
 * doesn't end up in the shell history or the process list.
 *
 *   npm run hash-password
 */
const readline = require('readline');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 8;

const rl = readline.createInterface({ input: process.stdin, output: process.stderr });

rl.question('New admin password: ', async (password) => {
  rl.close();
  if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  console.error('\nSet this on the server:\n');
  // The hash itself goes to stdout so it can be piped somewhere.
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
});
