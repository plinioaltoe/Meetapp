import PropTypes from 'prop-types'

export const propTypes = {
  searchRequest: PropTypes.func.isRequired,
  location: PropTypes.shape({
    location: PropTypes.shape({ pathname: PropTypes.string }),
  }).isRequired,

  signed: PropTypes.shape({
    total: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        eventDate: PropTypes.instanceOf(Date),
        fileUrl: PropTypes.string,
        numMembers: PropTypes.number,
      }),
    ),
  }).isRequired,

  notSigned: PropTypes.shape({
    total: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        eventDate: PropTypes.instanceOf(Date),
        fileUrl: PropTypes.string,
        numMembers: PropTypes.number,
      }),
    ),
  }).isRequired,
  recommended: PropTypes.shape({
    total: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        eventDate: PropTypes.instanceOf(Date),
        fileUrl: PropTypes.string,
        numMembers: PropTypes.number,
      }),
    ),
  }).isRequired,
}
