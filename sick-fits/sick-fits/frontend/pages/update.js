import UpdateItem from '../components/UpdateItem'

const UpdatePage = ({ query }) => {
	return (
		<div>
			<UpdateItem id={query.id} />
		</div>
	)
}

export default UpdatePage
