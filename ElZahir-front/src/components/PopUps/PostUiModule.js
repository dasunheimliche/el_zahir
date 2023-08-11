import style from '../../styles/popups.module.css'

export function PostUIHeader  ({imageSource}) {

    return(
        <div className={ style['post-ui-header'] }>
            <img className={ style['header-img'] } src={imageSource} alt="post-UI-logo"></img>
        </div>
    )
}

export function MainInput ({value, onChange, placeholder}) {

    return(
        <>
            <input  className={`${style.input} ${style.title}`} placeholder={placeholder} onChange={onChange} value={value} autoComplete='off' required/>
        </>
    )
}

export function SubInput ({value, onChange, placeholder}) {

    return(
        <>
            <input className={`${style.input} ${style.subtitle}`} placeholder={placeholder} onChange={onChange} value={value} autoComplete='off' />
        </>
    )
}

export function TextArea ({ value, onChange }) {

    return(
        <>
            <textarea  className={`${style.input} ${style['url-textarea']}`} placeholder="Text" onChange={onChange} value={value} autoComplete='off' required/>
        </>
    )
}

export function Uploader ({onPasteUrl, onUploadFile, isInputValid, url}) {
    
    return(
        <div className={ style.uploader }>
            <textarea disabled  className={ `${style.input} ${style['file-textarea']}` } style={isInputValid? {color: "red"} : {color: "green"}} placeholder={"File"} value={url} autoComplete='off' required/>
            <div className={ style.options }>
                <button className={ `${style.uploadButton} ${style.clipboard} ` } onClick={onPasteUrl} />
                <label className={ `${style.uploadButton} ${style.upload} ` } >
                    <input className={style.fileInput} type="file" onChange={onUploadFile} />
                </label>
            </div>
        </div>
    )
}

export function Error({error}) {

    return(
        <div>
            {error && <div className={ style.error }>{error}</div>}
        </div>
    )
}

export function PostUiFooter ({onCancel, isPostLoading, isPostButtonDisabled=false}) {

    return(
        <div className={style.footer}>
          {isPostLoading && <div className={style.loading} />}
          <button className={`${style.button} p`} type="button" onClick={onCancel} >CANCEL</button>
          <button className={`${style.button} p`} disabled={isPostLoading || isPostButtonDisabled}>POST</button>
      </div>
    )
} 