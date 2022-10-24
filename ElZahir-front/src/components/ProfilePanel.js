import PostBox from "../components/PostBox"


const ProfilePanel = ({user, sticky, setSeeOpt, mode})=> {


    return (
        <div className={sticky === false? 'profile-panel':'profile-panel sticky-panel'} >
                        <div className='profile-panel-up'></div>
                        <div className='profile-panel-profile-image'>
                            <div className='profile-panel-down-username'>@{user.username}</div>
                            <div className={mode === 'user'?"profile-panel-down-follow pointer" : console.log()}>Follow</div>
                        </div>
                        <div className='profile-panel-down'>
                            <div className='profile-panel-down-followers'>
                                <div className='followers stat'>
                                    <span className='stat-title'>FOLLOWERS</span>
                                    <span>20.0 K</span>
                                </div>
                                <div className='following stat'>
                                    <span className='stat-title'>FOLLOWING</span>
                                    <span>568</span>
                                </div>
                                <div className='posts stat'>
                                    <span className='stat-title'>POSTS</span>
                                    <span>89</span>
                                </div>
                            </div>
                            {mode === 'user'? <div></div>:<PostBox onClick={setSeeOpt}/>}
                            {/* <PostBox onClick={setSeeOpt}/> */}
                        </div>
                        
                    </div>
    )
}

export default ProfilePanel