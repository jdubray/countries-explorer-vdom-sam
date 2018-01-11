/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../utils/sanbbdom-patcher'

import component from '../../core/component'
import reactor from '../../reactor'


const {state} = reactor

const url = (photo) => {
  const {farm, server, id, secret} = photo
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
}

const photosItems = (country) => country.picturesForCountry.map(photo =>
  <li key={photo.id}>
    <img src={url(photo)}
         classNames="sidebar_photo"/>
  </li>)

const view = {
  init () {
    this.current = this.empty()
    return this.current
  },
  create: (country) => <ul classNames="sidebar_photo-list">
    {photosItems(country)}
  </ul>,
  empty: () => <div></div>,
  display (next) {
    this.current = patch(this.current, next)
  }
}

const observer = (model) => {
  if (!state.countrySelected(model)) {
    view.display(view.empty())
  }
  if (state.countrySelected(model) && state.hasPictures(model)) {
    view.display(view.create(model.selectedCountry))
  }
}

export default component({state, view, observer})


