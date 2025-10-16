// Handles mobile navigation toggling and active link highlighting.
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
  const dropdownMenu = document.querySelector('[data-dropdown-menu]');
  const header = document.querySelector('[data-page-header]');
  const headerPlaceholder = document.querySelector('[data-header-placeholder]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (!linkPath) return;

    const isActive =
      linkPath === currentPath ||
      (linkPath === 'index.html' && currentPath === '');

    if (isActive) {
      link.classList.add('text-emerald-500');
      link.classList.add('border-emerald-500');
    } else {
      link.classList.remove('text-emerald-500');
      link.classList.remove('border-emerald-500');
    }

    if (mobileMenu && mobileToggle) {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          mobileMenu.classList.add('hidden');
        }
      });
    }
  });

  if (dropdownToggle && dropdownMenu) {
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (
        dropdownMenu.contains(target) ||
        dropdownToggle.contains(target)
      ) {
        return;
      }
      dropdownMenu.classList.add('hidden');
    });
  }

  if (header && headerPlaceholder) {
    const initialOffset = header.offsetTop;

    const setPlaceholderHeight = () => {
      headerPlaceholder.style.height = `${header.offsetHeight}px`;
    };

    setPlaceholderHeight();
    window.addEventListener('resize', setPlaceholderHeight);

    const handleScroll = () => {
      if (window.scrollY > initialOffset) {
        header.classList.add(
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'shadow-md',
          'bg-white',
          'z-50'
        );
        header.classList.remove('bg-slate-100');
        headerPlaceholder.classList.remove('hidden');
      } else {
        header.classList.remove(
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'shadow-md',
          'bg-white',
          'z-50'
        );
        if (!header.classList.contains('bg-slate-100')) {
          header.classList.add('bg-slate-100');
        }
        headerPlaceholder.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});
