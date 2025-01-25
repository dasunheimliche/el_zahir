import { Link } from 'react-router-dom';

export default function ZahirLogo() {
  return (
    <Link className="linknostyle" to={`/home`}>
      <div className="logo">Zahir.</div>
    </Link>
  );
}
