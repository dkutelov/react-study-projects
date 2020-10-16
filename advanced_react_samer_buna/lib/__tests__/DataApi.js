import StateApi from 'state-api'
import { data } from '../testData'

const api = new StateApi(data)

describe('DataApi', () => {
    it('exposes articles as an object', () => {
        const articles = api.getState().articles
        const articleId = data.articles[0].id
        const articleTitle = data.articles[0].title
        //check if object
        expect(articles).toHaveProperty(articleId)
        expect(articles[articleId].title).toBe(articleTitle)
    })

    it('exposes authors as an object', () => {
        const authors = api.getState().authors
        const authorId = data.authors[0].id
        const authorFirstName = data.authors[0].firstName
        //check if object
        expect(authors).toHaveProperty(authorId)
        expect(authors[authorId].firstName).toBe(authorFirstName)
    })
})
