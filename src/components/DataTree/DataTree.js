import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//modules
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

//components
import { 
    DataTreeItem,
    DataTreeCollapseItem
}  from 'components/DataTree';

//assets
import DataTreeStyles from "assets/js/DataTree.js"; 

class DataTree extends Component {
    renderListItem(line) {
        let current = false;
        let opened = false;
        
        if(this.props.searchString != '') opened = true;
        if(line.pages) {
            return <DataTreeCollapseItem key={`line_${line.name}`} data={line} opened={opened} action={this.props.action}/>;
        }

        if(this.props.currentUri === line.uri) current = true;
        return <DataTreeItem key={`line_${line.name}`} data={line} action={this.props.action} selected={current} />;
    }

    render() {
        const { data, classes } = this.props;

        if (data.length > 0) {
            return (
                <div className={classes.dataTreeContainer}>
                    <List dense={true}>
                        {data.map((line) => this.renderListItem(line))}
                    </List>
                </div>
            );
        } else {
            return (
                <div className={classes.notFoundBlock}>
                    <Typography>
                        Nothing found
                    </Typography>
                </div>
            );
        }
        
    }
}

DataTree.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array,
    opened: PropTypes.bool
};

const mapStateToProps = (state) => {
    const { currentElement, currentUri, searchString } = state.view;

    return { currentElement, currentUri, searchString };
};

const connectedDataTree = connect(mapStateToProps, null)(DataTree);

export default withStyles(DataTreeStyles)(connectedDataTree);