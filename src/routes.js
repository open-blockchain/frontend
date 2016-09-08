import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Stats,
    Charts,
    Block,
    Transaction,
    // Signal,
    NotFound,
  } from 'containers';

export default () => {
  // (store)
  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }
  //
  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="stats" component={Stats}/>
      <Route path="charts" component={Charts}/>
      <Route path="blocks/:id" component={Block}/>
      <Route path="transactions/:id" component={Transaction}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );

  // <Route path="signal/:id" component={Signal}/>
};
