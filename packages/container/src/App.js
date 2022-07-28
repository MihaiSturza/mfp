import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from './components/Header';
import Progress from './components/Progress';


const UPLLazy = lazy(() => import('./components/PersonalLoansApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})


export default () => {
    const [isSignin, setIsSignin] = useState(false);
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <Header />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth"><AuthLazy onSignin={() => setIsSignin(true)} /></Route>
                        <Route path="/" component={UPLLazy} />
                    </Switch>
                </Suspense>
            </StylesProvider>
        </BrowserRouter>
    )
}

// trigger rebuild