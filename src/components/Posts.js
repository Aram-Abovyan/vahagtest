import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/slices/posts'




export const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.entities)
  const loadingStatus = useSelector(state => state.posts.status)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPosts(currentPage))
  }, [currentPage, dispatch])

  return (
    <>
      {
        loadingStatus === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <ul>
            <p>page: {currentPage}</p>
            <button
              onClick={() => {
                if (currentPage === 1) return
                setCurrentPage(s => --s)
              }}
            >
              prev page
            </button>
            <button
              onClick={() => {
                if (currentPage === 2) return
                setCurrentPage(s => ++s)
              }}
            >
              next page
            </button>

            {posts.map(({
              id,
              email,
              avatar,
              first_name: firstname
            }) => (
              <li key={id}>
                <p>{firstname}</p>
                <img src={avatar} alt={email} />
              </li>
            ))}
          </ul>
        )
      }
    </>
  )
}