import React,{useEffect} from "react";
import './article.css'

function Article({sent, text, id}){

    return(
        <p><span className="id">{id}</span>. {text}</p>
    )
}

export default Article;