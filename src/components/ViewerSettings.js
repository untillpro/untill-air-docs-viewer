import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { withCookies } from 'react-cookie';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import {
    settingsSetProperty,
    settingsToggleOpened
} from 'actions/index';

import ViewerStyles from 'assets/js/DocumentationViewer.js';

class ViewerSettings extends Component {
    themeChangeHandler(event) {
        const { cookies } = this.props;
        this.props.settingsSetProperty({prop: "theme", value: event.target.value});
        this.props.settingsToggleOpened();
        cookies.set('theme', event.target.value, { path: '/' });
    }

    renderThemeSetting() {
        const { classes } = this.props;

        return (
            <TextField
                select
                label="Color theme"
                className={classes.settingsTextField}
                value={this.props.theme}
                onChange={this.themeChangeHandler.bind(this)}
                margin="normal"
                variant="filled"
            >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
            </TextField>
        );
    }

    render() {

        const { classes, cookies } = this.props;
        return (
            <Zoom
                in={this.props.opened}
            >
                <div className={classes.settingsBlock}>
                    {this.renderThemeSetting()}
                </div>
            </Zoom>
        );
    }
}

ViewerSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    cookies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return state.settings;
};

const connectedViewerStyles = connect(mapStateToProps, { 
    settingsSetProperty,
    settingsToggleOpened
}) (ViewerSettings);


export default withStyles(ViewerStyles)(withCookies(connectedViewerStyles));