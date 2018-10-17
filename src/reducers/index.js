import {
	persistReducer
} from 'redux-persist'
import {
	combineReducers
} from 'redux'
import storageLocal from 'redux-persist/lib/storage'

import artists from './artists'
import artist from './artist'
import likedAlbums from './likedAlbums'

export const REDUCER_KEYS = {
	ARTISTS: 'artists',
	ARTIST: 'artist',
	LIKED_ALBUMS: 'likedAlbums'
}

const rootReducer = combineReducers({
	artists: persistReducer({
		key: REDUCER_KEYS.ARTISTS,
		storage: storageLocal
	}, artists),
	artist: persistReducer({
		key: REDUCER_KEYS.ARTIST,
		storage: storageLocal
	}, artist),
	likedAlbums: persistReducer({
		key: REDUCER_KEYS.LIKED_ALBUMS,
		storage: storageLocal
	}, likedAlbums),
})

export default rootReducer
