const renderApp = async () => {
    const [
        { App },
        { BrowserRouter },
        { HelmetProvider },
        { default: ReactDOM },
    ] = await Promise.all([
        import('routes'),
        import('react-router-dom'),
        import('react-helmet-async'),
        import('react-dom'),
    ])

    const main = document.querySelector('main')

    ReactDOM.render(
        <BrowserRouter>
            <HelmetProvider>
                <App/>
            </HelmetProvider>
        </BrowserRouter>,
        main,
    )

    if (module.hot) {
        module.hot.accept(() => {
            const { App } = require('routes')

            ReactDOM.render(
                <BrowserRouter>
                    <HelmetProvider>
                        <App/>
                    </HelmetProvider>
                </BrowserRouter>,
                main,
            )
        })
    }
}

const bootstrap = async () => await Promise.all([renderApp()])

export default bootstrap
