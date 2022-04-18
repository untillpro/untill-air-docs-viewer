import * as Types from 'actions/types';
import createHistory from 'history/createBrowserHistory';

let INITIAL_STATE = {
    docsFile: 'https://raw.githubusercontent.com/untillpro/untill-air-docs-toc/master/repos.yml',
    tocFile: 'toc.yml',

    user: null,
    repo: null,
    
    types: [],

    header: 'UnTill documentation',
    documents: {},
    content: '',
    tree: [],
    treeObjects: {},
    versions: [],
    version: 'master',
    currentElement: null,
    searchString: '',
    currentType: null
}

const parseLocation = (path) => {
    var uri = null,
        index = null;
    var props = {
        0: null,
        1: null,
        2: null
    };

    const count = 3;
    var PATH = path;
    
    PATH = PATH.slice(1, PATH.length);

    for (let i = 0; i < count; i++) {
        if (PATH.length > 0) {
            index = PATH.indexOf('/');
            
            if (index >= 0) {
                props[i] = PATH.slice(0, index);
                PATH = PATH.slice(index+1, PATH.length);
            }
        }
    }

    if (PATH.length > 0) uri = PATH;

    if (props[0] && props[1] && props[2] && uri) {
        return { user: props[0], repo: props[1], version: props[2], uri };
    }

    return null;
};

const history = createHistory();
const location = history.location;

const res = parseLocation(location.hash);

INITIAL_STATE = {...INITIAL_STATE, ...res};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.SET_STATE:
            return {
                ...state,
                ...action.payload
            };
        case Types.SELECT_DOCUMENT:
            const uri = action.payload;

            history.push(`#${state.user}/${state.repo}/${state.version}/${uri}`);

            return {
                ...state,
                currentUri: uri
            };
        case Types.CHECK_BROWSER_HISTORY:
            let location;
            if (action.payload) {
                location = action.payload;
            } else {
                location = history.location;
            }

            const res = parseLocation(location.hash);

            if (res !== null) {
                return {
                    ...state,
                    user: res.user,
                    repo: res.repo,
                    verstion: res.version,
                    currentUri: res.uri
                };    
            }

            return state;
        case Types.SET_DOCUMENTATION_TYPES: 
            if (action.payload) {
                return {
                    ...state,
                    types: action.payload
                };
            }
            return state;
        case Types.SET_DOCUMENTATION_TYPE: 
            var type = state.types[action.payload];

            if (type) {
                return {
                    ...state,
                    currentType: action.payload,
                    user: type.user,
                    repo: type.repo,
                    version: 'master',
                    searchString: ''
                };
            }

            return state;
            
        case Types.SET_REPO_DOCUMENTS_CONTENT: 
            return {
                ...state,
                documents: action.payload
            };
        default: return state;
    }
}
