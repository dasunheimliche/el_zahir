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
            <svg className="svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5"><animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite" /><stop offset="0%" stopColor="rgba(255, 0, 255, 1)" /><stop offset="100%" stopColor="rgba(255, 0, 255, 0)" /></radialGradient>
          <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5"><animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite" /><stop offset="0%" stopColor="rgba(255, 255, 0, 1)" /><stop offset="100%" stopColor="rgba(255, 255, 0, 0)" /></radialGradient>
          <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5"><animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite" /><stop offset="0%" stopColor="rgba(0, 255, 255, 1)" /><stop offset="100%" stopColor="rgba(0, 255, 255, 0)" /></radialGradient>
          <radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5"><animate attributeName="fx" dur="23s" values="0%;5%;0%" repeatCount="indefinite" /><stop offset="0%" stopColor="rgba(0, 255, 0, 1)" /><stop offset="100%" stopColor="rgba(0, 255, 0, 0)" /></radialGradient>
          <radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5"><animate attributeName="fx" dur="24.5s" values="0%;5%;0%" repeatCount="indefinite" /><stop offset="0%" stopColor="rgba(0,0,255, 1)" /><stop offset="100%" stopColor="rgba(0,0,255, 0)" /></radialGradient>
          <radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5"><animate attributeName="fx" dur="25.5s" values="0%;5%;0%" repeatCount="indefinite" /><stop offset="0%" stopColor="rgba(255,0,0, 1)" /><stop offset="100%" stopColor="rgba(255,0,0, 0)" /></radialGradient>
        </defs>
        {/*<rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient4)">
        <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
        <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="17s" repeatCount="indefinite"/>
        </rect>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient5)">
        <animate attributeName="x" dur="23s" values="0%;-25%;0%" repeatCount="indefinite" />
        <animate attributeName="y" dur="24s" values="25%;-25%;25%" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite"/>
        </rect>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient6)">
        <animate attributeName="x" dur="25s" values="-25%;0%;-25%" repeatCount="indefinite" />
        <animate attributeName="y" dur="26s" values="0%;-25%;0%" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="19s" repeatCount="indefinite"/>
        </rect>*/}
        <rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(334.41 50 50)"><animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" /><animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" /><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite" /></rect>
        <rect x="-2.17916%" y="35.4267%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(255.072 50 50)"><animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite" /><animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite" /><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite" />
        </rect>
        <rect x="9.00483%" y="14.5733%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(139.903 50 50)"><animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite" /><animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite" /><animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="9s" repeatCount="indefinite" />
        </rect>
      </svg>
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
                        <div className={!see? 'header-user-menu': 'header-user-menu expanded header-user-menu-s'} onClick={notsee}>
                            <div className="header-user">
                                <div className="h-user-logo"></div>
                                <div className="h-user-name">{user}</div>
                            </div>
                            <div className={see? 'header-user-opt': 'header-user-opt notvisible'}>
                                <span className="signoff" onClick={salir}>Salir</span>
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
                <div className="container">
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/c0b1fbc4b95772f9d2232f06a289b39b/3d0828a6737134a2-98/s1280x1920/2f7b70a1ae5630254ae10ba103f6d6bd1a8f7f24.png" alt="A windmill" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/ea24450a3227e36f5d01072867ef851e/e99b1eca24d9e61e-17/s1280x1920/4792a298f60f0df446c0fa95f12b2d276d3bfeae.png" alt="The Clifton Suspension Bridge" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/d58125de7ab8e8f7a9e30fff6988c61a/eb50b88392f8f38d-87/s1280x1920/756d7cc995ca49d2c96b722e4d9dabf1f4c5008b.png" alt="Sunset and boats" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/71b9342bcb718a14686149fe0d8f6151/5f84eb83e1f932a6-4d/s1280x1920/f59ed48420bf42c0da3e9ffac92091f3fdd4dec5.png" alt="a river in the snow" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/b335a4dfe6ad909704b1f2b6be21480f/71e5dd73b5b8a70a-18/s1280x1920/6951132629dcb74166ac5e8327d8e09b9ad83e73.png" alt="a single checked balloon" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/acde383efe467f33977badf4237add9f/8c2f3cbbf01e6869-37/s1280x1920/28923f27c740ff72af0aeaca1d9b3e70f8981348.png" alt="a hot air balloon shaped like a dog" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/1cc4c385862869e020adfc405a7afd8c/3603633041818959-14/s1280x1920/8248bb4a3e9191f53ee196a26d7a3cc4f07fea60.png" alt="View from a hot air balloon of other balloons" />
                    </figure>
                    <figure>
                        <img className="img" src="https://64.media.tumblr.com/4c2bfe8760a8276d05b2850e160afae6/1611f481d8b2360a-ff/s1280x1920/5aa0894e8651a04e700e0dde30ec16ba85ff1165.png" alt="a balloon fairground ride" />
                    </figure>
            
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMain