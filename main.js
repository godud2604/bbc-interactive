(() => {

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    // 곱하기 1 해주는 이유 ? 문자열 -> 숫자형으로 바꿔주기 위함 (index를 문자열로 조절하기엔 불편)
    ioIndex = entries[0].target.dataset.index * 1;

  }); 

  for ( let i = 0; i < stepElems.length; i++ ) {
    // 💡 observe : 관찰하는 대상이 사라지거나, 나타날 때 시점마다 callback 함수 실행.
    io.observe(stepElems[i]);

    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate() {
    currentItem.classList.add('visible');

  }

  function inactivate() {
    currentItem.classList.remove('visible');
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
    // 현재 눈에 보이는 요소 기준으로 check 하기 위함 (for문 횟수 줄이기)
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;

      boundingRect = step.getBoundingClientRect();
      
      if (boundingRect.top > window.innerHeight * 0.1 &&
          boundingRect.top < window.innerHeight * 0.8) {
            
            inactivate();
            currentItem = graphicElems[step.dataset.index]; 
            activate();
          }
    }

  });

  activate();

})();