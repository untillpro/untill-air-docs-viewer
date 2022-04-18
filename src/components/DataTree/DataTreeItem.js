import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

//actions
import * as Actions from 'actions/index';

//modules
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//assets
import DataTreeStyles from "assets/js/DataTree.js";

class DataTreeItem extends Component {
    execAction(data) {
        if(data.action) {
            this.props[data.action](JSON.parse(data.data))
        }
    }

    render() {
        const { classes, data } = this.props;
        const itemClass = this.props.selected ? classes.dataTreeSelectedItem : classes.dataTreeItem;

        return (
            <ListItem 
                className={classes.dataTreeItem}
                key={`item_${data.name}`}
                button={this.props.action !== undefined}
                onClick={() => this.props.action(data)}
                selected={this.props.selected}
            >
                <ListItemText 
                    className={classes.listItemText} 
                    primary={data.name}  
                />
            </ListItem>
        );
    }
}


DataTreeItem.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object
};

const connectedDataTreeItem = connect(null, Actions)(DataTreeItem);

export default withStyles(DataTreeStyles)(connectedDataTreeItem);