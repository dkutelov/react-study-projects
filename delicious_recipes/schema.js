exports.typeDefs = `
    type Recipe {
        _id: ID
        id: String!
        name: String!
        imageURL: String!
        category: String!
        description: String!
        instructions: String!
        createdDate: String
        likes: Int
        username: String
    }

    type User {
        _id: ID
        username: String!
        password: String!
        email: String!
        joinDate: String
        favorites: [Recipe]
    }

    type Token {
        token: String!
    }

    type Query {
        getAllRecipes: [Recipe]
        getRecipe(id:ID!): Recipe
        getCurrentUser: User
        searchRecipes(searchTerm: String): [Recipe] 
        getUserRecipes(username: String!):  [Recipe]
    }

    type Mutation {
        addRecipe(name: String!, imageURL: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
        deleteUserRecipe(_id: ID): Recipe
        updateRecipe(_id: ID!, name: String!, imageURL: String!, description: String!, category: String!): Recipe
        signinUser(username: String!, password: String!): Token
        signupUser(username: String!, email: String!, password: String!): Token
        handleLike(_id:ID!, username: String!, isLiked: Boolean!): Recipe
    }
`
