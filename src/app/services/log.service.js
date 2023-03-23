import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

function init () {
    Sentry.init({
        dsn: 'https://b2a4f8484c31446dacfb672f904eadbc@o942348.ingest.sentry.io/4504876667240448',
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    })
}

function log (error) {
    Sentry.captureException(error)
}

const logger = {init, log}

export default logger
