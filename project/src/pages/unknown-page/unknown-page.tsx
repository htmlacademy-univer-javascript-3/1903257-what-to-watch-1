import { Link } from 'react-router-dom';

export default function UnknownPage() {
  return (
    <div className="container">
      Error 404: Page not found <br></br>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
