
const PostText = ({className, onClick})=> {

    return (
        <div  className={className}>
            <div>HOLA</div>
            <button onClick={onClick('none')}>CERRAR TEXT</button>
        </div>
    )
}

export default PostText