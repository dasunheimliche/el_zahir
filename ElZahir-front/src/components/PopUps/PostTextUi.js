
import { useState }                    from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { postText }  from "../../services/postServices"
import { doNothing } from "../../services/helpers"

import style      from '../../styles/popups.module.css'
import textButton from '../../icons/textButton.png'

const PostTextUI = ({setPopUp})=> {
  const [title,   setTitle   ] = useState('')
  const [text,    setText    ] = useState('')
  const [loading, setLoading ] = useState(false)

  const client   = useQueryClient()

  const {mutate: postMutation} = useMutation({
    mutationFn: async()=> await postText(title, text),
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

  function submitTextPostHandler(e){
    e.preventDefault()
    postMutation()
  }

  function close () {
    setText("")
    setTitle("")
    setLoading("")
    setPopUp({type: 'none', post: null})
  }

  return (
    <form className={style.popup} onSubmit={loading? doNothing : submitTextPostHandler}>
      <div className={style['post-ui-header']}>
          <img className={style['header-img']} src={textButton} alt="text-button"></img>
      </div>
      <div className={style.main}>
          <input  className={`${style.input} ${style.title}`} placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off' required/>
          <textarea  className={`${style.input} ${style['url-textarea']}`} placeholder="Text" onChange={(e)=> setText(e.target.value)} value={text} autoComplete='off' required/>
      </div>
      <div className={style.footer}>
          <div className={style.loading} style={loading? {display: "block"} : {display: "none"}}></div>
          <button className={`${style.button} p`} type="button" onClick={()=>setPopUp({type: 'none', post: null})} >CLOSE</button>
          <button className={`${style.button} p`} type="submit" >POST</button>
      </div>
    </form>
  )
}

export default PostTextUI