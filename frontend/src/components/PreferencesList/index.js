import React, { Component } from 'react'

import { Container, Checkbox } from './styles'

export default class PreferencesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIsChecked: false,
      preferences: [
        { id: 1, subject: 'Front', isChecked: false },
        { id: 2, subject: 'apple', isChecked: true },
        { id: 3, subject: 'mango', isChecked: false },
        { id: 4, subject: 'grap', isChecked: true },
      ],
    }
  }

  handleCheck = (e, id) => {
    const { preferences } = this.state
    const index = preferences.findIndex(p => p.id === id)
    preferences[index].isChecked = !preferences[index].isChecked
    this.setState({ ...preferences })
  }

  handleCheckAll = () => {
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
    const checkAllText = 'Marque / Desmarque todas as opções'
    return (
      <Container>
        <ul>
          <li>
            <Checkbox type="checkbox" value={allIsChecked} onChange={this.handleCheckAll} />
            <div>{checkAllText}</div>
          </li>
          {preferences.map(pref => (
            <li>
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
