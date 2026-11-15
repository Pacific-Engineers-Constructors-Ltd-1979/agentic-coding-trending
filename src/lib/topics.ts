import { getCollection } from 'astro:content';

export interface Topic {
  repo: string;
  reason: { en: string; zh: string };
  tags: string[];
  repoUrl: string;
  releasesUrl: string;
  changelogUrl?: string;
}

const repoPattern = /^[\w.-]+\/[\w.-]+$/;

export async function getTopics(): Promise<Topic[]> {
  const entries = await getCollection('topics');
  return entries.map(({ id, data }) => {
    if (!repoPattern.test(id)) throw new Error(`Invalid topic "${id}": expected owner/name`);
    const repoUrl = `https://github.com/${id}`;
    return {
      repo: id,
      reason: data.reason,
      tags: data.tags,
      repoUrl,
      releasesUrl: `${repoUrl}/releases`,
      changelogUrl: data.changelog && `${repoUrl}/blob/HEAD/${data.changelog}`,
    };
  });
}
