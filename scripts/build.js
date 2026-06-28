const { cp, mkdir, rm } = require('node:fs/promises');
const { join } = require('node:path');

const root = join(__dirname, '..');
const dist = join(root, 'dist');

async function build() {
  await rm(dist, { force: true, recursive: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, 'index.html'), join(dist, 'index.html'));
  await cp(join(root, 'src'), join(dist, 'src'), { recursive: true });
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
