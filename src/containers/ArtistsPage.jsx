import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { map, debounce } from 'lodash'

import * as SearchArtists from '../actions/SearchArtists'
import SearchInput from '../components/Atoms/SearchInput'
import Loader from '../components/Loader'

import { history } from '../utils/history'
import { ARTIST_DETAIL, setRouteParams } from '../utils/routes'

class ArtistsPage extends React.Component {
	static propTypes = {
		t: PropTypes.func.isRequired,
		ArtistsActions: PropTypes.shape({
			searchArtists: PropTypes.func.isRequired
		}).isRequired,
		artists: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired
	}

	searchInputChange = (value) => {
		this.props.ArtistsActions.searchArtists(value)
	}

	visitArtistDetail = (artistId) => {
		history.push(setRouteParams(ARTIST_DETAIL, artistId))
	}

	render = () => {
		const { artists } = this.props
		const { data, loading } = artists

		let content = null
		if (loading) {
			content = (
				<Loader size="big" />
			)
		} else if (data) {
			content = map(data, (artist) => {
				return (
					<div
						key={`artist-${artist.artistId}`}
						className="col-md-6 col-sm-12 artist-list"
						onClick={() => this.visitArtistDetail(artist.artistId)}
					>
						<div className="well">
							<h3>{artist.artistName}</h3>
						</div>
					</div>
				)
			})
		}

		return (
			<div className="page-container">
				<div className="container" style={{ paddingTop: '20px' }}>
					<SearchInput
						onChange={debounce(this.searchInputChange, 300)}
					/>
					<div className="row artists-results">
						{content}
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	artists: state.artists
})

const mapDispatchToProps = dispatch => ({
	ArtistsActions: bindActionCreators(SearchArtists, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage)
