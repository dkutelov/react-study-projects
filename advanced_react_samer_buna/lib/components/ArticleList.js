import React from 'react'
import Article from './Article'

const ArticleList = ({ articles }) => {
    return (
        <React.Fragment>
            {Object.values(articles).map((article) => <Article key={article.id} article={article} />)}
        </React.Fragment>
    )
}

export default ArticleList
