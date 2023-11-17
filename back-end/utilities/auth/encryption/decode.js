const decode = (string) => {
  let startChecked = false;
  let startingNumber;
  let lettersStart;
  for(let i = 0; i<string.length-1; i++){
    if(!isNaN(string[i])) startingNumber = startingNumber + string[i]
    if( isNaN(string[i]) && !startChecked) {
      startChecked = true;
      lettersStart = string[i];
      break;
    }
  }
  let finalChecked = false;
  let lastnumber;
  let lettersFinal;
  for(let i = string.length-1; i>0; i--){
    if(!isNaN(string[i])) lastnumber = lastnumber + string[i]
    if( isNaN(string[i]) && !finalChecked) {
      finalChecked = true;
      lettersFinal=string[i];
      break;
    }
  }
  const firstI = startingNumber.split('undefined')[1];
  const lastI = lastnumber.split('undefined')[1].split('').reverse().join('');
  const backToNormal = lettersStart + string.slice(firstI, lastI) + lettersFinal;
  return backToNormal
}
module.exports = {
  decode,
}