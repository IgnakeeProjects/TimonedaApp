const API = 'https://www.googleapis.com/youtube/v3';

export type YTVideo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
};

// Tipos para la respuesta de la API de YouTube
type YouTubePlaylistItem = {
  contentDetails?: {
    videoId?: string;
  };
  snippet?: {
    resourceId?: {
      videoId?: string;
    };
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
};

import { getUploadsPlaylistIdMock, getLiveVideoIdMock, getPlaylistVideosMock } from '../Mocks/youtube-mock';

const useMock = process.env.YT_USE_MOCK === 'true';

const key = process.env.YOUTUBE_API_KEY!;
const channelId = process.env.YOUTUBE_CHANNEL_ID!;
const uploadsEnv = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID || null;

if (!key) throw new Error('Falta YOUTUBE_API_KEY en .env.local');
if (!channelId) throw new Error('Falta YOUTUBE_CHANNEL_ID en .env.local');

export async function getUploadsPlaylistId(): Promise<string> {
  if (useMock) {
    return getUploadsPlaylistIdMock();
  }
  if (uploadsEnv) return uploadsEnv;
  const url = `${API}/channels?part=contentDetails&id=${channelId}&key=${key}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudo obtener el playlist de subidas');
  const data = await res.json();
  const id =
    data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;
  if (!id) throw new Error('Canal sin playlist de subidas');
  return id;
}

export async function getLiveVideoId(): Promise<string | null> {
  if (useMock) {
    return getLiveVideoIdMock();
  }
  const url = `${API}/search?part=snippet&channelId=${channelId}&eventType=live&type=video&maxResults=1&key=${key}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.items?.[0]?.id?.videoId || null;
}

export async function getPlaylistVideos(playlistId: string, pageToken?: string) {
  if (useMock) {
    const data = await getPlaylistVideosMock(playlistId, pageToken);
    return {
      items: data.items as YTVideo[],
      nextPageToken: data.nextPageToken || null,
    };
  }
  const url = new URL(`${API}/playlistItems`);
  url.searchParams.set('part', 'snippet,contentDetails');
  url.searchParams.set('playlistId', playlistId);
  url.searchParams.set('maxResults', '12');
  if (pageToken) url.searchParams.set('pageToken', pageToken);
  url.searchParams.set('key', key);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudieron cargar videos del playlist');
  const data = await res.json();

  const items: YTVideo[] = (data.items || [])
    .map((it: YouTubePlaylistItem) => {
      const vid = it.contentDetails?.videoId || it.snippet?.resourceId?.videoId;
      const sn = it.snippet || {};
      if (!vid) return null;
      return {
        id: vid,
        title: sn.title || 'Video',
        description: sn.description || '',
        publishedAt: sn.publishedAt || '',
        thumbnail:
          sn.thumbnails?.high?.url ||
          sn.thumbnails?.medium?.url ||
          sn.thumbnails?.default?.url ||
          `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
      } as YTVideo;
    })
    .filter((item: YTVideo | null): item is YTVideo => item !== null)

  return {
    items,
    nextPageToken: data.nextPageToken || null,
  };
}