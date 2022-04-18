import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

//actions
import * as Actions from 'actions/index';

//assets
import ViewerStyles from 'assets/js/DocumentationViewer.js';
import 'assets/Viewer.css';

class GitSearcher extends Component {
    constructor() {
        super();
    }

    handleCancleClick() {
        this.props.setState({searchString: ''});
    }

    handeSearchChange(event) {
        const str = event.target.value;

        this.props.setState({searchString: str});
    }

    handleSearchKeyPress(event) {
        if (event.charCode === 13) {
            event.target.blur();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.searchContainer}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>

                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={this.props.searchString}
                        onChange={(event) => this.handeSearchChange(event)}
                        onKeyPress={(event) => this.handleSearchKeyPress(event)}
                    />

                    {this.props.searchString !== '' ? (
                        <Button className={classes.closeIcon} onClick={this.handleCancleClick.bind(this)}>
                            <CloseIcon />
                        </Button>
                    ) : ''}
                </div>
            </div>
        );
    }
}

GitSearcher.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { searchString } = state.view;
    return { searchString };
};

const connectedGitSearcher = connect(mapStateToProps, Actions)(GitSearcher);

export default withStyles(ViewerStyles)(connectedGitSearcher);