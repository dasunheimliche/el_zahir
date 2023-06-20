import axios from "axios"
import { useState } from "react"
import baseURL from '../../services/baseURL'

import { userSlice} from '../../reducers/userSlice'
import { useDispatch} from 'react-redux'

import citaButton from '../../icons/citaButton.png'

// CSS
import style from '../../styles/popups.module.css'

const postQuote = async(author, work, quote, token) => {
    try {
        const config = {
          headers: {
            Authorization: token
          }
        }
        const response = await axios.post(baseURL.concat("/api/post"), {title: author, subtitle: work, textPost: quote, type: 'cita'}, config)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const updateLocalStorage = (postId) => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const updatedUser = {...user, posts: user.posts.concat(postId)}
    window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
    return updatedUser
}

const PostCitaUI = ({setPopUp})=> {
    let [author, setAuthor] = useState('')
    let [work,   setWork  ] = useState('')
    let [quote,  setQuote ] = useState('')

    let [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const postear = async (e, author, work, quote, dispatch) => {
        e.preventDefault()
        setLoading(true)
        try {
            const user = JSON.parse(window.localStorage.getItem('loggedUser'))
            const token = `Bearer ${user.token}`
            const savedPost = await postQuote(author, work, quote, token)
            setAuthor('')
            setWork('')
            setQuote('')
            setLoading(false)
            const updatedUser = updateLocalStorage(savedPost.id)
            dispatch(userSlice.actions.update(updatedUser))
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const doNothing = (e)=> {
        e.preventDefault()
    }

    return (
        <form className={style.popup} onSubmit={loading? doNothing : e=>postear(e, author, work, quote, dispatch)}>
            <div className={style['post-ui-header']}>
                <img className={style['header-img']} src={citaButton} alt="text-button"></img>
            </div>

            <div className={style.main}>
                <input className={`${style.input} ${style.title}`} placeholder="Author" onChange={(e)=> setAuthor(e.target.value)} value={author} autoComplete='off' required/>
                <input className={`${style.input} ${style.subtitle}`} placeholder="Work" onChange={(e)=> setWork(e.target.value)} value={work} autoComplete='off' required/>
                <textarea className={`${style.input} ${style['url-textarea']}`} placeholder="Quote" onChange={(e)=> setQuote(e.target.value)} value={quote} autoComplete='off' required/>
            </div>

            <div className={style.footer}>
                <div className={style.loading} style={loading? {display: "block"} : {display: "none"}}></div>
                <button className={`${style.button} p`} type="button" onClick={()=>setPopUp({type: 'none', post:null})} >CLOSE</button>
                <button className={`${style.button} p`} type="submit"  >POST</button>
            </div>
        </form>
    )
}

export default PostCitaUI