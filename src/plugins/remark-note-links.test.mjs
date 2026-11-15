import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import remarkNoteLinks from './remark-note-links.mjs';

const run = (url, from = 'notes/weekly/2026-W46.md') => {
  const link = { type: 'link', url, children: [] };
  remarkNoteLinks({ base: '/site/' })({ type: 'root', children: [{ type: 'paragraph', children: [link] }] }, { path: resolve(from) });
  return link.url;
};

test('rewrites a link to an existing note and keeps the hash', () => {
  assert.equal(run('../daily/2026-11-12.md'), '/site/notes/daily/2026-11-12/');
  assert.equal(run('../daily/2026-11-12.md#signals'), '/site/notes/daily/2026-11-12/#signals');
});

test('leaves external, absolute, and anchor links alone', () => {
  for (const url of ['https://example.com/a.md', '/a.md', '#top', 'mailto:a@b.c']) assert.equal(run(url), url);
});

test('fails on a missing note, a template, or a file outside notes', () => {
  for (const url of ['../daily/2099-01-01.md', '../templates/daily.md', '../../README.md']) {
    assert.throws(() => run(url), /does not point to an existing published note/);
  }
});
