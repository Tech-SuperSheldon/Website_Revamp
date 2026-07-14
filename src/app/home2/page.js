// The /home2 design is now the canonical homepage at "/".
// Redirect any old /home2 links to the root so there is a single homepage URL.
import { redirect } from 'next/navigation';

export default function Home2Redirect() {
  redirect('/');
}
