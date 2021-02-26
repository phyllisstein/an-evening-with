import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

whyDidYouRender(React, {
    logOnDifferentValues: true,
    trackAllPureComponents: true,
    trackHooks: true,
})
