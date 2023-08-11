
import style from '../../styles/comments.module.css'

export function CommentsHeader ({onCloseComments}) {
    return(
        <div className={style.header}>
            <div className={style.close} onClick={onCloseComments} />
        </div>
    )
    
} 

export function CommentsCounter ({comments}) {
    return(
        <div className={style.counter}>
            <span className={style.title}>Comments  </span>
            <span className={style.count}>{comments?.length}</span>
        </div>
    )
}

export function CommentInput ({userInput, isMutating, placeholder, onSubmitComment, onCancelComment, onTyping}) {

    return(
        <form className={style['input-container']} onSubmit={onSubmitComment}>
            <div className={style.testear} >
                {(placeholder || userInput !== '') && <div className={placeholder || userInput !== '' ? style.cancel : `${style.cancel} ${style['cancel-off']}` } onClick={onCancelComment}></div> }

                <input className={placeholder || userInput !== ''? style.input : `${style.input} ${style['input-off']}` } value={userInput} type={'text'} placeholder={placeholder === ''? 'comenta algo...' : placeholder} onChange={onTyping} />
            </div>
            <button className={style.send} disabled={isMutating}>SEND</button>
        </form>
    )
}

