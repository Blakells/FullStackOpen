import React from 'react'

const LoginForm = ({ handleSubmit }) => {
 return (
   <div>
     <h2>Login</h2>
     <form onSubmit={handleSubmit}>
       <div>
         username
         <input
         id='username'
           name='username'
         />
       </div>
       <div>
         password
         <input
         id='password'
           type="password"
           name='password'
         />
     </div>
       <button type="submit" id='login-button'>login</button>
     </form>
   </div>
 )
}

export default LoginForm