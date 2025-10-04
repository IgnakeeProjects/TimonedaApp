import { promises as fs } from 'fs';
import path from 'path';

type MockVideo = {
  id: string;
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnail: string;
};

const PAGE_SIZE = 12;
const mockFile = path.join(process.cwd(), 'src', 'app', 'Mocks', 'yt-playlist.json');

async function readAll(): Promise<MockVideo[]> {
  const raw = await fs.readFile(mockFile, 'utf-8');
  const data = JSON.parse(raw);
  const items: MockVideo[] = Array.isArray(data.items) ? data.items : [];
  return items.map(v => ({
    id: v.id,
    title: v.title || 'Video',
    description: '',
    publishedAt: v.publishedAt || '',
    thumbnail: v.thumbnail,
  }));
}

// Mock de getUploadsPlaylistId
export async function getUploadsPlaylistIdMock(): Promise<string> {
  return 'MOCK_UPLOADS';
}

// Mock de getLiveVideoId
export async function getLiveVideoIdMock(): Promise<string | null> {
  const live = process.env.YT_MOCK_LIVE === 'true';
  if (!live) return null;
  const items = await readAll();
  return items[0]?.id ?? null;
}

// Mock de getPlaylistVideos con paginación
export async function getPlaylistVideosMock(playlistId: string, pageToken?: string) {
  // playlistId se ignora en mock, pero se mantiene la firma
  const items = await readAll();
  const offset = Number.isFinite(Number(pageToken)) ? Number(pageToken) : 0;

  const paged = items.slice(offset, offset + PAGE_SIZE);
  const nextOffset = offset + PAGE_SIZE;
  const nextPageToken = nextOffset < items.length ? String(nextOffset) : null;

  return {
    items: paged,
    nextPageToken,
  };
}