let profileLetter = '';
const letter = () => {
  let str = 'Mark Wood';
  let string = str.split(' ');
  if (str.split(' ').length > 3) {
    string = string.filter(value => {
      return value.length > 1;
    });
  }
  if (string.length > 3) {
    string = string.map(value => {
      return value.replace('the', '');
    });
    string = string.map(value => {
      return value.replace('NHS', '');
    });
    string = string.filter(value => {
      return value != '';
    });
  }
  let arr = [];
  string.forEach((value, index) => {
    if (index == 0) {
      if (value.slice(0, 3).match('^[0-9]*$')) {
        arr.push(value.slice(0, 3));
      } else if (index == 0) {
        if (value.slice(0, 2).match('^[0-9]*$')) {
          arr.push(value.slice(0, 2));
          arr.push(string[1].slice(0, 1));
        }
      }
    }
  });
  let acronym = '';
  if (arr.length == 0) {
    acronym = string
      .slice(0, 3)
      .reduce((response, word) => (response += word.slice(0, 1)), '');
  }
  if (arr.length == 1) {
    acronym = arr[0];
  }
  if (arr.length == 2) {
    acronym = arr[0] + arr[1];
    console.log(acronym);
  }

  profileLetter = acronym;
};