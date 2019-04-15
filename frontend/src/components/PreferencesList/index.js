import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Checkbox } from './styles'

import { Creators as PreferenceActions } from '../../store/ducks/preference'

class PreferencesList extends Component {
  static propTypes = {
    handleChangePreferences: PropTypes.func.isRequired,
    getPreferenceRequest: PropTypes.func.isRequired,
    preferences: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        subject: PropTypes.string,
      }),
    ).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      allIsChecked: false,
      preferences: props.preferences,
    }
  }

  componentWillMount = async () => {
    const { getPreferenceRequest } = this.props
    await getPreferenceRequest()
  }

  componentWillReceiveProps = (newProps) => {
    const { preferences } = newProps
    this.setState({ preferences })
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

    allIsChecked = !allIsChecked
    for (let i = 0; i < preferences.length; i += 1) {
      preferences[i].isChecked = allIsChecked
    }
    this.setState({ preferences, allIsChecked })
  }

  render() {
    const { preferences, allIsChecked } = this.state
    const checkAllText = 'Marque / Desmarque todas'
    return (
      <Container>
        <ul>
          <li>
            <Checkbox type="checkbox" value={allIsChecked} onChange={this.handleCheckAll} />
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
