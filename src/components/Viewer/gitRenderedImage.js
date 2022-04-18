import React, { Component } from 'react';
import { connect } from 'react-redux';

class gitRenderedImage extends Component  {
    getCurrentFolder() {
        const { currentUri } = this.props; 
        let folder = '';

        if (currentUri && currentUri != '') {
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

    render() {
        const { src, alt, user, repo, version  } = this.props;
        let path;

        if (src != '') {
            if (src.indexOf('http') === 0 || src.indexOf('https') === 0 || src.indexOf('ftp') === 0) {
                return (
                    <img src={src} alt={alt} />
                );
            } else {
                if (src.indexOf('/') === 0) {
                    path = `https://raw.githubusercontent.com/${user}/${repo}/${version}/${src}`;
                } else {
                    path = `https://raw.githubusercontent.com/${user}/${repo}/${version}/${this.getCurrentFolder()}${src}`;
                }
                
                return (
                    <img src={path} alt={alt} />
                );
            }
        }
    }
};

const mapStateToProps = (state) => {
    const { user, repo, version, currentUri } = state.view;
    return { user, repo, version, currentUri };
};

export default connect(mapStateToProps, null)(gitRenderedImage);