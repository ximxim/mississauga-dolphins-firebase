import React, { Component } from 'react';
import { getStore } from '../redux/store';

import SignIn from '../routes/signin';
import { requestSignOut, requestLoginSuccess } from '../redux/modules/AuthUser';
import { getClient } from './firebase';
import { MainNav } from '../components';

export default function requiresAuth(Comp) {
  return class Auth extends Component {
        state = {
          isOpen: false,
        };

        render() {
          const store = getStore();
          const fClient = getClient();
          const state = store.getState();

          if (!state.authUser.uid) {
            fClient.auth().onAuthStateChanged((user) => {
              if (user && !state.authUser.loading) { store.dispatch(requestLoginSuccess(user)); }
            });

            return <SignIn />;
          } else {
            return (
                <MainNav signOut={this.signOut}>
                    <Comp {...this.props} />
                </MainNav>
            );
          }
        }

        signOut = () => {
          const store = getStore();
          store.dispatch(requestSignOut());
        };
  };
}
