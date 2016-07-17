import toInteger from 'lodash.tointeger';

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
  const length = array.length;
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

  if (deleteCount === 0 && inserts.length === 0) {
    return [];
  }

  const tail = Array(length - start);
  const iLength = inserts.length;
  let i;
  for (i = 0; i < tail.length; i++) {
    tail[i] = array[i + start];
  }
  for (i = 0; i < iLength; i++) {
    array[i + start] = inserts[i];
  }
  for (i = 0; i < tail.length - deleteCount; i++) {
    array[i + iLength + start] = tail[i + deleteCount];
  }
  for (i = deleteCount; i < inserts.length; i++) {
    array[i + start] = inserts[i];
  }

  const totalDeletes = deleteCount - iLength;
  if (totalDeletes > 0) {
    array.length -= totalDeletes;
  }
  tail.length = deleteCount;
  return tail;
}

export default function(array, start, deleteCount, inserts = []) {
  return fastSplice(array, start, deleteCount, inserts, arguments.length);
}
