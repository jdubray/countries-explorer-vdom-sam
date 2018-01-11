/** @jsx html */
import { html } from 'snabbdom-jsx'

import component from '../../core/component'
import { mapStyle, markerIcon } from './map-styles'
import reactor from '../../reactor'


const {state, actions} = reactor

const handlers = {
  onMarkerClicked: (country) => {
    actions.unSelect()
    actions.select(country)
  },
  onMapReady: () => {
    actions.load()
  }
}

const view = ({
  init () {
    this.current = this.create()
    this.configureMap()
    return this.current
  },
  configureMap () {
    this.mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(10, 8),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true,
      styles: mapStyle
    }
    const self = this
    google.maps.event.addDomListener(window, 'load', () => {
      self.map = new google.maps.Map(document.getElementById('map'), self.mapOptions)
      handlers.onMapReady()
    })
  },
  create: () => <div classNames="map">
    <div id="map"
         classNames="map_content"/>
  </div>,
  ready ({countries}) {
    this.map.setZoom(this.mapOptions.zoom)
    this.map.setCenter(this.mapOptions.center)
    this.markers && this.removeMarkers()
    this.layoutMarkers(countries, void 0)
  },

  layoutMarkers (countries, selectedCountry) {
    const self = this
    this.markers = countries.map(country => {
      const isCustom = selectedCountry === void 0 || country.latlng !== selectedCountry.latlng
      const marker = this.createMarker(self.map, country.latlng, isCustom)
      this.addMarkerClickListener(marker, country)
      return marker
    })
  },
  createMarker (map, latlng, isCustom) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(latlng[0], latlng[1]),
      map: map,
      icon: isCustom ? markerIcon : null
    })
  },

  addMarkerClickListener (marker, country) {
    marker.addListener('click', () => {
      handlers.onMarkerClicked(country)
    })
  },

  removeMarkers () {
    this.markers.forEach(marker => marker.setMap(null))
  },

  focusOnCountry ({countries, selectedCountry}) {
    this.removeMarkers()
    this.layoutMarkers(countries, selectedCountry)
    this.map.setCenter(new google.maps.LatLng(selectedCountry.latlng[0], selectedCountry.latlng[1]))
    this.map.setZoom(5)
  }
})

const observer = (model) => {
  if ((state.ready(model) && !state.countrySelected(model))) {
    view.ready(model)
  }

  if (state.countrySelected(model)) {
    view.focusOnCountry(model)
  }
}

export default component({state, handlers, view, observer})





