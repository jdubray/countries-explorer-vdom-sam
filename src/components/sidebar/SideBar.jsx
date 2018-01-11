/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../utils/sanbbdom-patcher'

import component from '../../core/component'
import List from './List'
import ToolBar from './Toolbar'
import Details from './Details'
import reactor from '../../reactor'



const {state} = reactor

const handlers = {
  onTogglerClicked: () => {
    view.isCollapsed = !view.isCollapsed
    view.display(view.create(view.isDetailsVisible, view.isCollapsed))
  }
}

const view = {
  isCollapsed: false,
  isDetailsVisible: false,
  init () {
    this.current = this.list()
    return this.current
  },
  create: (isDetailsVisible, isCollapsed) =>
    <nav classNames="sidebar"
         class-collapsed={isCollapsed}>
      <div classNames="sidebar_mask">
      </div>
      <div classNames="sidebar_toggler">
        <i className={isCollapsed ? 'icon-three-bars' : 'icon-x'}
           on-click={handlers.onTogglerClicked}/>
      </div>
      <div classNames="sidebar_content-mask">
        <div class-details={isDetailsVisible}
             classNames="sidebar_content">
          <div classNames="sidebar_details-wrapper">
            <Details/>
          </div>
          <div classNames="sidebar_list-wrapper">
            <ToolBar/>
            <List />
          </div>
        </div>
      </div>
    </nav>,
  list: () => view.create(view.isDetailsVisible, view.isCollapsed),
  details: () => view.create(view.isDetailsVisible, view.isCollapsed),
  display (next) {
    this.current = patch(this.current, next)
  }
}

const observer = (model) => {
  let nextView
  if (state.countrySelected(model)) {
    view.isDetailsVisible = true
    nextView = view.details()
  }
  if (!state.countrySelected(model)) {
    view.isDetailsVisible = false
    nextView = view.list()
  }
  nextView && view.display(nextView)
}

export default component({state, handlers, view, observer})

