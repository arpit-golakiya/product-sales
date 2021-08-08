import React from 'react'
import '@shopify/polaris/dist/styles.css'
import ReactDOM from 'react-dom'
import {AppProvider, Frame} from '@shopify/polaris';
import {Provider} from '@shopify/app-bridge-react';
import Menu from "./routes/Menu";
import Content from "./Components/Content";
import {BrowserRouter as Router} from "react-router-dom";
import '../css/App.css';

export default function ShopifyApp() {

    const config = {
        apiKey : document.getElementById("apiKey").value,
        shopOrigin : document.getElementById("shopOrigin").value,
        host: document.getElementById("shopify_host").value,
        forceRedirect : true
    };

    return(
        <AppProvider
            i18n={{
                Polaris: {
                    Frame: {
                        skipToContent: 'Skip to content',
                    },
                    ContextualSaveBar: {
                        save: 'Save',
                        discard: 'Discard',
                    },
                },
            }}
            features={{newDesignLanguage: true}}
        >
            <Provider config={config}>
                <Frame>
                    <Router>
                        <Menu />
                        <Content />
                    </Router>
                </Frame>
            </Provider>

        </AppProvider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<ShopifyApp />, document.getElementById("app"));
}
