import { AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
    isAuth: string,
    children: JSX.Element
}
export default function PrivateRoute(props: PrivateRouteProps) {
  const { isAuth, children } = props;
  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to='/login'></Navigate>
  );
}
