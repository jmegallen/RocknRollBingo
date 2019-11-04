var questionsPool = [{
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
var questionTemplate = "<div class='qNa'><input type='text' name='a' value='{a}' /> <i class='delete' title='delete'>X</i></div>";

 $(function()
 {
     $("#bingoGen").on("click", function()
     {
         //retrieve values from textbox
         var bdlst = $('#bands').val().split(/\n/);

         //create an array
         var texts = [];
         for (var i=0; i < bdlst.length; i++) {
              only push this line if it contains a non whitespace character.
             if (/\S/.test(bdlst[i])) {
                 texts.push($.trim(bdlst[i]).split(","));
             }
             if (/^[,]+$/.test(bdlst[i][i])) {
                 texts.push($.trim(bdlst[i][i]));
             }
         }

         console.log(texts);
     });
 });

function getCard() {
  var card = {};
  card.positions = [];
  for (var i = 0; i < 9; i++) {
    var num = getRandomPos();
    while (card[num] !== undefined) {
      num = getRandomPos();
    }
    card[num] = questionsPool[num];
    card.positions.push(num);
  }
  card.positions = card.positions.sort().join();
  return card;
}

function getRandomPos() {
  return Math.round(Math.random() * 100 % (questionsPool.length - 1));
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
         html += "<span class='cardItem' style='background-repeat:no-repeat;background-position: center center;background-size:contain;background-image:url(" + card[key].a + ");'>&nbsp;</span>";
      }
      else {
         html += "<span class='cardItem'>" + card[key].a + "</span>";
      }

    }
  }
  return html;
}

function initQuestionsPool() {
  var questionsHtml = ""; // $("#questions");
  var savedQuestions = localStorage.getItem("questionsPool");
  if (savedQuestions) {
    questionsPool = JSON.parse(savedQuestions);
  }
  for (var i = 0, len = questionsPool.length; i < len; i++) {
    questionsHtml += questionTemplate.replace("{a}",questionsPool[i].a);
  }
  $("#questions").empty().html(questionsHtml);
}

function setQuestionsPoolByForm() {
  var qNa = $(".qNa");
  questionsPool = $.map(qNa, function(elem, i) {
    var a = $(elem).find("[name='a']").val();
    if (!a) {
      return null; //remove from list
    }
    return {
      a: a,
    }
  });
  localStorage.setItem("questionsPool", JSON.stringify(questionsPool));
  initQuestionsPool();//will remove empty rows of questions and fill missing a
}
function generateBingoCards()
{
  var numOfRequestedCards = $("#numOfCards").val();
  $("#cards").empty();
  setQuestionsPoolByForm();
  if (nOverK(questionsPool.length, 9) < numOfRequestedCards) {
    $(".logger").text("you need more questions for generating " + numOfRequestedCards + "cards")
  } else {
    var cards = getCards(numOfRequestedCards);
    $("#cards").html(renderCards(cards));
    $("#print").removeClass("hidden");
  }
}
initQuestionsPool();
generateBingoCards();
///events
$("#generate").on("click", generateBingoCards);
$("#questions").on("click", ".delete", function(e) {
  $(this).closest(".qNa").remove();
});
$("#addQuestion").on("click", function(e) {
  $("#questions").append(questionTemplate.replace("{a}"));
});