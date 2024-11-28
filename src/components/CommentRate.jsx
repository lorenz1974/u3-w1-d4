import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CommentRate extends Component {
  render() {
    return Array.from({ length: this.props.rating }).map((_, i) => (
      <FontAwesomeIcon
        className='ms-1 text-warning fs-6'
        key={i}
        icon='fas fa-star'
      ></FontAwesomeIcon>
    ))
  }
}
export default CommentRate
