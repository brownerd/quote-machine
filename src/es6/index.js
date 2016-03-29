import '../stylus/style.styl';
import $ from 'jquery';

const Quoter = (function () {
  const key = 'hRj4tEZwrEmshFrFdJAyz2WleJSJp1F1WUqjsnVpvWDr5CQRb2';
  const url = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies';
  const pen = 'http://codepen.io/brownerd/pen/7d703f11a56da390fcf0e5a2a709fe87';
  const $next = $("[rel='next']");
  const $tweet = $("[rel='tweet']");
  const $quote = $("[rel='quote']");
  const $author = $("[rel='author']");

  // Not necessary, but used it for an archive feature later...maybe
  const storeQuote = [];

  window.twttr = (function (d, s, id) {
    let js = undefined;
    const fjs = d.getElementsByTagName(s)[0];
    const t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  }(document, 'script', 'twitter-wjs'));

  function newQuote() {
    $.ajax({
      url,
      type: 'POST',
      data: {},
      datatype: 'json',
      success(data) {
        storeQuote.push($.parseJSON(data));
        $quote.html(storeQuote[storeQuote.length - 1].quote);
        $author.html(storeQuote[storeQuote.length - 1].author);

        const shareUrl = `encodeURIComponent(
          storeQuote[storeQuote.length - 1].quote~storeQuote[storeQuote.length - 1].author
        )${pen}`;

        const shareQuote = `https://twitter.com/intent/tweet?text=${shareUrl}`;

        $tweet.attr('href', shareQuote);
      },
      // error(err) {
      //   $quote.html('Looks like the API is down, try refreshing the page');
      //   $author.html('Sorry');
      // },
      beforeSend(xhr) {
        xhr.setRequestHeader('X-Mashape-Authorization', key);
      },
    });
  }

  function init() {
    newQuote();
    $next.click((e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if ($quote.hasClass('animate-reveal--1')) {
        $quote.removeClass('animate-reveal--1');
        $quote.addClass('animate-reveal--2');
      } else {
        $quote.removeClass('animate-reveal--2');
        $quote.addClass('animate-reveal--1');
      }
      newQuote();
    });
  }

  return {
    init,
    sq: storeQuote,
  };
}());

$(document).ready(Quoter.init);
