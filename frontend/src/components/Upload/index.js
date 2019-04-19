import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/api'

import { Container, Img, Text } from './styles'

export default class Upload extends Component {
  static defaultProps = {
    fileUrl: '',
  }

  static propTypes = {
    handleChangeFile: PropTypes.func.isRequired,
    fileUrl: PropTypes.string,
  }

  state = {
    error: '',
    loading: false,
  }

  upload = async () => {
    this.setState({ loading: true })
    const { handleChangeFile } = this.props
    const file = this.fileInputRef.files[0]
    const dataFile = new FormData()
    await dataFile.append('file', file)
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    }
    try {
      const { data } = await api.post(`/files/`, dataFile, config)
      handleChangeFile({
        fileId: data.id,
        fileUrl: data.url,
      })
      this.setState({ error: '' })
    } catch (error) {
      this.setState({ error: 'Erro ao fazer upload do arquivo!' })
    } finally {
      this.setState({ loading: false })
    }
  }

  handleClickUpload = async () => {
    this.fileInputRef.click()
    this.fileInputRef.addEventListener('change', this.upload)
  }

  fileInputRef

  render() {
    const { fileUrl } = this.props
    const { error, loading } = this.state
    let imgToShow = <i className="fa fa-camera" />
    if (fileUrl) imgToShow = <img src={fileUrl} alt="file" />

    return (
      <Container>
        {Boolean(error) && <p>{error}</p>}
        <Text>Imagem</Text>
        <Img onClick={this.handleClickUpload} htmlFor="file" fileUrl={fileUrl}>
          {loading ? <i className="fa fa-spinner fa-pulse" /> : imgToShow}
          <input
            id="file"
            type="file"
            name="file"
            ref={(input) => {
              this.fileInputRef = input
            }}
          />
        </Img>
      </Container>
    )
  }
}
