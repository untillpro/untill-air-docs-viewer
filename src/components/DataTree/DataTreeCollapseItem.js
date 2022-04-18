import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

//modules

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
//coponents
import { DataTree } from 'components/DataTree';

//assets
import DataTreeStyles from "assets/js/DataTree.js";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class DataTreeCollapseItem extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
    }
    
    toggleCollapse() {
        this.setState({open: !this.state.open});
    }

    renderCollapseList() {
        const { data } = this.props;
        const open = data.open || this.state.open || this.props.opened;
        
        if (data.pages.length > 0) {
            return (
                <Collapse 
                    in={open} 
                    timeout="auto" 
                    unmountOnExit
                >
                    <DataTree data={data.pages} action={this.props.action}/>
                </Collapse>
            );
        }

        return '';
    }


    render() {
        const { classes, data } = this.props;

        return (
            <Fragment>
                <ListItem 
                    button={!data.open}
                    onClick={this.toggleCollapse.bind(this)} 
                    className={classes.collapseItemParent}
                >
                    {this.state.open ? (
                        <ListItemIcon>
                            <FolderOpenIcon />
                        </ListItemIcon>
                    ) : (
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                    )}
                    
                    <ListItemText inset primary={data.name} className={classes.listItemText} />

                    {data.open ? '' : (
                        <Typography>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </Typography>
                    )}
                </ListItem>

                 {this.renderCollapseList()}   
            </Fragment>
        );
    }
}

DataTreeCollapseItem.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object,
    opened: PropTypes.any
};

export default withStyles(DataTreeStyles)(DataTreeCollapseItem);