import { getCollection, type CollectionEntry } from 'astro:content';

export type NoteType = 'daily' | 'weekly';
export const noteTypes: NoteType[] = ['daily', 'weekly'];

export interface Note {
  entry: CollectionEntry<'notes'>;
  type: NoteType;
  date: string;
  title: string;
  summary: string;
}

const idPattern = /^(?:daily\/\d{4}-\d{2}-\d{2}|weekly\/\d{4}-W\d{2})$/;

export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
export const noteUrl = (n: Pick<Note, 'type' | 'date'>) => url(`/notes/${n.type}/${n.date}/`);

function summaryOf(body: string): string {
  // The English half ends where the second top-level heading starts.
  const english = body.split(/^# /m)[1] ?? '';
  const section = english.match(/^## (?:Summary|Week in review)[^\n]*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m);
  const text = (section?.[1] ?? '').replace(/<!--[\s\S]*?-->/g, '').trim();
  return text.split(/\n\s*\n/)[0] ?? '';
}

export async function getNotes(type?: NoteType): Promise<Note[]> {
  const entries = await getCollection('notes');
  const notes = entries.map((entry): Note => {
    if (!idPattern.test(entry.id)) {
      throw new Error(`Invalid note filename "${entry.id}.md": expected daily/YYYY-MM-DD or weekly/YYYY-Www`);
    }
    const [noteType, date] = entry.id.split('/') as [NoteType, string];
    const body = entry.body ?? '';
    return {
      entry,
      type: noteType,
      date,
      title: body.match(/^# (.+)$/m)?.[1].trim() ?? entry.id,
      summary: summaryOf(body),
    };
  });
  return notes
    .filter((n) => !type || n.type === type)
    .sort((a, b) => b.date.localeCompare(a.date));
}
