import Entrada from "./Entrada"
import './ProfileMain.css'
import logo from '../icons/search.png'
import { useEffect, useRef, useState } from "react"

const ProfileMain = ({user})=> {
    let [sticky, setSticky] = useState(false)
    const useref = useRef()

   

    window.addEventListener('scroll', ()=> {
        return (window.scrollY >= 140)? setSticky(true): setSticky(false)
    })


    return (
        <div className="main-profile">
            <div className="header">
                <div className="header-image"></div>
                <div className={sticky === false? 'header-bar':'header-bar sticky-bar'}  ref={useref}>
                    <div className="header-left">
                        <div className="logo">El Zahir.</div>
                        <div className="header-search">
                            <div className="header-icon-search">
                                <img className='header-icon-img' src={logo} />
                            </div>
                            <Entrada type={'text'} pl={'buscar'} className={'header-input'}/>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="header-user">
                            <div className="h-user-logo"></div>
                            <div className="h-user-name">{user}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="main-content">
                <div className="main-left">
                    <div className={sticky === false? 'profile-panel':'profile-panel sticky-panel'} >

                    </div>
                </div>
                <div className="main-right">
                    
                </div>
            </div>
        </div>
    )
}

export default ProfileMain