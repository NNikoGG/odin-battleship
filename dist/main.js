(()=>{"use strict";var n={748:(n,e,t)=>{t.d(e,{A:()=>c});var r=t(354),o=t.n(r),a=t(314),i=t.n(a)()(o());i.push([n.id,"body {\n  font-family: 'Courier New', monospace;\n  background-color: #1a1a2e;\n  color: #ffffff;\n  margin: 0;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  color: #ffffff;\n  font-size: 3rem;\n  text-transform: uppercase;\n  letter-spacing: 5px;\n  margin-bottom: 30px;\n  text-shadow:\n    0 0 10px #4a4ae9,\n    0 0 20px #4a4ae9,\n    0 0 30px #4a4ae9;\n}\n\n#game-container {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 40px;\n  margin-top: 20px;\n}\n\n.gameboard {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #16213e;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 0 20px rgba(74, 74, 233, 0.5);\n}\n\n.board-label {\n  font-size: 1.2rem;\n  font-weight: bold;\n  margin-bottom: 10px;\n  color: #4a4ae9;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  gap: 1px;\n  width: 300px;\n  height: 300px;\n  border: 2px solid #4a4ae9;\n  background-color: #0f3460;\n}\n\n.cell {\n  background-color: #1a1a2e;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.cell:hover {\n  background-color: #4a4ae9;\n}\n\n.ship {\n  background-color: #4caf50;\n}\n\n.hit {\n  background-color: #f44336;\n}\n\n.miss {\n  background-color: #2196f3;\n}\n\n#message {\n  margin-top: 20px;\n  padding: 10px;\n  font-size: 1.2rem;\n  font-weight: bold;\n  text-align: center;\n  background-color: #16213e;\n  border-radius: 4px;\n  box-shadow: 0 0 10px rgba(74, 74, 233, 0.5);\n}\n\nbutton {\n  display: inline-block;\n  margin: 10px;\n  padding: 10px 20px;\n  font-size: 1rem;\n  font-family: 'Courier New', monospace;\n  background-color: #e94560;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition:\n    background-color 0.3s,\n    transform 0.1s;\n}\n\nbutton:hover {\n  background-color: #d63651;\n  transform: translateY(-2px);\n}\n\nbutton:active {\n  transform: translateY(0);\n}\n\n#rotate-ship {\n  background-color: #4a4ae9;\n}\n\n#rotate-ship:hover {\n  background-color: #3a3ad9;\n}\n","",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"AAAA;EACE,qCAAqC;EACrC,yBAAyB;EACzB,cAAc;EACd,SAAS;EACT,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,yBAAyB;EACzB,mBAAmB;EACnB,mBAAmB;EACnB;;;oBAGkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,uBAAuB;EACvB,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,2CAA2C;AAC7C;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,QAAQ;EACR,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,eAAe;EACf,iCAAiC;AACnC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,2CAA2C;AAC7C;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,qCAAqC;EACrC,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf;;kBAEgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,2BAA2B;AAC7B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B",sourcesContent:["body {\n  font-family: 'Courier New', monospace;\n  background-color: #1a1a2e;\n  color: #ffffff;\n  margin: 0;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  color: #ffffff;\n  font-size: 3rem;\n  text-transform: uppercase;\n  letter-spacing: 5px;\n  margin-bottom: 30px;\n  text-shadow:\n    0 0 10px #4a4ae9,\n    0 0 20px #4a4ae9,\n    0 0 30px #4a4ae9;\n}\n\n#game-container {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 40px;\n  margin-top: 20px;\n}\n\n.gameboard {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #16213e;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 0 20px rgba(74, 74, 233, 0.5);\n}\n\n.board-label {\n  font-size: 1.2rem;\n  font-weight: bold;\n  margin-bottom: 10px;\n  color: #4a4ae9;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  gap: 1px;\n  width: 300px;\n  height: 300px;\n  border: 2px solid #4a4ae9;\n  background-color: #0f3460;\n}\n\n.cell {\n  background-color: #1a1a2e;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.cell:hover {\n  background-color: #4a4ae9;\n}\n\n.ship {\n  background-color: #4caf50;\n}\n\n.hit {\n  background-color: #f44336;\n}\n\n.miss {\n  background-color: #2196f3;\n}\n\n#message {\n  margin-top: 20px;\n  padding: 10px;\n  font-size: 1.2rem;\n  font-weight: bold;\n  text-align: center;\n  background-color: #16213e;\n  border-radius: 4px;\n  box-shadow: 0 0 10px rgba(74, 74, 233, 0.5);\n}\n\nbutton {\n  display: inline-block;\n  margin: 10px;\n  padding: 10px 20px;\n  font-size: 1rem;\n  font-family: 'Courier New', monospace;\n  background-color: #e94560;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition:\n    background-color 0.3s,\n    transform 0.1s;\n}\n\nbutton:hover {\n  background-color: #d63651;\n  transform: translateY(-2px);\n}\n\nbutton:active {\n  transform: translateY(0);\n}\n\n#rotate-ship {\n  background-color: #4a4ae9;\n}\n\n#rotate-ship:hover {\n  background-color: #3a3ad9;\n}\n"],sourceRoot:""}]);const c=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(i[l]=!0)}for(var s=0;s<n.length;s++){var d=[].concat(n[s]);r&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},354:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */");return[e].concat([a]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],c=0;c<n.length;c++){var l=n[c],s=r.base?l[0]+r.base:l[0],d=a[s]||0,u="".concat(s," ").concat(d);a[s]=d+1;var A=t(u),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==A)e[A].references++,e[A].updater(f);else{var p=o(f,r);r.byIndex=c,e.splice(c,0,{identifier:u,updater:p,references:1})}i.push(u)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var l=r(n,o),s=0;s<a.length;s++){var d=t(a[s]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}a=l}}},659:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return n[r](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n=t(72),e=t.n(n),r=t(825),o=t.n(r),a=t(659),i=t.n(a),c=t(56),l=t.n(c),s=t(540),d=t.n(s),u=t(113),A=t.n(u),f=t(748),p={};function m(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}p.styleTagTransform=A(),p.setAttributes=l(),p.insert=i().bind(null,"head"),p.domAPI=o(),p.insertStyleElement=d(),e()(f.A,p),f.A&&f.A.locals&&f.A.locals;const g=function(){var n,e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).isAI||!1,t=[],r=function(n,e){var t=n.x,r=n.y;return[{dx:0,dy:-1,name:"up"},{dx:1,dy:0,name:"right"},{dx:0,dy:1,name:"down"},{dx:-1,dy:0,name:"left"}].map((function(n){var o=n.dx,a=n.dy,i=n.name,c=t+o,l=r+a;return c>=0&&c<10&&l>=0&&l<10?{tile:e.board[l][c],direction:i}:null})).filter(Boolean)};return{get isAI(){return e},get gameboard(){return n},set gameboard(e){n=e},get hitTilesAI(){return t},recordHit:function(n,e,r){t.push({x:n,y:e,ship:r.ship}),console.log("Hit recorded:",{x:n,y:e,ship:r.ship}),console.log("Current hitTilesAI:",t)},playMoveAI:function(n){console.log("AI is attempting to make a move"),console.log("Enemy gameboard:",n);var e=n.board.flat().filter((function(n){return!n.isHit}));if(console.log("Unhit tiles:",e),0===e.length)return console.log("No available moves"),null;var o=t.filter((function(n){return n.ship&&!n.ship.isSunk()}));if(o.length>0){console.log("AI found hit ship tiles:",o);var a,i=function(n,e){var t="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=function(n,e){if(n){if("string"==typeof n)return m(n,e);var t={}.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?m(n,e):void 0}}(n))||e&&n&&"number"==typeof n.length){t&&(n=t);var r=0,o=function(){};return{s:o,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return i=n.done,n},e:function(n){c=!0,a=n},f:function(){try{i||null==t.return||t.return()}finally{if(c)throw a}}}}(o);try{for(i.s();!(a=i.n()).done;){var c=a.value,l=r(c,n).filter((function(n){return!n.tile.isHit}));if(l.length>0){var s=l[Math.floor(Math.random()*l.length)].tile;return console.log("AI chose adjacent tile:",s),{x:s.x,y:s.y}}}}catch(n){i.e(n)}finally{i.f()}}var d=e[Math.floor(Math.random()*e.length)];console.log("Random tile chosen:",d);var u=n.board.findIndex((function(n){return n.includes(d)})),A=n.board[u].indexOf(d);if(-1===u||-1===A){console.error("Invalid random tile selected:",d);for(var f=0;f<n.board.length;f++)for(var p=0;p<n.board[f].length;p++)if(!n.board[f][p].isHit)return console.log("Fallback tile:",n.board[f][p]),{x:p,y:f};return console.error("No valid moves available"),null}return{x:u,y:A}},getAdjacentTiles:r}};function y(n){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},y(n)}const h=function(){var n=Array(10).fill().map((function(n,e){return Array(10).fill().map((function(n,t){return{x:t,y:e,isHit:!1,ship:null,isTaken:!1}}))})),e=[],t=function(n,e){return n>=0&&n<10&&e>=0&&e<10},r=function(e,r){return t(e,r)?n[r][e]:null},o=function(n,e){var t=e.x,o=e.y,i=e.horizontally,c=e.vertically;if(!i&&!c)throw new Error("Ship must be placed either horizontally or vertically");if(!a(n,{x:t,y:o,direction:i?"horizontal":"vertical"}))throw new Error("Cannot place ship at specified coordinates");for(var l=0;l<n.length;l++){var s=r(i?t+l:t,c?o+l:o);s.ship=n,s.index=l,s.isTaken=!0}for(var d=function(){var n=i?t+u:t,e=c?o+u:o;[-1,0,1].forEach((function(t){return[-1,0,1].forEach((function(o){var a=r(n+t,e+o);a&&(a.isTaken=!0)}))}))},u=-1;u<=n.length;u++)d()},a=function(n,e){for(var r=e.x,o=e.y,a=e.direction,c=0;c<n.length;c++){var l="horizontal"===a?r+c:r,s="vertical"===a?o+c:o;if(!t(l,s)||i(l,s))return!1}return!0},i=function(n,e){var t=r(n,e);return!!t&&t.isTaken},c=function(){for(var e=0;e<10;e++)for(var t=0;t<10;t++)n[e][t]={isHit:!1,ship:null,isTaken:!1}};return{get board(){return n},placeShip:o,receiveAttack:function(n){var t=n.x,o=n.y,a=r(t,o);return console.log("Attempting attack at (".concat(t,", ").concat(o,"):"),a),a?a.isHit?(console.log("Already hit"),!1):(a.isHit=!0,a.ship?(console.log("Hit ship"),a.ship.hit(a.index)):(console.log("Missed"),e.push({x:t,y:o})),!0):(console.log("Invalid coordinates"),!1)},placeShipsRandomly:function(n){for(var e=0;c(),!n.every((function(n){for(var e=!1,t=0;t<100&&!e;t++){var r="horizontal"==(Math.random()<.5?"horizontal":"vertical")?"horizontally":"vertically",a=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());try{o(n,(c={x:a,y:i},s=!0,(l=function(n){var e=function(n,e){if("object"!=y(n)||!n)return n;var t=n[Symbol.toPrimitive];if(void 0!==t){var r=t.call(n,"string");if("object"!=y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(n);return"symbol"==y(e)?e:e+""}(l=r))in c?Object.defineProperty(c,l,{value:s,enumerable:!0,configurable:!0,writable:!0}):c[l]=s,c)),e=!0}catch(n){}}var c,l,s;return e}));)if(++e>=1e3)throw new Error("Unable to place ships after maximum attempts")},isAllShipsSunk:function(){return n.flat().every((function(n){return!n.ship||n.ship.isSunk()}))},getMissedAttacks:function(){return[].concat(e)},isHit:function(n){var e=n.x,t=n.y,o=r(e,t);return o&&o.isHit&&null!==o.ship},getAvailableMoves:function(){return n.flat().filter((function(n){return!n.isHit}))}}},b=function(n){if(void 0===n||n<1||n>5)throw new Error("Length must be between 1 and 5");var e=Array(n).fill(0);return{length:n,hitBox:e,hit:function(t){if(void 0===t||"number"!=typeof t||t<0||t>=n)throw new Error("Invalid index");e[t]=1},isSunk:function(){return e.every((function(n){return 1===n}))}}};var v,x,E,B,C;const k=(v=document.getElementById("player-board"),x=document.getElementById("enemy-board"),E=document.getElementById("message"),B=function(n,e){for(var t='<div class="board">',r=0;r<10;r++)for(var o=0;o<10;o++){var a=n[r][o],i="cell";a.isHit?i+=a.ship?" hit":" miss":!e&&a.ship&&(i+=" ship"),t+='<div class="'.concat(i,'" data-x="').concat(o,'" data-y="').concat(r,'"></div>')}return t+"</div>"},C=function(n,e){var t=document.createElement("button");return t.textContent=n,t.id=e,t},{renderGameboards:function(n,e){v.innerHTML=B(n.board,!1),x.innerHTML=B(e.board,!0)},updateGameboard:function(n,e,t){var r=("player"===e?v:x).querySelector('[data-x="'.concat(t.x,'"][data-y="').concat(t.y,'"]'));if(r){var o=n.board[t.y][t.x];o.isHit&&r.classList.add(o.ship?"hit":"miss")}},addAttackListener:function(n){x.addEventListener("click",(function(e){var t=e.target.closest(".cell");if(t){var r=parseInt(t.dataset.x),o=parseInt(t.dataset.y);console.log("Cell clicked: (".concat(r,", ").concat(o,")")),n(r,o)}}))},displayEndGame:function(n){E.textContent=n,E.style.display="block"},displayMessage:function(n){E&&(E.textContent=n,E.style.display="block",setTimeout((function(){E.textContent="",E.style.display="none"}),2e3))},displayMissedAttacks:function(n,e){n.getMissedAttacks().forEach((function(n){var t=n.x,r=n.y,o=e.querySelector('[data-x="'.concat(t,'"][data-y="').concat(r,'"]'));o&&o.classList.add("miss")}))},displayShipPlacement:function(n,e,t,r){var o=document.getElementById("player-board"),a=document.createElement("div");a.id="ship-placement-controls";var i=C("Rotate Ship","rotate-ship"),c=C("Reset","reset-game"),l=C("Random","random-placement"),s=C("Start Game","start-game"),d=!0;i.addEventListener("click",(function(){d=!d})),c.addEventListener("click",e),l.addEventListener("click",t),s.addEventListener("click",r),o.addEventListener("click",(function(e){var t=e.target.closest(".cell");if(t){var r=parseInt(t.dataset.x),o=parseInt(t.dataset.y);n(r,o,d)}})),a.append(i,c,l,s),o.parentNode.insertBefore(a,o)},hideShipPlacement:function(){var n=document.getElementById("ship-placement-controls");n&&(n.style.display="none")}});var S,w,I,M,T,z,H,j,L,P;const G=(M=function(n,e){e.forEach((function(e,t){for(var r=!1,o=0;o<10&&!r;o++)for(var a=0;a<10&&!r;a++)try{n.placeShip(e,{x:a,y:o,horizontally:!0}),r=!0}catch(t){try{n.placeShip(e,{x:a,y:o,vertically:!0}),r=!0}catch(n){}}r||console.error("Failed to place ship ".concat(t))}))},T=function(){var n=[b(5),b(4),b(3),b(3),b(2)],e=0;k.displayShipPlacement((function(t,r,o){try{S.gameboard.placeShip(n[e],{x:t,y:r,horizontally:o,vertically:!o}),k.renderGameboards(S.gameboard,w.gameboard),++e>=n.length&&k.displayMessage("All ships placed. Click Start Game to begin!")}catch(n){k.displayMessage(n.message)}}),(function(){e=0,S.gameboard=h(),k.renderGameboards(S.gameboard,w.gameboard),k.displayMessage("Ship placement reset. Place your ships!")}),(function(){S.gameboard=h(),S.gameboard.placeShipsRandomly(n),k.renderGameboards(S.gameboard,w.gameboard),e=n.length,k.displayMessage("Ships placed randomly. Click Start Game to begin!")}),(function(){e>=n.length?(k.hideShipPlacement(),z(),k.displayMessage("Game started. Attack the enemy board!")):k.displayMessage("Place all your ships before starting the game!")}))},z=function(){k.addAttackListener((function(n,e){I===S&&H(n,e)}))},H=function(n,e){if(I===S){var t=w.gameboard;console.log("Player attempting move at (".concat(n,", ").concat(e,")")),t.receiveAttack({x:n,y:e})?(k.updateGameboard(t,"enemy",{x:n,y:e}),t.isAllShipsSunk()?P("Player wins!"):t.isHit({x:n,y:e})?k.displayMessage("Hit! You get another turn."):j()):k.displayMessage("Invalid move. Try again.")}else console.log("Not player's turn")},j=function(){I=I===S?w:S,console.log("Switched turn to:",I===S?"Player":"AI"),I===w&&setTimeout(L,1e3)},L=function(){console.log("AI turn started"),console.log("Player 1 gameboard:",S.gameboard);var n=!1,e=0;do{if(++e>100)return console.error("AI exceeded maximum attempts to make a valid move"),void j();var t=w.playMoveAI(S.gameboard);if(console.log("AI move:",t),!t)return console.error("No valid moves available for AI"),void j();if(console.log("AI attempting move at (".concat(t.x,", ").concat(t.y,")")),S.gameboard.receiveAttack(t)){if(k.updateGameboard(S.gameboard,"player",t),n=S.gameboard.isHit(t),S.gameboard.isAllShipsSunk())return void P("AI wins!");n?(k.displayMessage("AI hit a ship! It gets another turn."),w.recordHit(t.x,t.y,S.gameboard.board[t.y][t.x])):(k.displayMessage("AI missed!"),n=!1)}else console.error("AI made an invalid move"),n=!1}while(n);j()},P=function(n){k.displayEndGame(n)},{init:function(){S=g(),w=g({isAI:!0}),I=S,S.gameboard=h(),w.gameboard=h();var n=[b(5),b(4),b(3),b(3),b(2)];try{w.gameboard.placeShipsRandomly(n)}catch(e){console.error("Failed to place ships randomly:",e),M(w.gameboard,n)}k.renderGameboards(S.gameboard,w.gameboard),T()},playTurn:H,playAITurn:L});document.addEventListener("DOMContentLoaded",(function(){G.init()}))})()})();
//# sourceMappingURL=main.js.map