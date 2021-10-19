import { join } from 'path';
import { URL } from 'url';
import { writeFileSync, readFileSync } from 'fs';

const __dirname = new URL('.', import.meta.url).pathname;

const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json')));
delete pkg['scripts'];
delete pkg['source'];
delete pkg['devDependencies'];
delete pkg['type'];

writeFileSync(join(__dirname, 'dist', 'package.json'), JSON.stringify(pkg, null, 2));
