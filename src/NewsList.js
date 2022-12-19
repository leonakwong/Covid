import React, { useState, useEffect} from 'react'
import axios from 'axios'
import NewsItem from './NewsItem'

const NewsList = () => {
    const [articles, setArticles] = useState([])
    
    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?q=COVID-19&from=2022-12-19?category=science&apiKey=570dea4467c847d4b4f8277f1a7c4e18'
            )
            console.log(response.data.articles)
            setArticles(response.data.articles)
        }
        getArticles()
    }, [])
    return (
        <div>
            {articles.map(article => {
                return (
                    <NewsItem
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage}
                    />
                )
            })}
        </div>
    );
}

export default NewsList
