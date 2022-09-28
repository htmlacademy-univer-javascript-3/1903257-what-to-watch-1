import { AuthInformation } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
    isAuth: string,
    children: JSX.Element
}
export default function PrivateRoute(props: PrivateRouteProps) {
  const { isAuth, children } = props;
  return (
    isAuth === AuthInformation.Auth
      ? children
      : <Navigate to='/login'></Navigate>
  );
}
