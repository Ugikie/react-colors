import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem('RC-Palettes'));
		this.state = {
			palettes: savedPalettes || seedColors
		};
		this.findPalette = this.findPalette.bind(this);
		this.savePalette = this.savePalette.bind(this);
	}
	findPalette(id) {
		return this.state.palettes.find(function(palette) {
			return palette.id === id;
		});
	}
	deletePalette = (id) => {
		this.setState(
			(st) => ({
				palettes: st.palettes.filter((palette) => palette.id !== id)
			}),
			this.syncLocalStorage
		);
	};
	savePalette(newPalette) {
		this.setState({ palettes: [ ...this.state.palettes, newPalette ] }, this.syncLocalStorage);
	}
	syncLocalStorage() {
		window.localStorage.setItem('RC-Palettes', JSON.stringify(this.state.palettes));
	}
	render() {
		return (
			<Switch>
				<Route
					exact
					path='/palette/new'
					render={(routeProps) => (
						<NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette} />
					)}
				/>
				<Route
					exact
					path='/'
					render={(routeProps) => (
						<PaletteList
							deletePalette={this.deletePalette}
							palettes={this.state.palettes}
							{...routeProps}
						/>
					)}
				/>
				<Route
					exact
					path='/palette/:id'
					render={(routeProps) => (
						<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
					)}
				/>
				<Route
					exact
					path='/palette/:paletteId/:colorId'
					render={(routeProps) => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
						/>
					)}
				/>
			</Switch>
		);
	}
}

export default App;
