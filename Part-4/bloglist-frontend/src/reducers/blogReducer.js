import blogService from '../services/blogs'


export const addBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type:'ADD_BLOG',
            data: newBlog
        })
    }

}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlogVote = (blog) => {
    return async dispatch => {
        const oldBlog = await blogService.getOne(blog)
        const updatedBlog = {
            ...oldBlog,
            upvotes: Number(oldBlog.upvotes) + 1
        }
        console.log(updatedBlog)
        await blogService.update(updatedBlog)
        dispatch({
            type: 'VOTE',
            data: updatedBlog
        })
    }
}

export const showAllBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'SHOW',
            data: blogs
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type:'DELETE',
            data: blog
        })
    }
}


const reducer = (state = [], action) => {
   // console.log('state:', state)
   // console.log('action:', action)
    switch(action.type) {
        case 'ADD_BLOG':
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'VOTE':
            const id = action.data.id
            const blogToUpdate = state.find(n => n.id === id)
            const changedBlog = {
                ...blogToUpdate,
                upvotes: Number(blogToUpdate.upvotes) + 1
            }
            return state.map( s => s.id !== id ? s : changedBlog)
        case 'SHOW':
            return action.data
        case 'DELETE':
            return state.filter(s => s.id !== action.data.id)
        default:
            return state
    }
}

export default reducer