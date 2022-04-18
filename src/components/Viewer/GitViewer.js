import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

//actions
import * as Actions from 'actions/index';
import renderedLink from './gitRenderedLink';
import renderedImage from './gitRenderedImage';
import renderedText from './gitRenderedText';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

class GitViewer extends Component {
    renderPrev() {
        const { treeObjects, currentUri } = this.props; 
        const doc = treeObjects[currentUri];

        if (doc && doc.prev) {
            return (
                <div className="content-prev-doc" onClick={() => this.props.selectDocument(doc.prev)}>
                    <KeyboardArrowLeft fontSize="large"/>
                </div>
            );
        }
        return '';
    }

    renderNext() {
        const { treeObjects, currentUri } = this.props; 
        const doc = treeObjects[currentUri];

        if (doc && doc.next) {
            return (
                <div className="content-next-doc" onClick={() => this.props.selectDocument(doc.next)}>
                    <KeyboardArrowRight fontSize="large"/>
                </div>
            );
        }
        return '';
    }

    render() {
        const {documents, currentUri} = this.props;
        let content = '';

        if (documents && currentUri) {
            if(documents[currentUri]) {
                content = documents[currentUri];
            }
        }

        return (
            <Fragment>
                {this.renderPrev()}
                {this.renderNext()}

                <ReactMarkdown 
                    source={content}
                    disallowedTypes={['linkReference', 'imageReference']}
                    renderers={{
                        text: renderedText,
                        link: renderedLink,
                        image: renderedImage
                    }}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { treeObjects, documents, currentUri, prev, next } = state.view;

    return { treeObjects, documents, currentUri, prev, next };
};

export default connect(mapStateToProps, Actions)(GitViewer);
