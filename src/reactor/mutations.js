import fetchCountries from '../resource/countries-data'


export default (data) => ({

  async loadCountries () {
    data.status = {
      ...data.status,
      loaded: false,
      busy: true,
      initial: true
    }
    let response
    try {
      response = await fetchCountries()
      data.allCountries = this.processResponse(response.data)
      data.displayedCountries = [].concat(data.allCountries)
      data.status = {
        ...data.status,
        loaded: true,
        busy: false,
        initial: false
      }
    }
    catch
      (error) {
      data.status = {
        ...data.status,
        loaded: false,
        busy: false,
        hasError: true,
        initial: false,
        error: error
      }
    }
  },

  select (country) {
    data.selectedCountry = country
  },

  unSelect () {
    data.selectedCountry = void 0
  },

  setPictures(photos){
    data.selectedCountry.picturesForCountry=photos.photo
  },

  processResponse (loadedCountries) {
    return loadedCountries.map(country => {
      country.timezones = Array.isArray(country.timezones) ? country.timezones : [country.timezones]
      return country
    })
  },

  filterCountries (filter) {
    if (filter === '') {
      data.displayedCountries = data.allCountries.filter(() => {
        return true
      })
      data.status.filtered = true
      return
    }
    const pattern = new RegExp(`^${filter}`, 'i')
    data.displayedCountries = data.allCountries.filter((country) => country.name.toLowerCase().match(pattern))
    data.status.filtered = true
  },

  sortOnName: (isAscending) => {
    data.displayedCountries = [].concat(data.allCountries).sort((country1, country2) => isAscending ? country1.name.localeCompare(country2.name) : country2.name.localeCompare(country1.name))
    data.sortAscending = isAscending
    data.status.sorted= true
  }

})
