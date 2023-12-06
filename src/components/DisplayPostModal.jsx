import React from 'react';

const DisplayPostModal = ({ post, setModalToggle }) => {

    const handleClose = () => {
        setModalToggle(false)
    }
    return (
        <div className="displayPostModalcontainer" onClick={() => handleClose()}>
            <div className='displayPostContainer'>
                <div className='displayPostTitle'>{post.title}</div>
                <div>{post.body}</div>
            </div>
        </div>
    );
};

export default DisplayPostModal;
