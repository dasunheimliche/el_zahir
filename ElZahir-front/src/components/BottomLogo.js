

const BottomLogo = ({ toFront, innerHeight, isAtTop, scrollToTop, reference})=> {

    return(
        <div style={toFront? {display: 'none'} : {top: `${innerHeight - 30}px`}} className={!isAtTop ? 'logo bottom-logo-on p' : 'bottom-logo-off p'} onClick={()=>scrollToTop(reference)}>Zahir.</div>
    )
}

export default BottomLogo