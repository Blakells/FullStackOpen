import React from 'react'
import { Header, List } from 'semantic-ui-react'


const User = ({user}) => {
    if (!user ) return null

    return (
        <div>
      <Header as='h2'>{user.name}</Header>
      <Header as='h3'>added blogs</Header>
      {
        user.blogs.length > 0 ?
          <List>
            {
              user.blogs.map(blog =>
                <List.Item key={blog.id}>
                  <List.Icon name='newspaper outline' />
                  <List.Content>{blog.title}</List.Content>
                </List.Item>
              )
            }
          </List>
          : <span>nothing yet!</span>
      }
    </div>
    )
}

export default User