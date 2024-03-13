import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session, "session");

  if (!session) {
    // Redirect to login page if not logged in
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  const router = useRouter();
  const { page } = router.query;

  if (page) {
    // Redirect to the specified page if logged in and page is provided
    res.writeHead(302, { Location: `/${page}` });
    res.end();
    return;
  }

  // Redirect to the calendar page if logged in and no page is provided
  res.writeHead(302, { Location: '/calendar' });
  res.end();
}