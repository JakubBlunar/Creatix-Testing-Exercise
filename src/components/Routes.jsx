import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
	TransitionGroup,
	CSSTransition
} from 'react-transition-group'

import {
	INDEX,
	ARTISTS,
	ARTIST_DETAIL
} from '../utils/routes'
import { has } from 'lodash'

import LikedAlbumsPage from '../containers/LikedAlbumsPage'
import ArtistsPage from '../containers/ArtistsPage'
import ArtistDetailPage from '../containers/ArtistDetailPage'
import Header from './Header'

class Routes extends Component {
	static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.any
		}).isRequired,
		authActions: PropTypes.shape({
			logoutUser: PropTypes.func.isRequired
		}).isRequired
	}

	state = {
		inited: false
	}

	constructor(props) {
		super(props)

		axios.interceptors.response.use(
			response => response,
			this.reponseErrorHandler
		)
	}

	// axios global response error handler
	reponseErrorHandler = error => {
		if (has(error, 'response') && error && error.response) {
			const stack = {
				url: error.response.request.responseURL,
				status: error.response.status,
				data: error.response.data,
				header: error.response.headers,
				msg: error.response.statusText
			}
			// eslint-disable-next-line
			console.log('Error', stack)
		}

		// Do something with response error
		return Promise.reject(error)
	}

	componentDidMount() {
		this.setState({
			inited: true
		})
	}

	render() {
		const { inited } = this.state
		return (
			<div className="layout-container">
				<Header />
				<TransitionGroup className="page-wrapper">
					<CSSTransition
						key={this.props.location.pathname}
						timeout={350}
						classNames={inited ? 'background' : ''}
					>
						<Switch location={this.props.location}>
							<Route exact path={INDEX} component={LikedAlbumsPage} />
							<Route exact path={ARTISTS} component={ArtistsPage} />
							<Route exact path={ARTIST_DETAIL} component={ArtistDetailPage} />
							<Route render={() => <div style={{ paddingTop: '100px' }}>Not Found</div>} />
						</Switch>
					</CSSTransition>
				</TransitionGroup>

				<ToastContainer
					position="top-right"
					autoClose={10000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
				/>
			</div>

		)

	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = dispatch => ({
	dispatch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
