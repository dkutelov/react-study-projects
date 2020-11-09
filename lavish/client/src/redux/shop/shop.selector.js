import { createSelector } from "reselect"

const selectShop = state => state.shop

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections =>
    collections
      ? Object.keys(collections).map(
          collectionKey => collections[collectionKey]
        )
      : []
)

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
    // collections.find(
    //   collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    // )
  )

export const selectProduct = (collectionUrlParam, productId) => {
  return createSelector(
    [selectShopCollections],
    collections =>
      collections[collectionUrlParam].items.find(
        product => product.id === Number(productId)
      )
  )
}

export const selectIsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

export const selectAreCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)
