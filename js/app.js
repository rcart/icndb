// Get UI elements
document.addEventListener('DOMContentLoaded', () => document.getElementById('number').focus());
document.querySelector('#number').addEventListener('keyup', (e) => e.keyCode === 13 ? getFacts(e) : '');
document.querySelector('.get-facts').addEventListener('click', getFacts);

function getFacts(e) {
  const number = document.getElementById('number').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';

      if (response.type === 'success') {
        response.value.forEach(function(item) {
          output += `
          <li>${item.joke}</li>
          `;
        });
      } else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('.facts').innerHTML = output;
    } else {
      console.log('Cannot fetch remote');
      document.querySelector('.facts').innerHTML = this.responseText;

    }
  }

  xhr.send();
  e.preventDefault();
}
