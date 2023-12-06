import React from 'react'

const DisplayPost = ({post,setModalToggle,setModalPost}) => {

  const handleClick=()=>{
    setModalToggle(true)
    setModalPost(post)
  }
  return (
    <div className='displayPostContainer' onClick={()=>handleClick()}>
    <div className='displayPostTitle'>{post.title}</div>
    <div>{post.body}</div>
    </div>
  )
}

export default DisplayPost
