import toInteger from 'lodash.tointeger';

const empty = [];

function fastSplice(array, start, deleteCount, inserts, argsLength) {
  if (!Array.isArray(array)) {
    throw new TypeError('Need an array to splice.')
  }
  if (!Array.isArray(inserts)) {
    throw new TypeError('Inserts array much be an array.')
  }
  if (argsLength == 1) {
    return [];
  }

  let length = array.length;
  start = toInteger(start);
  if (start < 0) {
    start = Math.max(length + start, 0);
  } else {
    start = Math.min(start, length);
  }

  if (argsLength == 2) {
    deleteCount = length - start;
  } else {
    deleteCount = Math.min(Math.max(toInteger(deleteCount), 0), length - start);
  }

  let removals;
  if (deleteCount) {
    removals = array.splice(start, deleteCount);
    length -= deleteCount;
  } else {
    removals = [];
  }

  const insertLength = inserts.length;
  const edge = start + insertLength;
  const need = Math.max(edge - length, 0);
  let i;

  // Append inserts that'll end up on the end of the array to the array.
  for (i = length; i < edge; i++) {
    array[i] = inserts[i - start];
  }
  for (i = length - insertLength + need; i < length; i++) {
    array[i + insertLength] = array[i];
  }
  for (i = length - 1; i >= edge; i--) {
    array[i] = array[i - insertLength];
  }
  for (i = 0; i < insertLength - need; i++) {
    array[i + start] = inserts[i];
  }

  return removals;
}

export default function(array, start, deleteCount, inserts = empty) {
  return fastSplice(array, start, deleteCount, inserts, arguments.length);
}
