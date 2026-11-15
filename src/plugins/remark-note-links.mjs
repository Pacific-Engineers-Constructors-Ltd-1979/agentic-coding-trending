import { existsSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';

const notesDir = resolve('notes');
const notePath = /^(daily|weekly)\/(\d{4}-\d{2}-\d{2}|\d{4}-W\d{2})\.md$/;

// Rewrites relative `.md` links between notes to site URLs and fails the build on a missing target.
export default function remarkNoteLinks({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '');

  const walk = (node, file) => {
    if (node.type === 'link' && /^(?![a-z][a-z0-9+.-]*:|#|\/)[^?#]*\.md(#.*)?$/i.test(node.url)) {
      const [target, hash = ''] = node.url.split(/(?=#)/);
      const abs = resolve(dirname(file.path), target);
      const rel = relative(notesDir, abs).split(sep).join('/');
      const match = rel.match(notePath);
      if (!match || !existsSync(abs)) {
        throw new Error(`${file.path}: link "${node.url}" does not point to an existing published note`);
      }
      node.url = `${prefix}/notes/${match[1]}/${match[2]}/${hash}`;
    }
    node.children?.forEach((child) => walk(child, file));
  };

  return (tree, file) => walk(tree, file);
}
