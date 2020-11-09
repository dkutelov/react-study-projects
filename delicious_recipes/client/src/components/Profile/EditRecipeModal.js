import React from 'react'

const EditRecipeModal = ({
	updateRecipe,
	handleChange,
	closeModal,
	recipe       : { name, imageURL, category, description },
	handleSubmit
}) => (
	<div className="modal modal-open">
		<div className="modal-inner">
			<div className="modal-content">
				<form onSubmit={(event) => handleSubmit(event, updateRecipe)} className="modal-content-inner">
					<h4>Edit Your Recipes</h4>
					<label htmlFor="name">Recipe Name</label>
					<input id="name" type="text" name="name" onChange={handleChange} value={name} />
					<label htmlFor="imageURL">Recipe image</label>
					<input id="imageURL" type="text" name="imageURL" onChange={handleChange} value={imageURL} />
					<label htmlFor="category">Recipe category</label>
					<select id="category" name="category" onChange={handleChange} value={category}>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Dinner">Dinner</option>
						<option value="Snack">Snack</option>
					</select>
					<label htmlFor="description">Recipe description</label>
					<input
						id="description"
						type="text"
						name="description"
						onChange={handleChange}
						value={description}
					/>
					<hr />
					<div className="modal-buttons">
						<button type="submit" className="button-primary">
							Update
						</button>
						<button onClick={closeModal}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</div>
)
export default EditRecipeModal
