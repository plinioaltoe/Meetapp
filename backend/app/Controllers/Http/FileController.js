'use strict'

const Database = use('Database')
const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async index () {
    const files = await File.query().fetch()

    return files
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      if (!request.file('file')) return
      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      const trx = await Database.beginTransaction()

      await upload.move(
        Helpers.tmpPath('uploads'),
        {
          name: fileName
        },
        trx
      )

      if (!upload.moved()) throw upload.error()

      const file = await File.create(
        {
          file: fileName,
          name: upload.clientName,
          type: upload.type,
          subtype: upload.subtype
        },
        trx
      )

      trx.commit()

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async destroy ({ params }) {
    const file = await File.findOrFail(params.id)

    return file.delete()
  }
}

module.exports = FileController
