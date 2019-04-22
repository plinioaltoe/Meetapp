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
    text: '',
  }

  componentDidMount = () => {
    const { searchRequest } = this.props
    searchRequest()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = this.state
    const { searchRequest } = this.props
    searchRequest(text)
  }

  render() {
    const {
      location, signed, notSigned, recommended,
    } = this.props

    const { text } = this.state
    const searchBar = (
      <Container onSubmit={this.handleSubmit}>
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
            <MeetupList list={signed} />
          </ContentList>
          <ContentList>
            Próximos Meetups
            <MeetupList list={notSigned} />
          </ContentList>
          <ContentList>
            Recomendados
            <MeetupList list={recommended} />
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
