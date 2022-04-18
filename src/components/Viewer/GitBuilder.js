import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import yaml from 'js-yaml';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//modules 
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import { DataTree } from 'components/DataTree/index';

//utils
import { forEach } from 'classes/Utils';

//actions
import * as Actions from 'actions/index';

//assets
import ViewerStyles from 'assets/js/DocumentationViewer.js';
import 'assets/Viewer.css';

class GitBuilder extends Component {
    
    componentDidMount() {
        this.props.getRepoData();
        this.props.getRepoVersions();
    }

    componentWillReceiveProps(newProps) {
        const { user, repo } = this.props;

        if (user !== newProps.user || repo !== newProps.repo) {
            this.props.getRepoData('master', newProps.user, newProps.repo);
            this.props.getRepoVersions(newProps.user, newProps.repo);
        }
    }

    checkCurrentDocument(tree) {
        const { currentElement } = this.props;
        let inTree = false;
        if (currentElement) {
            forEach(tree, (obj) => {
                if (obj.uri && obj.uri === currentElement.uri) {
                    this.props.selectDocument(obj);
                    inTree = true;
                    return false;
                }
            })

            if(!inTree) {
                this.props.selectDocument(null);
            }
        }
    }

    listItemClick(elem) {
        this.props.selectDocument(elem);
    }

    renderVersions() {
        const { classes } = this.props;
        const { versions, version } = this.props;

        if (versions && versions.length > 0) {

            return (
                <div className={classes.versionBoxContainer}>
                    <Select
                        value={version}
                        onChange={(event) => {
                            const version = event.target.value;
                            this.props.getRepoData(version);
                        }}
                        name="version"
                        displayEmpty
                        className={classes.versionSelect}
                    >
                        <MenuItem value="master">Master</MenuItem>
                        {versions.map(ver => {
                            return (
                                <MenuItem key={`ver_${ver}`} value={ver}>{ver}</MenuItem>
                            );
                        })}
                    </Select>
                    
                    <FormHelperText>Documentation version</FormHelperText>
                </div>
            );
        }
    }

    prepareTreeData(data) {
        let temp = [];
        const { searchString, documents } = this.props;
        const reg = new RegExp(searchString, 'gi');

        if (searchString != '') {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    var o = data[i];

                    if (o.pages) {
                        let t = this.prepareTreeData(o.pages);
    
                        if (t.length > 0) {
                            temp.push({
                                ...o,
                                pages: t
                            });
                        }
                    } else {
                        let content = documents[o.uri];
                        if (content.search(reg) !== -1) {
                            temp.push(o);
                        }
                    }
                }
            }
        } else {
            temp = data;
        }
        
        return temp;
    }

    renderTree() {
        const { tree } = this.props;
        const data = this.prepareTreeData(tree);

        return (
            <DataTree 
                data={data} 
                action={(element) => this.listItemClick(element)}
            />
        );
    }

    render() {
        return (
            <Fragment>
                {this.renderVersions()}
                <Divider />
                {this.renderTree()}
            </Fragment>
        );
    }
}

GitBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return state.view;
};

const connectedGitBuilder = connect(mapStateToProps, Actions)(GitBuilder);

export default withStyles(ViewerStyles)(connectedGitBuilder);

