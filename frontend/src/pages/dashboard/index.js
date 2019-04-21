import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import MeetupsCompleteLists from '../../components/MeetupsCompleteLists'
import { Creators as SearchActions } from '../../store/ducks/search'

class Dashboard extends Component {
  static propTypes = {
    searchRequest: PropTypes.func.isRequired,
  }

  state = {}

  componentDidMount = () => {
    const { searchRequest } = this.props
    searchRequest({})
  }

  render() {
    return (
      <Fragment>
        <Header />
        <MeetupsCompleteLists />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('searchstate->', state)
  return {
    meetups: state.search.data,
    loading: state.search.loading,
    error: state.search.error,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
