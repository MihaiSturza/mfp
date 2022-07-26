import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignin }) => {
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            },
            initialPath: history.location.pathname,
            onSignin: () => {
                onSignin()
            }
        })

        history.listen(onParentNavigate)

    }, [])
    return (
        <div ref={ref} />
    )
}