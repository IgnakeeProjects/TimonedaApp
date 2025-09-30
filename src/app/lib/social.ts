const GRAPH = 'https://graph.facebook.com/v19.0';

// NUEVO: bandera para activar mocks
const USE_SOCIAL_MOCK = process.env.USE_SOCIAL_MOCK === 'true';

export type NormalizedEvent = {
  id: string;
  platform: 'facebook' | 'instagram';
  message: string;
  imageSrc: string;  
  href: string;
  venue?: string | null;   
  publishedTime?: string | null;  
};

/* ===== Tipos de Facebook ===== */
type FBImage = { height: number; width: number; src: string };
type FBMedia = { source: string;image?: FBImage };
type FBAttachment = { description:string; media?: FBMedia; type?: string; title?: string; url?: string };
type FBPost = {
  id: string;
  created_time: string;
  message?: string;
  permalink_url?: string;
  status_type?: string;
  full_picture?: string;
  attachments?: { data: FBAttachment[] };
  likes?: { summary: { total_count: number } };
  comments?: { summary: { total_count: number } };
  shares?: { count: number };
};
type FBPostsResponse = { data?: FBPost[] };

/* ===== Tipos de Instagram ===== */
type IGChild = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO';
  media_url?: string;
  thumbnail_url?: string;
};
type IGMedia = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption?: string;
  permalink: string;
  timestamp?: string;
  username?: string;
  media_url?: string;
  thumbnail_url?: string;
  like_count?: number;
  comments_count?: number;
  children?: { data: IGChild[] };
};
type IGMediaResponse = { data?: IGMedia[] };

function fmStr(str?: string) {
    if(!str) return '';
    return str.replace(/_/g, " ");
}

export async function fetchFacebookEvents(limit = 8): Promise<NormalizedEvent[]> {

  if (USE_SOCIAL_MOCK) return normalizeFacebookPosts(FB_POSTS_MOCK.data ?? []);

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!pageId || !token) return normalizeFacebookPosts(FB_POSTS_MOCK.data ?? []);

  const url =
    `${GRAPH}/${pageId}/posts` +
    `?limit=${limit}` +
    `&fields=id,created_time,message,permalink_url,status_type,full_picture,attachments{media,type},` +
    `likes.summary(true),comments.summary(true),shares` +
    `&access_token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return normalizeFacebookPosts(FB_POSTS_MOCK.data ?? []);
    const json = await res.json() as FBPostsResponse;
    return normalizeFacebookPosts(json?.data ?? []);
  } catch {
    return normalizeFacebookPosts(FB_POSTS_MOCK.data ?? []);
  }
}

export async function fetchInstagramAsEvents(limit = 12): Promise<NormalizedEvent[]> {
  const igUserId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN;
  
  // Usa el mock si está activado o aún no tienes credenciales
  if (USE_SOCIAL_MOCK || !igUserId || !token) {
    return normalizeInstagramPosts(IG_POSTS_MOCK.data ?? []);
    console.log(IG_POSTS_MOCK.data);
  }

 const url =
    `${GRAPH}/${igUserId}/media` +
    `?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink,children{media_type,media_url,thumbnail_url}` +
    `&limit=${limit}` +
    `&access_token=${token}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  //const json = await res.json();
  //const data: any[] = json.data ?? [];

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return normalizeInstagramPosts(IG_POSTS_MOCK.data ?? []);
    const json = await res.json() as IGMediaResponse;
    return normalizeInstagramPosts(json?.data ?? []);
  } catch {
    return normalizeInstagramPosts(IG_POSTS_MOCK.data ?? []);
  }
}

function normalizeFacebookPosts(items: ReadonlyArray<FBPost>): NormalizedEvent[] {
  return (items || []).map((p: FBPost) => {
    const firstAttachmentImage = p?.attachments?.data?.[0]?.media?.image?.src ?? p.full_picture ?? '/events/placeholder-pin-svgrepo-com.svg';
    const title = (p.message ?? p?.attachments?.data?.[0]?.title ?? 'Publicación').split('\n')[0];
    return {
      id: `fb_${p.id}`,
      platform: 'facebook' as const,
      message:title,
      imageSrc: firstAttachmentImage,
      href: p.permalink_url ?? '#',
      venue: fmStr(p.status_type) || null,
      publishedTime: p.created_time ?? null,      
    };
  });
}


function normalizeInstagramPosts(items: ReadonlyArray<IGMedia>): NormalizedEvent[] {
  return (items || []).map((p: IGMedia) => {
    // Elegir imagen de preview según tipo
    let img = '';
    if (p.media_type === 'CAROUSEL_ALBUM') {
      const child = p.children?.data?.[0];
      img =
        (child?.media_type === 'IMAGE' && child.media_url) ||
        (child?.media_type === 'VIDEO' && (child.thumbnail_url || child.media_url)) ||
        '';
    } else if (p.media_type === 'VIDEO') {
      img = p.thumbnail_url || p.media_url || '';
    } else if (p.media_type === 'IMAGE') {
      img = p.media_url ?? '';
    }
    if (!img) img = '/events/placeholder-pin-svgrepo-com.svg';

    const title = (p.caption || '').split('\n')[0]?.slice(0, 140) || 'Publicación';

    return {
      id: `ig_${p.id}`,
      platform: 'instagram' as const,
      message: title,
      imageSrc: img,
      href: p.permalink,
      venue: fmStr(p.media_type) || 'Instagram',
      publishedTime: p.timestamp || null
    };
  });
}


/* ================== MOCK: Facebook posts ================== */
const FB_POSTS_MOCK : FBPostsResponse = {
  data: [
    {
      id: '10150199999888877_87654321098765432',
      created_time: '2023-10-27T18:00:00+0000',
      message:
        '¡Fin de semana de lanzamiento! Nuestro nuevo producto ya está disponible. ✨ Visita nuestro sitio web para saber más. #Lanzamiento #NuevoProducto #Innovacion',
      permalink_url: 'https://www.facebook.com/10150199999888877/posts/87654321098765432',
      status_type: 'added_photos',
      full_picture: '/events/mock-fb-1.jpg',
      attachments: {
        data: [
          {
            description:
              '¡Fin de semana de lanzamiento! Nuestro nuevo producto ya está disponible. Visita nuestro sitio web para saber más.',            
            media: {
              source: 'https://video.example.com/...mp4',
              image: {
                height: 720,
                src: '/events/mock-fb-1.jpg',
                width: 960,
              },
            },
            title: 'Lanzamiento de Nuestro Nuevo Producto',
            type: 'photo',
            url: 'https://video.example.com/...mp4',
          },
        ],
      },
      likes: { summary: { total_count: 452 } },
      comments: { summary: { total_count: 68 } },
      shares: { count: 112 },
    },
    {
      id: '10150199999888877_87654321098765431',
      created_time: '2023-10-26T12:15:30+0000',
      message:
        'Estamos leyendo este fascinante artículo sobre el futuro de la tecnología. ¡Muy recomendado! 👇',
      permalink_url: 'https://www.facebook.com/10150199999888877/posts/87654321098765431',
      status_type: 'shared_story',
      attachments: {
        data: [
          {
            description:
              'Un análisis profundo de las tendencias que darán forma a nuestro mundo durante la próxima década.',
            media: {
              source: 'https://www.techjournal.com/articles/future-of-ai',
              image: { height: 630, width: 1200, src: '/events/mock-fb-3.jpg' },
            },
            title: 'El Futuro de la Inteligencia Artificial: Más Allá de 2024',
            type: 'share',
            url: 'https://www.techjournal.com/articles/future-of-ai',
          },
        ],
      },
      likes: { summary: { total_count: 189 } },
      comments: { summary: { total_count: 23 } },
      shares: { count: 45 },
    },
    {
      id: '10150199999888877_87654321098765430',
      created_time: '2023-10-25T09:00:00+0000',
      message:
        'Un vistazo detrás de cámaras de nuestro equipo trabajando en el nuevo proyecto. ¡La pasión es nuestro motor! 🎥 #Equipo #TrabajoDuro #BehindTheScenes',
      permalink_url: 'https://www.facebook.com/10150199999888877/posts/87654321098765430',
      status_type: 'added_video',
      full_picture: '/events/mock-fb-2.jpg',
      attachments: {
        data: [
          {
            description:
              'Un vistazo detrás de cámaras de nuestro equipo trabajando en el nuevo proyecto.',
            media: {
              source: 'https://video.example.com/...mp4',
              image: { height: 1080, src: '/events/mock-fb-2.jpg', width: 1920 },
            },
            title: 'Detrás de Cámaras: Nuestro Equipo en Acción',
            type: 'video_inline',
            url: 'https://video.example.com/...mp4',
          },
        ],
      },
      likes: { summary: { total_count: 310 } },
      comments: { summary: { total_count: 41 } },
      shares: { count: 76 },
    },
  ],
};


// ===== MOCK: Instagram (tus 3 últimos posts) =====
const IG_POSTS_MOCK: IGMediaResponse = {
  data: [
    {
      id: '17918991234567890',
      media_type: 'CAROUSEL_ALBUM',
      caption:
        '¡Un fin de semana increíble en la montaña! Desliza para ver más ➡️ ¿Cuál es tu foto favorita? 🏔️☀️ #Naturaleza #Aventura #FinDeSemana',
      permalink: 'https://www.instagram.com/p/CzABCDEF123/',
      timestamp: '2023-10-27T19:30:15+0000',
      username: 'explorador_digital',
      like_count: 2345,
      comments_count: 152,
      children: {
        data: [
          { id: '17918991234567891', media_type: 'IMAGE', media_url: 'https://scontent.cdninstagram.com/v/t51.2885-15/393717462_..._n.jpg?...' },
          { id: '17918991234567892', media_type: 'VIDEO', media_url: 'https://scontent.cdninstagram.com/v/t50.2886-16/393717463_..._n.mp4?...', thumbnail_url: 'https://scontent.cdninstagram.com/v/t51.2885-15/393717464_..._n.jpg?...' },
          { id: '17918991234567893', media_type: 'IMAGE', media_url: 'https://scontent.cdninstagram.com/v/t51.2885-15/393717465_..._n.jpg?...' }
        ]
      }
    },
    {
      id: '17918991234567889',
      media_type: 'VIDEO',
      caption: 'Tutorial rápido: ¡El café perfecto en 60 segundos! ☕️ #Cafe #Tutorial #Reel #BuenosDias',
      permalink: 'https://www.instagram.com/reel/Cy9ZYXWV456/',
      timestamp: '2023-10-26T15:05:42+0000',
      username: 'explorador_digital',
      media_url: 'https://scontent.cdninstagram.com/v/t50.2886-16/393717450_..._n.mp4?...',
      thumbnail_url: 'https://scontent.cdninstagram.com/v/t51.2885-15/393717451_..._n.jpg?...',
      like_count: 5820,
      comments_count: 210
    },
    {
      id: '17918991234567888',
      media_type: 'IMAGE',
      caption: 'Atardecer en la ciudad. A veces, solo hay que detenerse y mirar hacia arriba. ✨ #Atardecer #Ciudad #Fotografia',
      permalink: 'https://www.instagram.com/p/Cy7GHIJK789/',
      timestamp: '2023-10-25T21:20:03+0000',
      username: 'explorador_digital',
      media_url: 'https://scontent.cdninstagram.com/v/t51.2885-15/393717440_..._n.jpg?...',
      like_count: 1988,
      comments_count: 98
    }
  ]
};