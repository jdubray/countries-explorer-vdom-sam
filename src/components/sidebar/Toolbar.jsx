/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../utils/sanbbdom-patcher'

import component from '../../core/component'

import reactor from '../../reactor'

const {state, actions} = reactor

const handlers = {
  onFilterChanged: (e) => {
    e && e.stopImmediatePropagation()
    actions.applyFilter(e.target.value)
  },
  onSortChanged: (e) => {
    e && e.stopImmediatePropagation()
    const direction = e.target.className.split(' ')[1]
    const ascending = direction === 'j-asc'
    actions.applySort(ascending)
  }
}

const view = {
  init () {
    this.current = this.create(true, false)
    return this.current
  },
  create: (ascending, isVisible) => (
    <div classNames="sidebar_toolbar"
         class-visible={isVisible}>
      <input classNames="sidebar_search-input"
             type="text"
             name="countryFilter"
             on-keyup={handlers.onFilterChanged}/>
      <i classNames="icon-sort-amount-asc j-asc"
         on-click={handlers.onSortChanged}
         class-active={ascending}/>
      <i classNames="icon-sort-amount-desc j-desc"
         on-click={handlers.onSortChanged}
         class-active={!ascending}/>
    </div>
  ),
  ready: ({isSortAscending}) => view.create(isSortAscending, true),
  display (next) {
    this.current = patch(this.current, next)
  }
}

const observer = (model) => {
  if (state.ready(model) && !state.wasSorted(model)) {
    view.display(view.ready(model))
  }

  if (state.wasSorted(model)) {
    view.display(view.ready(model))
  }
}

export default component({state, handlers, view, observer})





