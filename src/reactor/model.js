import Type from 'union-type'

import createMutations from './mutations'

export const Proposals = Type({
  Load: [],
  SelectCountry: [Object],
  UnSelectCountry: [],
  Filter: [String],
  Sort: [Boolean],
  Pictures: [Object],
  PicturesError: [Object]
})

export const createModel = (createMutations) => {
    let state

    const data = {
      allCountries: [],
      displayedCountries: [],
      selectedCountry: void 0,
      status: {
        initial: true,
        busy: false,
        loaded: false,
        hasError: false,
        error: '',
        filtered: false,
      }
    }

    const mutations = createMutations(data)
    return {

      set state (value) {
        state = value
      },

      get status () {
        return data.status
      },

      get countries () {
        return data.displayedCountries
      },

      get isSortAscending () {
        return data.sortAscending
      },

      get selectedCountry () {
        return data.selectedCountry
      },

      get pictures () {
        return data.picturesForCountry
      },

      receive (proposal) {
        const self = this

        Proposals.case({
          Load: () => mutations.loadCountries().finally(() => {
            state.notifyChange(self)
          }),
          SelectCountry: (country) => mutations.select(country),
          UnSelectCountry: () => mutations.unSelect(),
          Filter: (filter) => mutations.filterCountries(filter),
          Sort: (isAscending) => mutations.sortOnName(isAscending),
          Pictures: (data) => mutations.setPictures(data.photos)
        }, proposal)

        state.notifyChange(this)

      }
    }

  }

export default createModel(createMutations)





    

