import {Link} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { getAvatarURL } from '../services/avatar';
function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getAvatarURL);
  const authStatus = useAppSelector(getAuthorizationStatus);

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
          <Link to="/mylist">
            <img src={avatar || ''} alt="User avatar" width="63" height="63"/>
          </Link>
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
