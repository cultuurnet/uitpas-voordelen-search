export function intersperse(arr, sep) {
    if (arr.length === 0) {
        return [];
    }

    return arr.slice(1).reduce(function(xs, x, i) {
        return xs.concat([sep, x]);
    }, [arr[0]]);
}

/**
 * Joins all items of an array to a string while interleaving each item with the string 'glue' and
 * the last item with the string lastItemGlue. E.g. list = [1,2,3], glue=', ', lastItemGlue=' and '
 * will result in '1, 2 and 3'.
 * @param list
 * @param glue
 * @param lastItemGlue
 * @returns {string}
 */
export function joinNicely(list, glue, lastItemGlue){
    return [list.slice(0, -1).join(glue), list.slice(-1)[0]].join(list.length < 2 ? '' : lastItemGlue);
}