import '../styles/globals.css';

import { useEffect } from 'react';

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from '@clerk/nextjs';
import { type AppType } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { env } from '../../../../env.mjs';

import { AppWrapper } from '../components/AppWrapper';
import { api, setToken } from '../helpers/api';

const publicPages = ['/sign-in/[[...index]]', '/sign-up/[[...index]]'];

type PropsType = {
  children: any;
};
function Authentication({ children }: PropsType) {
  const { getToken } = useAuth();
  useEffect(() => {
    getToken()
      .then((token) => {
        console.log('#token-set', token);
        if (!token) return;
        setToken(token);
      })
      .catch(console.log);
  }, [getToken]);

  return children;
}

const MyApp: AppType<{ session: null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ClerkProvider
        signInUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        signUpUrl={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
        publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        afterSignUpUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
        afterSignInUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
        {...pageProps}
      >
        {isPublicPage ? (
          <AppWrapper>
            <Authentication>
              <Component {...pageProps} />
            </Authentication>
          </AppWrapper>
        ) : (
          <>
            <SignedIn>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
