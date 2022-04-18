import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => {
    return {
        grow: {
        flexGrow: 1,
        },
        sideBarDrawer: {
            width: 240,
            height: '100%',
            overflow: 'hidden'
        },
        sideBarInner: {
            position: 'relative', 
            display: 'flex', 
            flex: 1, 
            width: '100%', 
            height: '100%'
        },
        appContainer: {
            display: 'flex',
            flex: 1,
            flexGrow: 1,
            backgroundColor: '#cdcdcd',
            flexDirection: 'column'
        },
        headerContainer: {
            width: '100%',
            backgroundColor: '#343434',
            position: 'relative',
            zIndex: 1
        },
        headerLogo: {
            height: '100%',
            padding: 10,
            paddingLeft: 0,
            boxSizing: 'border-box',
            float: 'left',
            marginRight: 20
        },
        headerLogoImg: {
            maxHeight: 40,
            width: 'auto',
            opacity: 1,
            border: '1px solid #fff',
            boxShadow: '3px 3px 10px rgba(0,0,0,0.7)'
        },
        headerTypesSelectorControl: {
            marginLeft: 20,
            minWidth: 150,
            backgroundColor: theme.palette.type === 'light'? '#fff' : 'transparent',
            borderRadius: 2,
            overflow: 'hidden'
        },

        mainContainer: {
            backgroundColor: '#565656',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 240,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 0
            }
        },
        contentContainer: {
            width: '100%',
            display: 'flex',
            flex: 3,
            backgroundColor: theme.palette.background.default,
            padding: 20,
            boxSizing: 'border-box',
            position: 'relative'
        },
        content: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0
        },
        versionSelect: {
            width: '100%',
        },
        versionBoxContainer: {
            padding: 10,
        },

        builderContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        },

        //**********
        menuButton: {
            marginLeft: 5
        },
        title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        },
        searchContainer: {
            padding: 10
        },
        search: {
            position: 'relative',
            borderRadius: 5,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            width: '100%',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            color: theme.palette.type === 'light'? '#000' : '#fff'
        },
        searchIcon: {
            width: theme.spacing.unit * 5,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        closeIcon: {
            width: theme.spacing.unit * 5,
            height: '100%',
            position: 'absolute',
            padding: 0,
            minWidth: theme.spacing.unit * 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: 0,
            top: 0
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            paddingTop: theme.spacing.unit,
            paddingRight: theme.spacing.unit * 5,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 5,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                width: 200,
                },
            },
        },
        permanentDrawer: {
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)'
        },
        selectClass: {
            padding: '5px 5px',
        },
        settingsBlock: {
            width: 200,
            minHeight: 100,
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            top: 70,
            right: 2,
            boxShadow: '2px 2px 6px rgba(0,0,0,0.5)',
            borderRadius: 5,
            padding: '0px 10px'
        },
        settingsTextField: {
            width: '100%'
        }
    }
};

export default styles;
