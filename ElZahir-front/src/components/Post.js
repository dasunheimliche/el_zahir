// import {  useState } from "react"
// import axios from 'axios'
import '../components/post.css'
import quotes from '../images/quotes.png'


const Post = ({post, type})=> {
    
    if (type === "image") {
        return (
            <div className="post-container figure">
                <div className="post-image-content">
                    <img className='img' src={post.imagePost} alt="A windmill" />
                </div>
                <div className="post-sub">
                    <div className='post-sub-header' >
                        <b style={{fontSize:"17px"}}>{post.title}</b> - <i style={{fontSize:"17px"}}>{post.subtitle}</i>
                    </div>
                </div>
            </div>
        )
    }
    if (type === "text") {
        return (
            <div className="post-container figure">
                <div className="post-text-content">
                    <div className='post-text-title'><h3>{post.title}</h3></div>
                    <div className='post-text-text'>{post.textPost}</div>
                </div>
                <div className="post-sub">
                    {/* <div className='post-sub-header'>
                        <b>{post.title}</b>
                    </div> */}
                </div>
            </div>
        )
    }
    if (type === "cita") {
        return (
            <div className="post-container figure">
                <div>
                    <div className="post-cita-content">
                        <div className='post-text-left'>
                            <img className='post-text-comilla-left' src={quotes}></img>
                        </div>
                    
                        <div className='post-cita-text-container'>
                            <div className='post-cita-text'>{post.textPost}</div>
                        </div>
                        <div className='post-text-right'>
                            <img className='post-text-comilla-right' src={quotes}></img>
                        </div>
                    </div>
                    <div className='post-cita-detail'>
                        <b>{post.title}</b> - <i>{post.subtitle}</i>
                    </div>
                </div>

                <div className="post-sub">
                    
                </div>
            </div>
        )
    }
    if (type === "video") {

        const idVideo = post.videoPost.replace('https://www.youtube.com/watch?v=',"")
        const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`
        
        let aspectr = post.videoAr.split(':')
        let width = Number(aspectr[0])
        let height = Number(aspectr[1])
        let ar = (width/height) * 100
        console.log(ar)
        

        // let parser = new DOMParser()

        // axios.get("https://www.youtube.com/oembed?url="+ post.videoPost +"&format=xml")
        //     .then(respuesta => {
        //         let xmlDoc = parser.parseFromString(respuesta.data, "text/xml") 
        //         let width = Number(xmlDoc.getElementsByTagName('width')[0].childNodes[0].textContent)
        //         let height = Number(xmlDoc.getElementsByTagName('height')[0].childNodes[0].textContent)
        //         setAr ((height/width)*100)

                
        //     })

        return (
            <div className="post-container figure">
                <div className='dl'>
                    {/* <div className="post-image-content"> */}
                    <div className="video-container" style={{paddingBottom: `${ar}%`}}>
                        <iframe style={{width: "100%", height:"100%"}} src={urlVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="post-sub">
                    <div className='post-sub-header'>
                        <b style={{fontSize:"17px"}}>{post.title}</b> - <i style={{fontSize:"17px"}}>{post.subtitle}</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post