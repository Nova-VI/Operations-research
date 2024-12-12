function setRandomKeyframe() {
    function randomValue() {
        return Math.floor(Math.random() * 101);
    }
    const keyframes = `
    @keyframes animate {
      0% { background-position: ${50}% ${50}%; }
      25% { background-position: ${randomValue()}% ${randomValue()}%; }
      50% { background-position: ${randomValue()}% ${randomValue()}%; }
      75% { background-position: ${randomValue()}% ${randomValue()}%; }
      100% { background-position: ${50}% ${50}%; }
    }
  `;
    const styleSheet = document.styleSheets[0];
    const keyframeRule = styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    console.log("Updated!");
}
setInterval(setRandomKeyframe, 90000);
setRandomKeyframe();
console.log("Hello From plant js");