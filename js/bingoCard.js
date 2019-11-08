var bandsPool = [{
  "a": "Kinks"
}, {
  "a": "The Clash"
}, {
  "a": "Doors"
}, {
  "a": "Queen"
}, {
  "a": "David Bowie"
}, {
  "a": "Beatles"
}, {
  "a": "Dead Kennedys"
}, {
  "a": "Elvis"
}, {
  "a": "Roy Ayers"
}, {
  "a": "Osibisa"
}];
var bandTemplate = "<div class='artists'><input type='text' name='a' class='qinput' value='{a}' /> <i class='delete fas fa-times' title='delete'></i></div>";

function getCard() {
  var card = {};
  card.positions = [];
  for (var i = 0; i < 9; i++) {
    var num = getRandomPos();
    while (card[num] !== undefined) {
      num = getRandomPos();
    }
    card[num] = bandsPool[num];
    card.positions.push(num);
  }
  card.positions = card.positions.sort().join();
  return card;
}

function getRandomPos() {
  return Math.round(Math.random() * 100 % (bandsPool.length - 1));
}

function getCards(numOfCards) {
  var cards = {};
  for (var i = 0; i < numOfCards; i++) {
    var card = getCard();
    while (cards[card.positions]) {
      card = getCard();
    }
    cards[card.positions] = card;
  }
  return cards;
}

function fact(num) {
  if (num === 0) return 1;
  return num * fact(num - 1);
}

function nOverK(n, k) {
  return fact(n) / (fact(k) * fact(n - k));
}

function renderCards(cards) {
  var html = "";
  for (var key in cards) {
    if (cards.hasOwnProperty(key)) {
      //  console.log("cards[key]",cards[key])
      html += "<div class='card'>" + renderCard(cards[key]) + "</div>"
    }
  }
  return html;
}

function renderCard(card) {
  var html = "";
  for (var key in card) {
    if (key !== "positions" && card.hasOwnProperty(key)) {
      if(card[key].a.indexOf("http") === 0)
      {
         html += "<span class='cardItem' style='background-image:url(" + card[key].a + ");'>&nbsp;</span>";
      }
      else {
         html += "<span class='cardItem'>" + card[key].a + "</span>";
      }

    }
  }
  return html;
}

function initbandsPool() {
  var bandsHtml = ""; // $("#bands");
  var savedBands = localStorage.getItem("bandsPool");
  if (savedBands) {
    bandsPool = JSON.parse(savedBands);
  }
  for (var i = 0, len = bandsPool.length; i < len; i++) {
    bandsHtml += bandTemplate.replace("{a}",bandsPool[i].a);
  }
  $("#bands").empty().html(bandsHtml);
}

function setbandsPoolByForm() {
  var artists = $(".artists");
  bandsPool = $.map(artists, function(elem, i) {
    var a = $(elem).find("[name='a']").val();
    if (!a) {
      return null; //remove from list
    }
    return {
      a: a,
    }
  });
  localStorage.setItem("bandsPool", JSON.stringify(bandsPool));
  initbandsPool();//will remove empty rows of bands and fill missing a
}
function generateBingoCards()
{
  var numOfRequestedCards = $("#numOfCards").val();
  $("#cards").empty();
  setbandsPoolByForm();
  if (nOverK(bandsPool.length, 9) < numOfRequestedCards) {
    $(".logger").text("you need more bands for generating " + numOfRequestedCards + " cards")
  } else {
    var cards = getCards(numOfRequestedCards);
    $("#cards").html(renderCards(cards));
    $("#print").removeClass("hidden");
  }
}
initbandsPool();
generateBingoCards();
///events
$("#generate").on("click", generateBingoCards);
$("#bands").on("click", ".delete", function(e) {
  $(this).closest(".artists").remove();
});
$("#addBand").on("click", function(e) {
  $("#bands").append(bandTemplate.replace("{a}"));
});
