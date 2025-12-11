// 즉시 실행 함수로 감싸서 전역 스코프 오염 방지
(() => {
    // DOM이 완전히 로드된 후에 스크립트 실행
    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        const themeToggleButton = document.getElementById('theme-toggle-button');
        const themeList = document.getElementById('theme-list');
        const themeOptions = themeList.querySelectorAll('li');

        // 햄버거 메뉴 토글
        if (hamburgerMenu && navLinks) {
            hamburgerMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // 테마 목록 토글
        if (themeToggleButton && themeList) {
            themeToggleButton.addEventListener('click', (event) => {
                event.stopPropagation(); // 이벤트 버블링 방지
                themeList.classList.toggle('hidden');
            });
        }

        // 테마 선택 처리
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedTheme = e.currentTarget.dataset.theme;
                applyTheme(selectedTheme);
                localStorage.setItem('theme', selectedTheme); // 선택한 테마 저장
                themeList.classList.add('hidden'); // 목록 숨기기
            });
        });

        // 페이지의 다른 곳을 클릭하면 테마 목록 숨기기
        document.addEventListener('click', () => {
            if (themeList && !themeList.classList.contains('hidden')) {
                themeList.classList.add('hidden');
            }
        });

        // 인트로 애니메이션 시작
        document.body.classList.add('js-animate');
    });

    // 테마 적용 함수
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    // 페이지 로드 시 저장된 테마 적용
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
})();
