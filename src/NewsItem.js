import React from 'react'
import './newsitem.css'

const NewsItem = ({title, description, url, urlToImage }) => {
    return (
        <div className='news-app'>
            <div className='news-item'>
                <img className='news-img' src={urlToImage} alt={urlToImage}/>
                <h3><a href={url} target="_blank" rel="noopener noreferrer">{JSON.stringify(title)}</a></h3>
                <p>{JSON.stringify(description)}</p>
            </div>            
        </div>
    )
}

export default NewsItem