import React, { Component } from 'react';
import { connect } from 'react-redux';
import html from 'react-inner-html';

class gitRenderedImage extends Component  {


    render() {
        let { value, searchString } = this.props;
        const reg = new RegExp(searchString, 'gi');
        if (searchString != '') {
            value = value.replace(reg, '<span class="highlight">$&</span>');
        } 

        return <span {...html(value)} />;
    }
};

const mapStateToProps = (state) => {
    const { searchString } = state.view;
    return { searchString };
};

export default connect(mapStateToProps, null)(gitRenderedImage);