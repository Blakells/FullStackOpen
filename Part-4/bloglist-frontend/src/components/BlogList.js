import React from 'react'
import BlogRow from './BlogRow'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {List} from 'semantic-ui-react'

const BlogList = ({blogs}) => {
    

    return (
        <List selection verticalAlign='middle' size='large'>
      {
        blogs.map(blog => 
          <List.Item key={blog.id}>
            <List.Content>
              <List.Header>
                <BlogRow blog={blog} />
              </List.Header>
            </List.Content>
          </List.Item>
        )
      }
    </List>

    )
}

const mapStateToProps = (state) => {
    return { blogs: state.blogs }
  }
  
  BlogList.propTypes = {
    blogs: PropTypes.array.isRequired
  }
  
  export default connect(mapStateToProps)(BlogList)