import { Component } from 'react'
import { Row, Spinner, Alert } from 'react-bootstrap'
import SingleBook from './SingleBook'

class BookList extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }

  getComments = () => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDYyMDhhZDEyOTAwMTU4NzZiYzEiLCJpYXQiOjE3MzE2NTkyOTcsImV4cCI6MTczMjg2ODg5N30.jEpwONMXP3MP7pYQrrV_JAv-QZWy3LHpV6EI5_vNywc',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore nella "response"')
        }
      })
      .then((arrayOfComments) => {
        console.log('arrayOfComments', arrayOfComments)
        this.setState({
          comments: arrayOfComments,
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          isLoading: false,
          isError: true,
        })
      })
  }

  componentDidMount = () => {
    this.getComments()
  }

  render() {
    return (
      <>
        {this.state.isLoading && (
          <Spinner animation='border' variant='primary' />
        )}
        {this.state.isError && (
          <Alert variant='danger'>Errore nel caricamento dei commenti</Alert>
        )}

        <Row className='row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xxl-5 mt-1'>
          {this.props.booksArray
            .filter((book) => {
              if (this.props.searchTerms && this.props.search) {
                return (
                  book.title
                    .toLowerCase()
                    .includes(this.props.searchTerms.toLowerCase()) ||
                  book.asin
                    .toLowerCase()
                    .includes(this.props.searchTerms.toLowerCase())
                )
              }
              return book.category === this.props.category
            })
            .map((book) => (
              <SingleBook
                key={book.asin}
                book={book}
                setModalShow={this.props.setModalShow}
                selectedBooks={this.props.selectedBooks}
                setSelectedBooks={this.props.setSelectedBooks}
                comments={this.state.comments.filter(
                  (bookComments) =>
                    String(book.asin) === String(bookComments.elementId)
                )}
              />
            ))}
        </Row>
      </>
    )
  }
}

export default BookList
