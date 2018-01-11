/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../utils/sanbbdom-patcher'

import component from '../../core/component'
import ListItem from './ListItem'
import reactor from '../../reactor'


const {state, actions} = reactor

const handlers = {
  onCountrySelected (country) {
    actions.select(country)
  }
}

const countriesItems = (countries) => countries.map(country => <ListItem country={country}
                                                                         onItemSelected={handlers.onCountrySelected}/>)

const view = {
  init () {
    this.current = this.waiting()
    return this.current
  },
  create: (child) => (
    <ul classNames="sidebar_list">{child}</ul>
  ),
  error: () => view.create(<h2>Loading error</h2>),
  waiting: () => view.create(<div className="spinner"/>),
  ready: ({countries}) => view.create(countriesItems(countries)),
  display (next) {
    this.current = patch(this.current, next)
  }
}

const observer = (model) => {
  let nextView

  if (state.initial(model) || state.busy(model)) {
    nextView = view.waiting()
  }

  if (state.ready(model)) {
    nextView = view.ready(model)
  }

  if (state.wasFiltered(model)) {
    nextView = view.ready(model)
  }
  if (state.wasSorted(model)) {
    nextView = view.ready(model)
  }
  view.display(nextView)
}

export default component({state, handlers, view, observer})











