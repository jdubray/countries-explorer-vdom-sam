/** @jsx html */

import { html } from 'snabbdom-jsx'


import Map from './map/Map'
import SideBar from './sidebar/SideBar'


const view = <div>
  <section>
    <Map/>
  </section>
  <aside>
    <SideBar/>
  </aside>
</div>

const container = (view) => ({
  render () {
    return view
  }
})

export default container(view)