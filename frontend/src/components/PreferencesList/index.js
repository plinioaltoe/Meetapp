import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Checkbox } from './styles'
import api from '../../services/api'

import { Creators as UserActions } from '../../store/ducks/user'

class PreferencesList extends Component {
  static defaultProps = {
    sentPreferences: [],
  }

  static propTypes = {
    handleChangePreferences: PropTypes.func.isRequired,
    sentPreferences: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      allIsChecked: false,
      preferences: [],
    }
  }

  componentDidMount = async () => {
    const { data } = await api.get('/preferences')
    this.setState({ preferences: data }, this.checkSentPreferences)
  }


  checkSentPreferences = () => {
    const { sentPreferences } = this.props
    const { preferences } = this.state

    const checkedPreferences = []
    let isChecked = false

    preferences.forEach((pref) => {
      isChecked = false
      const idx = sentPreferences.findIndex(p => p.id === pref.id)
      if (idx > -1) isChecked = true
      checkedPreferences.push({ ...pref, isChecked })
    })

    this.setState({ preferences: checkedPreferences })
  }

  handleCheck = (id) => {
    const { handleChangePreferences } = this.props
    const { preferences } = this.state
    const index = preferences.findIndex(p => p.id === id)
    preferences[index].isChecked = !preferences[index].isChecked
    this.setState({ ...preferences, allIsChecked: false })
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
              checked={allIsChecked}
              onChange={this.handleCheckAll}
            />
            <div>{checkAllText}</div>
          </li>
          {preferences.map((pref) => {
            const isChecked = { checked: pref.isChecked ? pref.isChecked : false }
            return (
              <li key={pref.id}>
                <Checkbox
                  onChange={() => this.handleCheck(pref.id)}
                  type="checkbox"
                  {...isChecked}
                />
                <div>{pref.subject}</div>
              </li>
            )
          })}
        </ul>
      </Container>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferencesList)
