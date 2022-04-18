import * as Types from 'actions/types';
import yaml from 'js-yaml';

import { forEach } from 'classes/Utils.js';

export const setState = (obj) => {
    return {
        type: Types.SET_STATE,
        payload: obj
    };
}

export const selectDocument = (obj) => {
    return (dispatch) => {

        dispatch({
            type: Types.SELECT_DOCUMENT,
            payload: obj.uri
        });

        dispatch({
            type: Types.CHECK_BROWSER_HISTORY
        });
    };
}

export const setDocTypes = (types) => {
    return {
        type: Types.SET_DOCUMENTATION_TYPES,
        payload: types
    };
};


export const setDocType = (index) => {
    return (dispatch) => {
        dispatch({
                type: Types.SET_DOCUMENTATION_TYPE,
                payload: index
            });
    };
    
};

export const checkBrowserHistory = (location = null) => {
    return {
        type: Types.CHECK_BROWSER_HISTORY,
        payload: location
    };
}

export const getDocumentstionTypes = (pathToFile) => {
    return (dispatch, getState) => {
        const currentState = getState();
        const { view } = currentState;

        fetch(pathToFile)
            .then(response => response.text())
            .then(data => {
                const types = yaml.safeLoad(data);
                const TYPES = {};


                if (types && types.length > 0) {
                    types.map(row => {
                        TYPES[`${row.user}-${row.repo}`] = row;
                    });

                    dispatch({
                        type: Types.SET_DOCUMENTATION_TYPES,
                        payload: TYPES
                    });

                    if (view.user === null && view.repo === null) {
                        dispatch({
                            type: Types.SET_DOCUMENTATION_TYPE,
                            payload: `${types[0].user}-${types[0].repo}`
                        });
                    } else {
                        dispatch({
                            type: Types.SET_STATE,
                            payload: {currentType: `${view.user}-${view.repo}`}
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export const getRepoData = (VERSION, USER, REPO) => {
    return (dispatch, getState) => {
        const currentState = getState();
        const { view } = currentState;

        const version = VERSION || view.version;
        const user = USER || view.user;
        const repo = REPO || view.repo;

        const index = view.tocFile || 'index.yml';

        if (!version || !user || !repo) return;

        const uriToRepo = `https://raw.githubusercontent.com/${user}/${repo}/${version}/`;
        const uriToFetch = `${uriToRepo}${index}`;

        fetch(uriToFetch)
            .then(response => response.text())
            .then((data) => {
                const res = yaml.safeLoad(data);

                if(res && res.header) {
                    dispatch({
                        type: Types.SET_STATE,
                        payload: { header: res.header }
                    });
                }

                if(res && res.pages && res.pages.length > 0) {
                    const promises = [];
                    const contents = {};
                    const tree = res.pages;
                    const treeObjects = {};
                    let prev = null;

                    forEach(tree, (obj) => {
                        if (obj.uri && obj.uri != '') {

                            if(prev !== null) {
                                prev.next = obj;
                                obj.prev = prev;
                            }

                            prev = obj;
                            treeObjects[obj.uri] = obj;
                            
                            promises.push(new Promise((resolve, reject) => {
                                fetch(`${uriToRepo}${obj.uri}`)
                                    .then(response => response.text())
                                    .then((data) => {
                                        contents[obj.uri] = data;

                                        resolve(data);
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                            }));
                        }
                    });

                    return Promise.all(promises)
                        .then(() => {
                            dispatch({
                                type: Types.SET_REPO_DOCUMENTS_CONTENT,
                                payload: contents
                            });

                            dispatch({
                                type: Types.SET_STATE,
                                payload: { tree, version, treeObjects }
                            });
                        });
                } else {
                    dispatch({
                        type: Types.SET_STATE,
                        payload: {
                            tree: [],
                            documents: {}
                        }
                    });
                }
        });
    };
    
};

export const getRepoVersions = (USER = null, REPO = null) => {
    return (dispatch, getState) => {
        const currentState = getState();
        const { view } = currentState;

        const user = USER || view.user;
        const repo = REPO || view.repo;

        const uriToFetch = `https://api.github.com/repos/${user}/${repo}/tags`;

        fetch(uriToFetch)
            .then(response => response.json())
            .then(json => {
                let versions = [];

                if (json.length > 0) {
                    versions = json.map((ver) => ver.name);
                }

                dispatch({
                    type: Types.SET_STATE,
                    payload: {versions}
                });
            });
    };
};

export const settingsToggleOpened = () => {
    return {
        type: Types.SET_TOGGLE_OPENED
    };
};

export const settingsSetProperty = (obj) => {
    return {
        type: Types.SET_PROP,
        payload: obj
    }
};