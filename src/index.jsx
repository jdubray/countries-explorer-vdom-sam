/** @jsx html */
import 'babel-polyfill'

import { html } from 'snabbdom-jsx'
import patch from './utils/sanbbdom-patcher'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  const vnode = <App/>
  patch(document.getElementById('root'), vnode)

})







