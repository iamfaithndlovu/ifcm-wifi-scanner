(() => {
  'use strict';
  const quotes = window.encouragementQuotes;
  if (!Array.isArray(quotes) || !quotes.length) return;
  const quote = document.getElementById('quote');
  const reference = document.getElementById('reference');
  const content = document.getElementById('quote-content');
  const button = document.getElementById('another');
  let current = Math.floor(Math.random() * quotes.length);
  function render() {
    quote.textContent = quotes[current].text;
    reference.textContent = quotes[current].reference ? '— ' + quotes[current].reference : 'A little encouragement';
  }
  render();
  document.documentElement.classList.add('js');
  setTimeout(() => document.querySelector('.surprise').classList.add('revealed'), 800);
  button.addEventListener('click', () => {
    if (quotes.length < 2) return;
    // Pick among all the other indices without retries or immediate repeats.
    const next = Math.floor(Math.random() * (quotes.length - 1));
    current = next >= current ? next + 1 : next;
    render();
    content.classList.remove('changing');
    void content.offsetWidth;
    content.classList.add('changing');
  });
})();
