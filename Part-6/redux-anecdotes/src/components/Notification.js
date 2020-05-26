import React from 'react'
import { connect} from 'react-redux'

const Notification = (props) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification === '') {
    style = undefined
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification.text}
}

export default connect(
  mapStateToProps, null
)(Notification)