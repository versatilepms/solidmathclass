(function () {
  const overlay = document.getElementById('promoOverlay');
  if (!overlay) return;

  const cards = Array.from(overlay.querySelectorAll('.promo-card'));
  if (!cards.length) return;

  const btnClose = document.getElementById('promoClose');
  const btnCloseX = overlay.querySelector('.promo-close-x');
  const btnHideOneDay = document.getElementById('promoHideOneDay');

  const STORAGE_KEY = 'promo_hide_until';
  let currentIndex = 0;

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  // 1일 동안 전체 팝업 숨김
  function hideForOneDay() {
    const hideUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간
    localStorage.setItem(STORAGE_KEY, hideUntil.toISOString());
    closeOverlay();
  }

  function shouldShowOverlay() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return true;
    return new Date() > new Date(saved);
  }

  function openOverlay() {
    overlay.style.display = 'flex';
    updateView();
  }

  function closeOverlay() {
    overlay.style.display = 'none';
  }

  // 모바일일 때는 한 장만, PC에서는 두 장 다
  function updateView() {
    if (isMobile()) {
      cards.forEach((card, i) => {
        card.style.display = i === currentIndex ? 'block' : 'none';
      });
    } else {
      cards.forEach(card => {
        card.style.display = 'block';
      });
    }
  }

  // 닫기 버튼 / X 버튼 클릭 시
  function nextOrClose() {
    if (isMobile() && currentIndex < cards.length - 1) {
      currentIndex += 1;    // 다음 카드로
      updateView();
    } else {
      closeOverlay();       // 마지막 카드면 전체 닫기
    }
  }

  // 이벤트 연결
  if (btnClose) btnClose.addEventListener('click', nextOrClose);
  if (btnCloseX) btnCloseX.addEventListener('click', nextOrClose);
  if (btnHideOneDay) btnHideOneDay.addEventListener('click', hideForOneDay);

  // 화면 크기 바뀔 때도 모드에 맞게 다시 그리기
  window.addEventListener('resize', updateView);

  // 첫 로딩 시 1일 숨김 상태가 아니라면 열기
  if (shouldShowOverlay()) {
    openOverlay();
  }
})();