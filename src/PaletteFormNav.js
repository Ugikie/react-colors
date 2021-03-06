import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles.js';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: '',
      formShowing: false
    };
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  showForm = () => {
    this.setState({ formShowing: true });
  };

  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
    const { formShowing } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to='/'>
              <Button variant='contained' color='secondary' className={classes.button}>
                Go Back
              </Button>
            </Link>
            <Button variant='contained' color='primary' onClick={this.showForm} className={classes.button}>
              Save Palette
            </Button>
          </div>
        </AppBar>
        {formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
