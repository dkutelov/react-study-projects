export default class StateApi {
    constructor (rawData) {
        this.data = {
            articles   : this.mapIntoObject(rawData.articles),
            authors    : this.mapIntoObject(rawData.authors),
            searchTerm : ''
        }
        this.subscriptions = {}
        this.lastSubscriptionId = 0
    }

    mapIntoObject (arr) {
        return arr.reduce((acc, item) => {
            acc[item.id] = item
            return acc
        }, {})
    }

	lookupAuthor = (authorId) => {
	    return this.data.authors[authorId]
	}

	getState = () => {
	    return this.data
	}

	// cb - callback
	subscribe = (cb) => {
	    this.lastSubscriptionId++
	    this.subscriptions[this.lastSubscriptionId] = cb
	    return this.lastSubscriptionId
	}

	unsubscribe = (subscriptionId) => {
	    delete this.subscriptions[subscriptionId]
	}

	notifySubscribers = () => {
	    Object.values(this.subscriptions).forEach((cb) => cb())
	}

	mergeWithState = (stateChange) => {
	    this.data = {
	        ...this.data,
	        ...stateChange
	    }
	    this.notifySubscribers()
	}

	setSearchTerm = (searchTerm) => {
	    this.mergeWithState({ searchTerm })
	}
}
