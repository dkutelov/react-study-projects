import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import styled from 'styled-components'
import Head from 'next/head'

const SingleItemStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${(props) => props.theme.bs};
	display: grid;
	grid-auto-columns: 2fr auto;
	grid-auto-flow: column;
	min-height: 800px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.details {
		margin: 3rem;
		font-style: 2rem;
	}
`

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			largeImage
		}
	}
`

export class SingleItem extends Component {
	render () {
		return (
			<Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					console.log(error)
					if (error) return <Error error={error} />
					if (loading) return <p>Loading ...</p>
					if (!data.item) return <p>No item found for {this.props.id}</p>
					const item = data.item
					return (
						<SingleItemStyles>
							<Head>
								<title>Sick Fits | {item.title}</title>
							</Head>
							<img src={item.largeImage} alt={item.tittle} />
							<div className="details">
								<h2>Viewing</h2>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						</SingleItemStyles>
					)
				}}
			</Query>
		)
	}
}

export default SingleItem
