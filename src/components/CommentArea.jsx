import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CommentArea extends Component {
  render() {
    return (
      <div className='comment-area'>
        <h4>Commenti</h4>
        <ul>
          {this.props.comments.map((comment, index) => {
            return (
              <li key={index}>
                <p>
                  <span className='fw-bold'>Autore: </span>
                  {comment.author}
                </p>
                <p>
                  <span className='fw-bold'>Commento:</span>
                </p>
                <p className='bg-tertiary '>
                  <em>{comment.comment}</em>
                </p>
                <p>
                  <span className='fw-bold'>Rating:</span>
                  {Array.from({ length: comment.rate }).map((_, i) => (
                    <FontAwesomeIcon
                      className='ms-1 text-warning fs-6'
                      key={i}
                      icon='fas fa-star'
                    ></FontAwesomeIcon>
                  ))}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default CommentArea
