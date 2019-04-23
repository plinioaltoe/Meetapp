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
    this.handleSearch({ page: 1, route: 'all' })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handleSearch({ page: 1, route: 'all' })
  }

  handleSearch = ({ page, route }) => {
    const { searchRequest } = this.props
    const { title } = this.state
    searchRequest({
      title,
      page,
      route,
    })
  }

  render() {
    const {
      location, signed, notSigned, recommended,
    } = this.props

    const { title } = this.state
    const searchBar = (
      <Container onSubmit={this.handleSubmit}>
        <button type="submit">
          <i className="fa fa-search" />
        </button>
        <TextField
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
      </Container>
    )

    return (
      <Fragment>
        <Header />
        {location.pathname === '/search' && searchBar}
        <ContainerList>
          <ContentList>
            Inscrições
            <MeetupList list={signed} handlePaginate={this.handleSearch} route="signed" />
          </ContentList>
          <ContentList>
            Próximos Meetups
            <MeetupList
              list={notSigned}
              handlePaginate={this.handleSearch}
              route="notSigned"
            />
          </ContentList>
          <ContentList>
            Recomendados
            <MeetupList
              list={recommended}
              handlePaginate={this.handleSearch}
              route="recommended"
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
