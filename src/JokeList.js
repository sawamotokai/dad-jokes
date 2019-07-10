import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './JokeList.css';

const API_URL = 'https://icanhazdadjoke.com/';

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};
	constructor(props) {
		super(props);

		this.state = {
			jokes: []
		};
	}

	async componentDidMount() {
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await axios.get(API_URL, { headers: { Accept: 'application/json' } });
			jokes.push(res.data.joke);
		}
		this.setState({ jokes: jokes });
	}
	render() {
		let jokes = this.state.jokes.map((joke) => <div>{joke}</div>);
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Dad</span> JOKES
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="smiley face"
					/>
					<button className="JokeList-getmore">Load Jokes!</button>
				</div>

				{jokes}
			</div>
		);
	}
}
