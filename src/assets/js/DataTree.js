const Styles = (theme) => {
    return {
        dataTreeSubList: {
            paddingLeft: 10
        },
        listItemText: {
            paddingLeft: '0px !important'
        },
        listModuleItem: {
            paddingLeft: 10,
            paddingRight: 10
        },
        collapseItemParent: {
            backgroundColor: theme.palette.action.hover,
            marginBottom: 2,
            paddingLeft: 10,
            paddingRight: 10 
        },
        notFoundBlock: {
            padding: 15,
            textAlign: 'center',
            backgroundColor: theme.palette.background.default,
            margin: '0px 8px',
            boxSizing: 'border-box'
        },
        dataTreeItem: {
            padding: '5px 10px'
        },
        dataTreeSelectedItem: {
            padding: '5px 10px',
            backgroundColor: theme.palette.action.selected
        }
    }
}; 

export default Styles;