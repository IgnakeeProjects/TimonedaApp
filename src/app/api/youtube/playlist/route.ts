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
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
}
}