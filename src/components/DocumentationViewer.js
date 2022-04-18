import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Swipeable from 'react-swipeable';
import Drawer from '@material-ui/core/Drawer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ViewerSettings from 'components/ViewerSettings';
//actions
import * as Actions from 'actions/index';

//assets
import ViewerStyles from 'assets/js/DocumentationViewer.js';
import 'assets/Viewer.css';
import logo from 'assets/img/logo-simple.png';
import createHistory from 'history/createBrowserHistory';
 

//******************************** */
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import jsPDF from 'jspdf';

class DocumentationViewer extends Component {
    constructor() {
        super();

        this.state = {
            open: false
      };
    }

    componentWillMount() {
        const { docsFile } = this.props;

        if (this.props.searcher) this.searcher = this.props.searcher;
        if (this.props.builder) this.builder = this.props.builder;
        if (this.props.viewer) this.viewer = this.props.viewer;

        if (docsFile) {
            this.props.getDocumentstionTypes(docsFile);
        }

        this.props.checkBrowserHistory();

        const history = createHistory();
        history.listen((location) => {
            this.props.checkBrowserHistory(location);
        })
    }

    
    generatePdf() { 
        var doc = new jsPDF();
        var content = document.getElementById('content_area');
        const docName = 'Document'
        doc.fromHTML(content.innerHTML, 10, 10,{
            'width': 180, 
        });

        doc.save(`${docName}.pdf`);
    }

    toggleSettings() {
        this.props.settingsToggleOpened();
    }

    toggleDrawer(open) {
        this.setState({open});
    }

    handleTypesSelectorChange(event) {
        const index = event.target.value;
        
        if(index != '') {
            this.props.setDocType(index);
        }
    }

    renderTypesSelector() {
        const { types, currentType, classes } = this.props;
        const value = currentType || ''; 

        if (types) {
            return (
                <FormControl className={classes.headerTypesSelectorControl}>
                    <Select
                        value={value}
                        onChange={this.handleTypesSelectorChange.bind(this)}
                        displayEmpty
                        classes={{
                            select: classes.selectClass
                        }}
                    >
                        {Object.values(types).map((row) => {
                            return <MenuItem value={`${row.user}-${row.repo}`}>{row.name}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            );
        }

        return '';
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Swipeable
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                    flex: 1
                }}
                delta={80}
                onSwipingLeft={() => this.toggleDrawer(false)}
                onSwipingRight={() => this.toggleDrawer(true)}
            >
            <div className={classes.appContainer + ' ' + this.props.className}> 
                <Hidden smDown>
                    <Drawer
                        variant="permanent" 
                        open={true}
                    >   
                        <div className={classes.sideBarDrawer}>
                            <div className={classes.builderContainer}>
                                <PerfectScrollbar>
                                    {this.props.searcher}
                                    <Divider />
                                    {this.props.builder}
                                </PerfectScrollbar>
                            </div>
                        </div>
                    </Drawer>
                </Hidden>

                <Hidden mdUp>
                    <Drawer
                        open={this.state.open}
                        jdfhaksdf={ 23 ? 342 : 'asdas'}
                        onClose={() => this.toggleDrawer(false)}
                        onOpen={() => this.toggleDrawer(true)}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            onBackdropClick: () => this.toggleDrawer(false)
                        }}
                    >   
                        <div className={classes.sideBarDrawer}>
                            <AppBar position="static">
                                <Toolbar disableGutters>
                                    <IconButton 
                                        className={classes.menuButton} 
                                        color="inherit" 
                                        aria-label="Toggle sidebar"
                                        onClick={() => this.toggleDrawer(false)}
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                    {this.renderTypesSelector()}
                                </Toolbar>
                            </AppBar>

                            <div className={classes.sideBarInner}>
                                <div className={classes.builderContainer}>
                                    <PerfectScrollbar>
                                        {this.props.searcher}
                                        <Divider />
                                        {this.props.builder}
                                    </PerfectScrollbar>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </Hidden>
                <div className={classes.mainContainer}>
                    <div className={classes.headerContainer}>
                        <AppBar position="static">
                            <Toolbar>
                                <div className={classes.headerLogo}>
                                    <img className={classes.headerLogoImg} src={logo} alt="logo" />
                                </div>

                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                    {this.props.header}
                                </Typography>


                                <Hidden smDown>
                                    {this.renderTypesSelector()}
                                </Hidden>
                                
                                <div className={classes.grow} />

                                {
                                    this.props.content !== '' ? (
                                        <IconButton 
                                            className={classes.menuButton} 
                                            color="inherit" 
                                            aria-label="Toggle sidebar"
                                            onClick={() => this.generatePdf()}
                                        >
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                    ) : ''
                                }

                                <Hidden mdUp>
                                    <IconButton 
                                        className={classes.menuButton} 
                                        color="inherit" 
                                        aria-label="Toggle sidebar"
                                        onClick={() => this.toggleDrawer(true)}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Hidden>

                                <IconButton 
                                    className={classes.menuButton} 
                                    color="inherit" 
                                    aria-label="Toggle sidebar"
                                    onClick={() => this.toggleSettings(true)}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            <PerfectScrollbar key={this.props.currentElement ? this.props.currentElement.uri : 'index'}>
                                    <div className="content-area" id="content_area">
                                        {this.props.viewer}
                                    </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>

                <ViewerSettings />
            </div>
            </Swipeable>
        );
    }
}

DocumentationViewer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { header, currentType, types, docsFile } = state.view;

    return { header, currentType, types, docsFile };
};

const connectedDocumentationViewer = connect(mapStateToProps, Actions )(DocumentationViewer);

export default withStyles(ViewerStyles)(connectedDocumentationViewer);
