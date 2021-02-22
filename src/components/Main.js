import React from 'react'
import {useState} from 'react'

const Main = () => {
    const [imgUrl, setUrl] = useState('')
    const [userInfo, setUserInfo] = useState({
        email: '',
        username: '',
        password: ''
    })

    return <div className='main'>
        This is the Main Component!
        <input
            value={userInfo.username}
            onChange={e => setUserInfo({...userInfo, username: e.target.value})}
        />
        <input
            value={imgUrl}
            onChange={e => setUrl(e.target.value)}
        />
        <h1>{userInfo.username} {imgUrl}</h1>
    </div>
}

export default Main