import React from 'react'
import { Link } from 'react-router-dom'
import posed from 'react-pose'

const RecipeItemLi = posed.li({
	shown  : { opacity: 1 },
	hidden : { opacity: 0 }
})

const RecipeItem = ({ id, name, imageURL, category }) => {
	return (
		<RecipeItemLi style={{ background: `url(${imageURL}) center center / cover no-repeat` }} className="card">
			<span className={category}>{category}</span>
			<div className="card-text">
				<Link to={`/recipe/${id}`}>
					<h4>{name}</h4>
				</Link>
			</div>
		</RecipeItemLi>
	)
}

export default RecipeItem
