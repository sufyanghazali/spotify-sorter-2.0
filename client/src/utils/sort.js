const partition = function(arr, leftIdx, rightIdx, pivotIdx) {
    let pivotVal, currIdx, newPivotIdx;

    pivotVal = arr[pivotIdx];
    arr[pivotIdx] = arr[rightIdx];
    arr[rightIdx] = pivotVal;

    currIdx = leftIdx;

    for (let i = leftIdx; i < rightIdx; i++) {
        if (compareTracks(arr[i], pivotVal)) {

            // swaps elements
            [arr[i], arr[currIdx]] = [arr[currIdx], arr[i]];
            currIdx++;
        }
    }

    newPivotIdx = currIdx;
    arr[rightIdx] = arr[newPivotIdx];
    arr[newPivotIdx] = pivotVal;
    // alternate way of swapping by destructuring
    // [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]

    return newPivotIdx;
}

const quickSortRecursive = (arr, leftIdx, rightIdx,) => {
    if (rightIdx > leftIdx) {
        let pivotIdx, newPivotIdx;
        pivotIdx = Math.floor((leftIdx + rightIdx) / 2);
        newPivotIdx = partition(arr, leftIdx, rightIdx, pivotIdx);

        quickSortRecursive(arr, leftIdx, newPivotIdx - 1);
        quickSortRecursive(arr, newPivotIdx + 1, rightIdx);
    }
}

const quickSort = arr => {
    quickSortRecursive(arr, 0, arr.length - 1);
}

const compareTracks = (a, b) => {
    let dateA, dateB;
    dateA = Date.parse(a.track.album.release_date);
    dateB = Date.parse(b.track.album.release_date);

    return dateA < dateB;
}

const compare = (a, b) => {
    let dateA, dateB;
    let result = 0;
    dateA = Date.parse(a.track.album.release_date);
    dateB = Date.parse(b.track.album.release_date);


    if (dateA < dateB)
        result = -1;
    else if (dateB > dateA)
        result = 1

    return result;
}

module.exports = {
    partition,
    quickSort,
    quickSortRecursive,
    compareTracks,
    compare
}