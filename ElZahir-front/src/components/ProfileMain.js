import Entrada from "./Entrada"
import './ProfileMain.css'
import logo from '../icons/search.png'
import {  useRef, useState } from "react"


const ProfileMain = ({user, salir})=> {
    let [sticky, setSticky] = useState(false)
    let [see, setSee] = useState(false)
    const useref = useRef()
    

    window.addEventListener('scroll', ()=> {
        return (window.scrollY >= 140)? setSticky(true): setSticky(false)
    })

    const notsee = ()=> {
        console.log('NOTSEE')
        setSee(!see)
    }


    return (
        <div className="main-profile">
            <div className="header">
                <div className="header-image"></div>
                <div className={sticky === false? 'header-bar':'header-bar sticky-bar'}  ref={useref}>
                    <div className="header-left">
                        <div className="logo">El Zahir.</div>
                        <div className="header-search">
                            <div className="header-icon-search">
                                <img className='header-icon-img' alt="searchicon" src={logo} />
                            </div>
                            <Entrada type={'text'} pl={'buscar'} className={'header-input'}/>
                        </div>
                    </div>
                    <div className="header-right pointer">
                        <div className="header-user-menu" onClick={notsee}>
                            <div className="header-user">
                                <div className="h-user-logo"></div>
                                <div className="h-user-name">{user}</div>
                            </div>
                            <div className={see? 'header-user-opt': 'header-user-opt notvisible'}>
                                <div>Salir</div>
                                <div>Salir</div>
                                <div className="signoff" onClick={salir}>Salir</div>
                            </div>
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