import React, { Component } from 'react';
import { connect } from 'react-redux';

import {forEach} from 'classes/Utils';

//actions
import * as Actions from 'actions/index';

class gitRenderedLink extends Component  {
    getCurrentFolder() {
        const { currentUri } = this.props; 
        let folder = '';

        if (currentUri) {
            const uri = currentUri;

            if (uri != '') {
                if(uri.lastIndexOf('/') > 0) {
                    const li = uri.lastIndexOf('/') + 1;
                    folder = uri.slice(0,li);
                }
            }
        }

        return folder;
    }

    findElementInTree(path) {
        const { tree } = this.props;

        forEach(tree, (obj) => {
            if (obj.uri && obj.uri === path) {
                this.props.selectDocument(obj);
                return false;
            }
        });
    }

    handleClick(event, href) {
        event.preventDefault();

        let path = href;

        if(path.indexOf('/') === 0) {
            path = path.slice(1, path.length);
        } else if (path.indexOf('/') == -1) {
            path = this.getCurrentFolder() + path;
        }

        this.findElementInTree(path);
    }

    render() {
        const { href } = this.props;

        if (href != '') {
            if (href.indexOf('http') === 0 || href.indexOf('https') === 0 || href.indexOf('ftp') === 0) {
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer">{this.props.children}</a>
                );
            } else {
                return (
                    <a href={href} onClick={(event) => this.handleClick(event, href)}>{this.props.children}</a>
                );
            }
        }
    }
};

const mapStateToProps = (state) => {
    const { tree, currentUri } = state.view;
    return { tree, currentUri };
};

export default connect(mapStateToProps, Actions)(gitRenderedLink);