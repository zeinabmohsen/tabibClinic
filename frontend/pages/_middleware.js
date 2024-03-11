import { getSession } from 'next-auth/client';

export async function middleware({ req, res }) {
  const session = await getSession({ req });

  if (!session && req.url !== '/login') {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  return NextResponse.next();
}