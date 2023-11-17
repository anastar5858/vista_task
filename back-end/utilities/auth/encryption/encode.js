const crypto = require('crypto');
const encode = (string) => {
// make sure users passcode dont start or end with a number only an alphabetical letter
  // this is because that the algorithm first number endicates where the middle characters  of the string starts
  // and the last number indicate the index where the middle characters
  /* e.g., the string johntheking the char after the first letter are ohntheking, the starting number will hold the index of the start of the previous substring i.e.,
  index of o after a random string is concatenated between the first character and the staring of the substring,
  and the last number will hold the index of the ending of the substring, i.e., the last letter g afterwards a random string is also concatenated */
  if (string.length <= 0 || string.length >= 25) {
    return 'out of the limits';
  }
  // a random string that concatenates after the first character
  const first = crypto.randomBytes(5).toString('hex');
  // a random string to be concatenated after the second to last character
  const last = crypto.randomBytes(3).toString('hex');
  // concatenate with the original string
  const firstRandom = string.substring(0, 1) + first;
  const lastRandom = string.substring(string.length - 1, string.length) + last;
  // add the indexes mentioned earlier
  // firstRandom.length + 2 is always 13
  // (((firstRandom.length + 1).toString().length is how long the 13 is which is 2
  // firstRandom.length is always 11 the length of the random string plus 1 the first letter
  // string.slice(1, string.length - 1).length)) is the length of the part after the first letter
  const final = (firstRandom.length + 2) + firstRandom + string.slice(1, string.length - 1) +
  lastRandom + string.substring(string.length - 1, string.length) +
  (((firstRandom.length + 1).toString().length + firstRandom.length +
  string.slice(1, string.length - 1).length));
  return final;
}
module.exports = {
  encode,
}
