import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import * as ArtistActions from '../actions/Artist'
import * as LikedAlbumsActions from '../actions/LikedAlbums'
import Loader from '../components/Loader'
import AlbumInfo from '../components/AlbumInfo'

class ArtistDetailPage extends React.Component {
	static propTypes = {
		ArtistActions: PropTypes.shape({
			searchArtistAlbums: PropTypes.func.isRequired
		}).isRequired,
		artist: PropTypes.shape({
			detail: PropTypes.shape().isRequired,
			albums: PropTypes.arrayOf(PropTypes.shape()).isRequired
		}).isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.any.isRequired
			}).isRequired
		}).isRequired,
		likedAlbums: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired,
		LikedAlbumsActions: PropTypes.shape({
			likedAlbumsChanged: PropTypes.func.isRequired
		}).isRequired
	}

	componentDidMount() {
		const { ArtistActions, match } = this.props
		const id = match.params.id
		ArtistActions.searchArtistAlbums(id)
	}

	render = () => {
		const { artist } = this.props
		const { albums, loading, detail } = artist

		let content = null
		if (loading) {
			content = (
				<Loader />
			)
		} else if (albums) {
			content = map(albums, (album) => {
				return (
					<AlbumInfo album={album} key={`album-${album.collectionId}`} />
				)
			})
		}

		return (
			<div className="page-container">
				<div className="container" style={{ paddingTop: '20px' }}>
					<h1>
						{detail.artistName}
					</h1>
					<div className="row artists-results">
						{content}
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	artist: state.artist,
	likedAlbums: state.likedAlbums
})

const mapDispatchToProps = dispatch => ({
	ArtistActions: bindActionCreators(ArtistActions, dispatch),
	LikedAlbumsActions: bindActionCreators(LikedAlbumsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailPage)
