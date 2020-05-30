import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {initializeUsers} from '../reducers/userReducer'

const UserPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


      return (
          <div>
            <h2>Users</h2>
            <table>
              <tr>
                <th>

                </th>
                <td>
                  <strong>blogs created</strong>
                </td>
              </tr>
            {users.map(user => (
                <tr key = {user.id}>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.blogs.length}
                  </td>
                </tr>
              ))}
          </table>
          </div>
      )
}

export default UserPage