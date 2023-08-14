
import useInnerHeight  from '../hooks/userInnerHeight';
import { scrollToTop } from '../services/helpers'


const BottomLogo = ({ toFront, isAtTop, reference})=> {

    const innerHeight = useInnerHeight()


    return(
        <div style={toFront? {display: 'none'} : {top: `${innerHeight - 30}px`}} className={!isAtTop ? 'logo bottom-logo-on p' : 'bottom-logo-off p'} onClick={()=>scrollToTop(reference)}>Zahir.</div>
    )
}

export default BottomLogo