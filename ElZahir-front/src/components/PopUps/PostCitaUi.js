
import { useState }                    from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { postQuote } from "../../services/postServices"
import { doNothing } from "../../services/helpers"

import citaButton from '../../icons/citaButton.png'
import style      from '../../styles/popups.module.css'


const PostCitaUI = ({setPopUp})=> {
    const [author, setAuthor] = useState('')
    const [work,   setWork  ] = useState('')
    const [quote,  setQuote ] = useState('')
    const [loading, setLoading] = useState(false)

    const client   = useQueryClient()

    const {mutate: postMutation} = useMutation({
        mutationFn: async()=> await postQuote(author, work, quote),
        onMutate: ()=>setLoading(true),
        onSuccess: (res)=>{
            client.setQueryData(["userPosts"], (old)=> {
                const copy = {...old}
                copy.data = [res.data, ...copy.data]
                return copy
            })
            close()
        },
        onError: ()=>{
          setLoading(false)
        }
    })

    function submitQuotePostHandler(e){
        e.preventDefault()
        postMutation()
    }

    function close() {
        setAuthor('')
        setWork('')
        setQuote('')
        setLoading(false)
        setPopUp({type: 'none', post: null})
    }

    return (
        <form className={style.popup} onSubmit={loading? doNothing : submitQuotePostHandler}>
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