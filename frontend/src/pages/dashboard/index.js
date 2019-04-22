import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header'
import MeetupList from '../../components/MeetupList'
import { Creators as SearchActions } from '../../store/ducks/search'
import { propTypes } from './propTypes'
import {
  TextField, Container, ContainerList, ContentList,
} from './styles'

class Dashboard extends Component {
  static propTypes = propTypes

  state = {
    title: '',
  }

  componentDidMount = () => {
    this.handleSearch()
  }

  handleSearch = (e) => {
    e.preventDefault()
    const { searchRequest } = this.props
    const { title } = this.state
    searchRequest({
      title,
      page: 1,
      shouldSearchSigned: true,
      shouldSearchNotSigned: true,
      shouldSearchRecommended: true,
    })
  }

  handlePaginate = ({
    page,
    shouldSearchSigned,
    shouldSearchNotSigned,
    shouldSearchRecommended,
  }) => {
    const { searchRequest } = this.props
    const { title } = this.state
    searchRequest({
      title,
      page,
      shouldSearchSigned,
      shouldSearchNotSigned,
      shouldSearchRecommended,
    })
  }

  render() {
    const {
      location, signed, notSigned, recommended,
    } = this.props

    const { text } = this.state
    const searchBar = (
      <Container onSubmit={this.handleSearch}>
        <button type="submit">
          <i className="fa fa-search" />
        </button>
        <TextField value={text} onChange={e => this.setState({ text: e.target.value })} />
      </Container>
    )

    return (
      <Fragment>
        <Header />
        {location.pathname === '/search' && searchBar}
        <ContainerList>
          <ContentList>
            Inscrições
            <MeetupList
              list={signed}
              handlePaginate={this.handlePaginate}
              search="signed"
            />
          </ContentList>
          <ContentList>
            Próximos Meetups
            <MeetupList
              list={notSigned}
              handlePaginate={this.handlePaginate}
              search="notSigned"
            />
          </ContentList>
          <ContentList>
            Recomendados
            <MeetupList
              list={recommended}
              handlePaginate={this.handlePaginate}
              search="recommended"
            />
          </ContentList>
        </ContainerList>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  signed: state.search.data.signed,
  notSigned: state.search.data.notSigned,
  recommended: state.search.data.recommended,
})
const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
