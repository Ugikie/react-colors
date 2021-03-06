import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';
import NewPaletteForm from './NewPaletteForm';
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames='page' timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path='/palette/new'
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette} />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path='/'
                  render={(routeProps) => (
                    <Page>
                      <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path='/palette/:id'
                  render={(routeProps) => (
                    <Page>
                      <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path='/palette/:paletteId/:colorId'
                  render={(routeProps) => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={(routeProps) => (
                    <Page>
                      <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
