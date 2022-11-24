import {Link} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { logoutAction } from '../../store/api-action';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.avatar);
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  if (authStatus !== AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link
            className="user-block__link"
            to={`${'/login'}`}
          >
            Login
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatar || ''} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <Link
          className="user-block__link"
          to="/"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}

export default UserBlock;
