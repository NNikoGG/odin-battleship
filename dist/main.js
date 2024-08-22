(()=>{"use strict";var n={748:(n,t,e)=>{e.d(t,{A:()=>c});var r=e(354),o=e.n(r),a=e(314),i=e.n(a)()(o());i.push([n.id,".board {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  width: 300px;\n  height: 300px;\n}\n\n.cell {\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n\n.ship {\n  background-color: #999;\n}\n\n.hit {\n  background-color: #f00;\n}\n\n.miss {\n  background-color: #00f;\n}\n\n#message {\n  display: none;\n  margin-top: 20px;\n  font-size: 24px;\n  font-weight: bold;\n}\n\n#game-container {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 20px;\n}\n\n.gameboard {\n  margin: 0 10px;\n}\n","",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"AAAA;EACE,aAAa;EACb,sCAAsC;EACtC,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA;EACE,cAAc;AAChB",sourcesContent:[".board {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  width: 300px;\n  height: 300px;\n}\n\n.cell {\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n\n.ship {\n  background-color: #999;\n}\n\n.hit {\n  background-color: #f00;\n}\n\n.miss {\n  background-color: #00f;\n}\n\n#message {\n  display: none;\n  margin-top: 20px;\n  font-size: 24px;\n  font-weight: bold;\n}\n\n#game-container {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 20px;\n}\n\n.gameboard {\n  margin: 0 10px;\n}\n"],sourceRoot:""}]);const c=i},314:n=>{n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e="",r=void 0!==t[5];return t[4]&&(e+="@supports (".concat(t[4],") {")),t[2]&&(e+="@media ".concat(t[2]," {")),r&&(e+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),e+=n(t),r&&(e+="}"),t[2]&&(e+="}"),t[4]&&(e+="}"),e})).join("")},t.i=function(n,e,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(i[l]=!0)}for(var s=0;s<n.length;s++){var u=[].concat(n[s]);r&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),e&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=e):u[2]=e),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),t.push(u))}},t}},354:n=>{n.exports=function(n){var t=n[1],e=n[3];if(!e)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},72:n=>{var t=[];function e(n){for(var e=-1,r=0;r<t.length;r++)if(t[r].identifier===n){e=r;break}return e}function r(n,r){for(var a={},i=[],c=0;c<n.length;c++){var l=n[c],s=r.base?l[0]+r.base:l[0],u=a[s]||0,d="".concat(s," ").concat(u);a[s]=u+1;var f=e(d),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var y=o(p,r);r.byIndex=c,t.splice(c,0,{identifier:d,updater:y,references:1})}i.push(d)}return i}function o(n,t){var e=t.domAPI(t);return e.update(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap&&t.supports===n.supports&&t.layer===n.layer)return;e.update(n=t)}else e.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=e(a[i]);t[c].references--}for(var l=r(n,o),s=0;s<a.length;s++){var u=e(a[s]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}a=l}}},659:n=>{var t={};n.exports=function(n,e){var r=function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}t[n]=e}return t[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}},540:n=>{n.exports=function(n){var t=document.createElement("style");return n.setAttributes(t,n.attributes),n.insert(t,n.options),t}},56:(n,t,e)=>{n.exports=function(n){var t=e.nc;t&&n.setAttribute("nonce",t)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=n.insertStyleElement(n);return{update:function(e){!function(n,t,e){var r="";e.supports&&(r+="@supports (".concat(e.supports,") {")),e.media&&(r+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(r+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),r+=e.css,o&&(r+="}"),e.media&&(r+="}"),e.supports&&(r+="}");var a=e.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,n,t.options)}(t,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)}}}},113:n=>{n.exports=function(n,t){if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return n[r](a,a.exports,e),a.exports}e.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return e.d(t,{a:t}),t},e.d=(n,t)=>{for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},e.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),e.nc=void 0,(()=>{var n=e(72),t=e.n(n),r=e(825),o=e.n(r),a=e(659),i=e.n(a),c=e(56),l=e.n(c),s=e(540),u=e.n(s),d=e(113),f=e.n(d),p=e(748),y={};function m(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=Array(t);e<t;e++)r[e]=n[e];return r}function v(n){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},v(n)}y.styleTagTransform=f(),y.setAttributes=l(),y.insert=i().bind(null,"head"),y.domAPI=o(),y.insertStyleElement=u(),t()(p.A,y),p.A&&p.A.locals&&p.A.locals;const h=function(){var n,t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).isAI||!1,e=[],r=function(n,t){var e=n.x,r=n.y;return[{dx:0,dy:-1,name:"up"},{dx:1,dy:0,name:"right"},{dx:0,dy:1,name:"down"},{dx:-1,dy:0,name:"left"}].map((function(n){var o=n.dx,a=n.dy,i=n.name,c=e+o,l=r+a;return c>=0&&c<10&&l>=0&&l<10?{tile:t.board[l][c],direction:i}:null})).filter(Boolean)};return{get isAI(){return t},get gameboard(){return n},set gameboard(t){n=t},get hitTilesAI(){return e},recordHit:function(n,t,r){e.push({x:n,y:t,ship:r.ship})},playMoveAI:function(n){if(!n||"object"!==v(n)||Array.isArray(n))throw new Error("Invalid gameboard");var t=n.board.flat().filter((function(n){return!n.isHit}));if(0===t.length)throw new Error("No available moves");var o,a=e.filter((function(n){return n.ship&&!n.ship.isSunk()})),i=function(n,t){var e="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!e){if(Array.isArray(n)||(e=function(n,t){if(n){if("string"==typeof n)return m(n,t);var e={}.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?m(n,t):void 0}}(n))||t&&n&&"number"==typeof n.length){e&&(n=e);var r=0,o=function(){};return{s:o,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){e=e.call(n)},n:function(){var n=e.next();return i=n.done,n},e:function(n){c=!0,a=n},f:function(){try{i||null==e.return||e.return()}finally{if(c)throw a}}}}(a);try{for(i.s();!(o=i.n()).done;){var c=o.value,l=r(c,n).filter((function(n){return!n.tile.isHit}));if(l.length>0){var s=l[Math.floor(Math.random()*l.length)].tile;return{x:s.x,y:s.y}}}}catch(n){i.e(n)}finally{i.f()}var u=t[Math.floor(Math.random()*t.length)];return{x:u.x,y:u.y}},getAdjacentTiles:r}};function A(n){return A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},A(n)}function g(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,a,i,c=[],l=!0,s=!1;try{if(a=(e=e.call(n)).next,0===t){if(Object(e)!==e)return;l=!1}else for(;!(l=(r=a.call(e)).done)&&(c.push(r.value),c.length!==t);l=!0);}catch(n){s=!0,o=n}finally{try{if(!l&&null!=e.return&&(i=e.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(n,t)||function(n,t){if(n){if("string"==typeof n)return b(n,t);var e={}.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?b(n,t):void 0}}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=Array(t);e<t;e++)r[e]=n[e];return r}const x=function(){var n=Array(10).fill().map((function(){return Array(10).fill().map((function(){return{isHit:!1,ship:null,isTaken:!1}}))})),t=[],e=function(n,t){return n>=0&&n<10&&t>=0&&t<10},r=function(t,r){return e(t,r)?n[r][t]:null},o=function(n,t){var e;return(null===(e=r(n,t))||void 0===e?void 0:e.isTaken)||!1},a=function(n){var t=i(n,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}),e=t.x,r=t.y;({horizontal:function(){return c(n,e,r,(function(n){return[e+n,r]}))},vertical:function(){return c(n,e,r,(function(n){return[e,r+n]}))}})[t.direction]()},i=function(n,t){var r=t.x,a=t.y,i=t.horizontally,c=t.vertically;if(void 0===r||void 0===a)throw new Error("Specify both x and y coordinates");if(void 0===i&&void 0===c||i&&c)throw new Error("Specify one ship placement direction");var l=i?"horizontal":"vertical",s="horizontal"===l?r+n.length-1:r,u="vertical"===l?a+n.length-1:a;if(!e(r,a)||!e(s,u))throw new Error("Ship placement out of bounds");if(!function(n,t){for(var r=t.x,a=t.y,i=t.direction,c=0;c<n.length;c++){var l="horizontal"===i?r+c:r,s="vertical"===i?a+c:a;if(!e(l,s)||o(l,s))return!1}return!0}(n,{x:r,y:a,direction:l}))throw new Error("Cannot place ship on this square");return{x:r,y:a,direction:l}},c=function(n,t,e,o){for(var a=0;a<n.length;a++){var i=g(o(a),2),c=i[0],s=i[1],u=r(c,s);u&&(u.ship=n,u.index=a,u.isTaken=!0)}l(n,t,e,o)},l=function(n,t,e,o){for(var a=function(){var n=g(o(i),2),t=n[0],e=n[1];[-1,0,1].forEach((function(n){return[-1,0,1].forEach((function(o){var a=r(t+n,e+o);a&&(a.isTaken=!0)}))}))},i=-1;i<=n.length;i++)a()},s=function(){for(var t=0;t<10;t++)for(var e=0;e<10;e++)n[t][e]={isHit:!1,ship:null,isTaken:!1}};return{get board(){return n},placeShip:a,receiveAttack:function(n){var e=n.x,o=n.y,a=r(e,o);return console.log("Attempting attack at (".concat(e,", ").concat(o,"):"),a),a?a.isHit?(console.log("Already hit"),!1):(a.isHit=!0,a.ship?(console.log("Hit ship"),a.ship.hit(a.index)):(console.log("Missed"),t.push({x:e,y:o})),!0):(console.log("Invalid coordinates"),!1)},placeShipsRandomly:function(n){for(var t=0;s(),!n.every((function(n){for(var t=!1,e=0;e<100&&!t;e++){var r="horizontal"==(Math.random()<.5?"horizontal":"vertical")?"horizontally":"vertically",o=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());try{a(n,(c={x:o,y:i},s=!0,(l=function(n){var t=function(n,t){if("object"!=A(n)||!n)return n;var e=n[Symbol.toPrimitive];if(void 0!==e){var r=e.call(n,"string");if("object"!=A(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(n);return"symbol"==A(t)?t:t+""}(l=r))in c?Object.defineProperty(c,l,{value:s,enumerable:!0,configurable:!0,writable:!0}):c[l]=s,c)),t=!0}catch(n){}}var c,l,s;return t}));)if(++t>=1e3)throw new Error("Unable to place ships after maximum attempts")},isAllShipsSunk:function(){return n.flat().every((function(n){return!n.ship||n.ship.isSunk()}))},getMissedAttacks:function(){return[].concat(t)}}},E=function(n){if(void 0===n||n<1||n>5)throw new Error("Length must be between 1 and 5");var t=Array(n).fill(0);return{length:n,hitBox:t,hit:function(e){if(void 0===e||"number"!=typeof e||e<0||e>=n)throw new Error("Invalid index");t[e]=1},isSunk:function(){return t.every((function(n){return 1===n}))}}};var S,C,w,I;const k=(S=document.getElementById("player-board"),C=document.getElementById("enemy-board"),w=document.getElementById("message"),I=function(n,t){for(var e='<div class="board">',r=0;r<10;r++)for(var o=0;o<10;o++){var a=n[r][o],i="cell";a.isHit?i+=a.ship?" hit":" miss":!t&&a.ship&&(i+=" ship"),e+='<div class="'.concat(i,'" data-x="').concat(o,'" data-y="').concat(r,'"></div>')}return e+"</div>"},{renderGameboards:function(n,t){S.innerHTML=I(n.board,!1),C.innerHTML=I(t.board,!0)},updateGameboard:function(n,t,e){var r=("player"===t?S:C).querySelector('[data-x="'.concat(e.x,'"][data-y="').concat(e.y,'"]'));if(r){var o=n.board[e.y][e.x];o.isHit&&r.classList.add(o.ship?"hit":"miss")}},addAttackListener:function(n){C.addEventListener("click",(function(t){var e=t.target.closest(".cell");if(e){var r=parseInt(e.dataset.x),o=parseInt(e.dataset.y);console.log("Cell clicked: (".concat(r,", ").concat(o,")")),n(r,o)}}))},displayEndGame:function(n){w.textContent=n,w.style.display="block"},displayMessage:function(n){w&&(w.textContent=n,w.style.display="block",setTimeout((function(){w.textContent="",w.style.display="none"}),2e3))},displayMissedAttacks:function(n,t){n.getMissedAttacks().forEach((function(n){var e=n.x,r=n.y,o=t.querySelector('[data-x="'.concat(e,'"][data-y="').concat(r,'"]'));o&&o.classList.add("miss")}))},displayShipPlacement:function(n){var t=document.getElementById("player-board"),e=document.createElement("button");e.textContent="Rotate Ship";var r=!0;e.addEventListener("click",(function(){r=!r})),t.addEventListener("click",(function(t){var e=t.target.closest(".cell");if(e){var o=parseInt(e.dataset.x),a=parseInt(e.dataset.y);n(o,a,r)}})),t.parentNode.insertBefore(e,t)},hideShipPlacement:function(){var n=document.querySelector("button");n&&n.remove()}});var B,M,T,j,L,H,P,z,O,G,N;const R=(j=function(n,t){t.forEach((function(t,e){for(var r=!1,o=0;o<10&&!r;o++)for(var a=0;a<10&&!r;a++)try{n.placeShip(t,{x:a,y:o,horizontally:!0}),r=!0}catch(e){try{n.placeShip(t,{x:a,y:o,vertically:!0}),r=!0}catch(n){}}r||console.error("Failed to place ship ".concat(e))}))},L=function(){var n=[E(5),E(4),E(3),E(3),E(2)],t=0;k.displayShipPlacement((function(e,r,o){try{B.gameboard.placeShip(n[t],{x:e,y:r,horizontally:o,vertically:!o}),k.renderGameboards(B.gameboard,M.gameboard),++t>=n.length&&H()}catch(n){k.displayMessage(n.message)}}))},H=function(){k.hideShipPlacement(),P()},P=function(){k.addAttackListener((function(n,t){T===B&&z(n,t)}))},z=function(n,t){if(T===B){var e=M.gameboard;console.log("Player attempting move at (".concat(n,", ").concat(t,")")),e.receiveAttack({x:n,y:t})?(k.updateGameboard(e,"enemy",{x:n,y:t}),e.isAllShipsSunk()?N("Player wins!"):O()):k.displayMessage("Invalid move. Try again.")}else console.log("Not player's turn")},O=function(){T=T===B?M:B,console.log("Switched turn to:",T===B?"Player":"AI"),T===M&&setTimeout(G,1e3)},G=function(){try{var n=M.playMoveAI(B.gameboard);if(!n||"number"!=typeof n.x||"number"!=typeof n.y)throw new Error("Invalid move returned by AI");if(console.log("AI attempting move at (".concat(n.x,", ").concat(n.y,")")),B.gameboard.receiveAttack(n)){var t=B.gameboard.board[n.y][n.x];M.recordHit(n.x,n.y,t),k.updateGameboard(B.gameboard,"player",n),B.gameboard.isAllShipsSunk()?N("Computer wins!"):O()}else console.error("AI made an invalid move"),N("Game ended due to AI error")}catch(n){console.error("AI move error:",n),N("Game ended due to AI error")}},N=function(n){k.displayEndGame(n)},{init:function(){B=h(),M=h({isAI:!0}),T=B,B.gameboard=x(),M.gameboard=x();var n=[E(5),E(4),E(3),E(3),E(2)];try{M.gameboard.placeShipsRandomly(n)}catch(t){console.error("Failed to place ships randomly:",t),j(M.gameboard,n)}k.renderGameboards(B.gameboard,M.gameboard),L()}});document.addEventListener("DOMContentLoaded",(function(){R.init()}))})()})();
//# sourceMappingURL=main.js.map