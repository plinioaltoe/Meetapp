import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Checkbox } from './styles'
import api from '../../services/api'

import { Creators as PreferenceActions } from '../../store/ducks/preference'

class PreferencesList extends Component {
  static defaultProps = {
    sentPreferences: [],
  }

  static propTypes = {
    handleChangePreferences: PropTypes.func.isRequired,
    sentPreferences: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props)
    this.state = {
      allIsChecked: false,
      preferences: [],
    }
  }

  checkSentPreferences = (data) => {
    if (!data) return []

    const { sentPreferences } = this.props
    if (!sentPreferences) return data
    const preferences = []
    let isChecked = false

    data.map((pref) => {
      isChecked = false
      const idx = sentPreferences.findIndex(p => p.id === pref.id)
      if (idx > -1) isChecked = true
      return preferences.push({ ...pref, isChecked })
    })

    return preferences
  }

  componentWillMount = async () => {
    const { data } = await api.get('/preferences')
    this.setState({ preferences: this.checkSentPreferences(data) })
  }

  handleCheck = (e, id) => {
    const { handleChangePreferences } = this.props
    const { preferences } = this.state
    const index = preferences.findIndex(p => p.id === id)
    preferences[index].isChecked = !preferences[index].isChecked
    this.setState({ ...preferences })
    handleChangePreferences(preferences)
  }

  handleCheckAll = async () => {
    const { preferences } = this.state
    let { allIsChecked } = this.state
    const { handleChangePreferences } = this.props

    allIsChecked = !allIsChecked
    for (let i = 0; i < preferences.length; i += 1) {
      preferences[i].isChecked = allIsChecked
    }
    this.setState({ preferences, allIsChecked })
    handleChangePreferences(preferences)
  }

  render() {
    const { preferences, allIsChecked } = this.state
    const checkAllText = 'Marque / Desmarque todas'
    return (
      <Container>
        <ul>
          <li>
            <Checkbox
              type="checkbox"
              value={allIsChecked}
              onChange={this.handleCheckAll}
            />
            <div>{checkAllText}</div>
          </li>
          {preferences.map(pref => (
            <li key={pref.id}>
              <Checkbox
                onChange={e => this.handleCheck(e, pref.id)}
                type="checkbox"
                checked={pref.isChecked}
                value={pref.id}
              />
              <div>{pref.subject}</div>
            </li>
          ))}
        </ul>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  preferences: state.preference.data,
})

const mapDispatchToProps = dispatch => bindActionCreators(PreferenceActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferencesList)
