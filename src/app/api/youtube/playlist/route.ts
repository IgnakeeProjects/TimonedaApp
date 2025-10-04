import { NextResponse } from 'next/server';
import { getPlaylistVideos } from '../../../lib/youtube';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get('playlistId');
  const pageToken = searchParams.get('pageToken') || undefined;

  if (!playlistId) {
    return NextResponse.json({ error: 'playlistId requerido' }, { status: 400 });
  }

  try {
    const data = await getPlaylistVideos(playlistId, pageToken);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 500 });
  }
}