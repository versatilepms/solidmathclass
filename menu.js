var mobileHeaderMenuButton   = document.querySelector('.mobile-header_menu-button');
var mobileSidebar            = document.querySelector('.mobile-sidebar');
var mobileSidebarCloseButton = document.querySelector('.mobile-sidebar_close-button');
var mobileOverlay            = document.querySelector('.mobile-overlay');
var mobileMenuTitles = document.querySelectorAll('.mobile-menu-title');


function openMobileMenu() {
  mobileSidebar.classList.add('active');
  mobileOverlay.classList.add('active');
  mobileSidebarCloseButton.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeMobileMenu() {
  mobileSidebar.classList.remove('active');
  mobileOverlay.classList.remove('active');
  mobileSidebarCloseButton.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

if (mobileHeaderMenuButton) {
  mobileHeaderMenuButton.addEventListener('click', openMobileMenu);
}

if (mobileSidebarCloseButton) {
  mobileSidebarCloseButton.addEventListener('click', closeMobileMenu);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMobileMenu);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

mobileMenuTitles.forEach(function(title) {
  title.addEventListener('click', function() {
    var submenu = title.nextElementSibling;
    var arrow = title.querySelector('.mobile-arrow');
    var isOpen = submenu.style.maxHeight && submenu.style.maxHeight !== '0px';

    document.querySelectorAll('.mobile-submenu').forEach(function(s) {
      s.style.maxHeight = null;
    });
    document.querySelectorAll('.mobile-menu-title').forEach(function(t) {
      t.classList.remove('active');
    });
    document.querySelectorAll('.mobile-arrow').forEach(function(a) {
      a.classList.remove('active');
    });

    if (!isOpen) {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
      title.classList.add('active');
      arrow.classList.add('active');
    }
  });
});

// 창 크기 변경될 때(리사이즈) PC 화면이면 메뉴 강제 닫기
window.addEventListener('resize', function () {
  if (window.innerWidth > 625) {
    closeMobileMenu();
  }
});
