import React from 'react'
import ReactDOMServer from 'react-dom/server'
import axios from 'axios'

import StateApi from 'state-api'
import config from 'config'

import App from 'components/App'

const serverRender = async () => {
    const { data } = await axios.get(`http://${config.host}:${config.port}/data`)

    const store = new StateApi(data)

    return {
        initialMarkup : ReactDOMServer.renderToString(<App store={store} />),
        initialData   : data
    }
}

export default serverRender
