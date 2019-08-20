// $(function()
// {
//     $("#bingoGen").on("click", function()
//     {
//         //retrieve values from textbox
//         var bdlst = $('#bands').val().split(/\n/);

//         //create an array
//         var texts = [];
//         for (var i=0; i < bdlst.length; i++) {
//             // only push this line if it contains a non whitespace character.
//             if (/\S/.test(bdlst[i])) {
//                 texts.push($.trim(bdlst[i]).split(","));
//             }
//             if (/^[,]+$/.test(bdlst[i][i])) {
//                 texts.push($.trim(bdlst[i][i]));
//             }
//         }

//         console.log(texts);
//     });
// });
import {render} from 'react-dom';

'use strict';

ReactDOM.render(React.createElement(
  'h1',
  null,
  'Hello, world!'
), document.getElementById('root'));