import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-action';
import LogoButton from '../../components/logo-button/logo-button';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-data/selectors';


export default function LoginPage() {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (data: AuthData) => {
    dispatch(loginAction(data));
  };
  const checkEmail = (email: string): boolean => {
    const result = /\S+@\S+\.\S+/.test(email);
    setIsInvalidEmail(!result);

    return result;
  };

  const checkPassword = (password: string): boolean => {
    const result = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{2,}/.test(password);
    setIsInvalidPassword(!result);

    return result;
  };

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">

      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <LogoButton isLightVersion={false} />
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" >
            {
              isInvalidEmail &&
            <div className="sign-in__message">
              <p>Please enter a valid email address</p>
            </div>
            }
            {
              isInvalidPassword &&
            <div className="sign-in__message">
              <p>Please enter a valid password</p>
            </div>
            }

            <div className="sign-in__fields">
              <div className={`sign-in__field ${isInvalidEmail && 'sign-in__field--error'}`}>
                <input className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={emailRef}
                  onChange={() => setIsInvalidEmail(false)}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={`sign-in__field ${isInvalidPassword && 'sign-in__field--error'}`}>
                <input className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={passRef}
                  onChange={() => setIsInvalidPassword(false)}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" onClick={(evt) => {
                evt.preventDefault();

                if (emailRef.current !== null
                  && checkEmail(emailRef.current?.value)
                  && passRef.current !== null
                  && checkPassword(passRef.current?.value)) {
                  onSubmit({
                    email: emailRef.current.value,
                    password: passRef.current.value,
                  });
                }
              }}
              >Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <LogoButton isLightVersion />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
