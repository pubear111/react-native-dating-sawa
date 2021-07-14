import React from 'react'

export const FilterContext = React.createContext()

export default class Filter extends React.Component {
    constructor(props) {
        super(props)

        const initialFilters = {
            limitDistance: true,
            limitCountry: false,
            visiblePhotos: false,
            distance: 40,
            ageRange: [22, 35],
            height: {position: 0, data: ''},
            education: {id: -1, name: ''},
            work: {id: -1, name: ''},
            religion: {id: -1, name: ''},
            country: {id: -1, name: 'All Countries'},
            origin: {id: -1, name: 'All Countries'},
        }

        let heights = []
        for (let i = 165; i < 215; i++) heights.push({label: i + ' cm', value: i})

        this.state = {
            initialFilters,
            heights,
            ...initialFilters

        }
    }

    render() {
        return (
            <FilterContext.Provider value={{
                state: this.state,
                toggleLimitDistance: this.toggleLimitDistance,
                toggleLimitCountry: this.toggleLimitCountry,
                toggleVisiblePhotos: this.toggleVisiblePhotos,
                setDistance: this.setDistance,
                setAgeRange: this.setAgeRange,
                resetFilters: this.resetFilters,
                setEducation: this.setEducation,
                setReligion: this.setReligion,
                setWork: this.setWork,
                setHeight: this.setHeight,
                setCountry: this.setCountry,
                setOrigin: this.setOrigin,
                setFilters: this.setFilters,
            }}>
                {this.props.children}
            </FilterContext.Provider>
        )
    }

    toggleLimitDistance = (limitDistance = undefined) => {
        const limitDistanceValue = typeof limitDistance === 'boolean' ? limitDistance : !this.state.limitDistance
        this.setState({limitDistance: limitDistanceValue, limitCountry: !limitDistanceValue})
    }

    toggleLimitCountry = (limitCountry = undefined) => {
        const limitCountryValue = typeof limitCountry === 'boolean' ? limitCountry : !this.state.limitCountry
        this.setState({limitCountry: limitCountryValue, limitDistance: !limitCountryValue})
    }

    toggleVisiblePhotos = (visiblePhotos = undefined) => {
        this.setState({visiblePhotos: typeof visiblePhotos === 'boolean' ? visiblePhotos : !this.state.visiblePhotos})
    }

    setDistance = (distance) => {
        this.setState({distance})
    }

    setAgeRange = (ageRange) => {
        this.setState({ageRange})
    }

    resetFilters = () => {
        this.setState({...this.state.initialFilters})
    }

    setEducation = (education) => {
        this.setState({education})
    }

    setReligion = (religion) => {
        this.setState({religion})
    }

    setWork = (work) => {
        this.setState({work})
    }

    setHeight = (height) => {
        this.setState({height})
    }

    setCountry = (country) => {
        this.setState({country})
    }

    setOrigin = (origin) => {
        this.setState({origin})
    }

    setFilters = (filter) => {
        this.setState(filter)
    }


}