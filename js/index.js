  var currentQuote = '';
  var currentAuthor = '';

function getQuote(){  
    
    var request = new XMLHttpRequest();

    TweenMax.to([text, author], 0.5,{opacity: 0}); 
    
    request.open('GET', 'https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&' + Math.random(), true);
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        console.log("Success!");
        
        var data = JSON.parse(request.responseText);
        console.log(data);
       
        currentQuote = text.innerHTML = data.quoteText;
        currentAuthor = author.innerHTML = "-" + data.quoteAuthor;
        
        TweenMax.to([text, author], 0.5,{opacity: 1, delay: 0.8});
        
      } else {
        console.log("Server returned error.");
      }
    };
    
    request.onerror = function(){
      console.log("Error sending request.");
      
      var backupQuotes = {
          1: ["Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.", 'Gen. George S. Patton'],
          2: ["If opportunity doesn't knock, build a door.", 'Saint Augustine'],
          3: ["If you believe in yourself and have dedication and pride - and never quit, you'll be a winner. The price of victory is high but so are the rewards.", 'Paul Bryant'],
          4: ["Keep your face always toward the sunshine - and shadows will fall behind you.", 'Walt Whitman']
        }
        
      var backupQuoteNum = Math.ceil(Math.random() * Object.keys(backupQuotes).length);

      text.innerHTML = backupQuotes[backupQuoteNum][0];
      author.innerHTML = "-" + backupQuotes[backupQuoteNum][1];
      
      TweenMax.to([text, author], 0.8,{opacity: 1});
      };
    
    request.send();  
  };

window.addEventListener("load", function(event){
  
  getQuote();
  
  var newQuote = document.querySelector('#new-quote'); 
  var tweetQuote = document.querySelector('#tweet-quote');

  newQuote.addEventListener("click", getQuote);
  
  tweetQuote.addEventListener("click", function(){
    tweetQuote.setAttribute('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });

});