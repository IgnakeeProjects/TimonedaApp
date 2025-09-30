import { NextResponse } from 'next/server';
import { fetchFacebookEvents, fetchInstagramAsEvents } from '../../lib/social';

export async function GET() {
  try {
    const [fb, ig] = await Promise.all([fetchFacebookEvents(), fetchInstagramAsEvents(20)]); // máximo 20
    const merged = [...fb, ...ig].sort((a, b) => {
      const da = new Date(a.publishedTime || 0).getTime();
      const db = new Date(b.publishedTime || 0).getTime();
      return db - da; // más recientes primero
    });
    return NextResponse.json({ events: merged });
  } catch {
    return NextResponse.json({ events: [] }, { status: 200 });
  }
}