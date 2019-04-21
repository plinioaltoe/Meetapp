import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MeetupIndividualList from './MeetupIndividualList'

import { Creators as SearchActions } from '../../store/ducks/preference'

import { Container, Content } from './styles'

class MeetupsCompleteLists extends Component {
  static propTypes = {
    signed: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        eventDate: PropTypes.instanceOf(Date),
        fileUrl: PropTypes.string,
        numMembers: PropTypes.number,
      }),
    ).isRequired,
    notSigned: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        eventDate: PropTypes.instanceOf(Date),
        fileUrl: PropTypes.string,
        numMembers: PropTypes.number,
      }),
    ).isRequired,
    recommended: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        eventDate: PropTypes.instanceOf(Date),
        fileUrl: PropTypes.string,
        numMembers: PropTypes.number,
      }),
    ).isRequired,
  }

  state = {}

  render() {
    const { signed, notSigned, recommended } = this.props
    return (
      <Container>
        <Content>
          Inscrições
          <MeetupIndividualList list={signed} />
        </Content>
        <Content>
          Próximos Meetups
          <MeetupIndividualList list={notSigned} />
        </Content>
        <Content>
          Recomendados
          <MeetupIndividualList list={recommended} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('searchstateDetails->', state)
  return {
    signed: state.search.data.signed,
    notSigned: state.search.data.notSigned,
    recommended: state.search.data.recommended,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupsCompleteLists)
