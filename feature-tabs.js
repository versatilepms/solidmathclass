/*jslint browser: true*/
/*global document*/

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        var tabButtons = document.querySelectorAll('.feature-tab'),
            panels = document.querySelectorAll('.feature-panel'),
            moreBtn = document.getElementById('feature-more-btn'),
            i;

        // 핸들러 함수 (루프 밖)
        function onTabClick(event) {
            var j,
                button = event.currentTarget,
                target = button.getAttribute('data-panel'),
                link = button.getAttribute('data-link');

            // 탭 active
            for (j = 0; j < tabButtons.length; j += 1) {
                tabButtons[j].classList.remove('is-active');
            }
            button.classList.add('is-active');

            // 패널 active
            for (j = 0; j < panels.length; j += 1) {
                if (panels[j].id === 'feature-panel-' + target) {
                    panels[j].classList.add('is-active');
                } else {
                    panels[j].classList.remove('is-active');
                }
            }

            // 자세히 보기 링크 변경
            if (link) {
                moreBtn.setAttribute('href', link);
            }
        }

        // 이벤트 바인딩
        for (i = 0; i < tabButtons.length; i += 1) {
            tabButtons[i].addEventListener('click', onTabClick);
        }

    });

}());