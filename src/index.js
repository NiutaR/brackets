module.exports = function check(str, bracketsConfig) {
  let openCloseSymbol = {};
  let closeOpenSymbol = {};
  bracketsConfig.forEach(config => {
    openCloseSymbol[config[0]] = config[1];
    closeOpenSymbol[config[1]] = config[0];
  });

  let stack = [];
  try {
    str.split('').forEach(currChar => {
      if (openCloseSymbol.hasOwnProperty(currChar)) { // if this is an open symbol
        if (closeOpenSymbol.hasOwnProperty(currChar) && stack[stack.length - 1] === currChar) {
          stack.pop();
        } else {
          stack.push(currChar);
        }
      } else if (closeOpenSymbol.hasOwnProperty(currChar)) { // if this is a close symbol
        if (stack[stack.length - 1] === closeOpenSymbol[currChar]) {
          stack.pop();
        } else {
          throw Error('---');
        }
      }
    });
  } catch (e) {
    return false;
  }

  return stack.length === 0;
}