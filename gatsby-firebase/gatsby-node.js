const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const bookTemplate = path.resolve("src/templates/bookTemplate.js")

  const result = await graphql(`
    {
      allBook {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw new Error(result.errors)
  }

  const { allBook } = result.data

  allBook.edges.forEach(book => {
    createPage({
      path: `/book/${book.node.id}`,
      component: bookTemplate,
      context: { bookId: book.node.id },
    })
  })
}
