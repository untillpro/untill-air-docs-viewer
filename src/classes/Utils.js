import _ from 'lodash';
const forbiddenProps = ['prev', 'next'];

export const forEach = (collection, callback = null) => {
    _.each(collection, (obj, key) => {
        if(typeof obj === 'object' && forbiddenProps.indexOf(key) === -1 ) {
            forEach(obj, callback);
        }

        if(callback) {
            return callback(obj);
        }
    });
}

export const getSearchParams = (str) => {
    const result = {};
    let query = str;

    if(query.indexOf('?') === 0) 
        query = str.substring(1);

    var vars = query.split("&");
    
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        result[pair[0]] = pair[1];
    } 

    return result;
}