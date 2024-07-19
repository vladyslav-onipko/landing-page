export default class MobNavigation {
  constructor() {
    this.toggleNav = null;
    this.overlay = null;
    this.mobNav = null;
    this.closeNavBtn = null;

    this.options = {
      toggleNavClass: '.js-mob-nav-toggle',
      overlayClass: '.js-mob-nav-bg',
      navBlock: '.js-mob-nav',
      openedClass: 'is-open',
      closeNavBtnClass: '.mob-nav__close',
    };

    this.init();
  }

  init() {
    this.initElements();
    this.initEvents();
  }

  toggle() {
    if (!this.toggleNav || !this.mobNav || !this.overlay || !this.closeNavBtn) return;

    const isOpen =
      this.mobNav.classList.contains(this.options.openedClass) &&
      this.overlay.classList.contains(this.options.openedClass);

    if (!isOpen) {
      this.mobNav.classList.add(this.options.openedClass);
      this.overlay.classList.add(this.options.openedClass);
      this.overlay.setAttribute('aria-expanded', true);
    } else {
      this.mobNav.classList.remove(this.options.openedClass);
      this.overlay.classList.remove(this.options.openedClass);
      this.overlay.setAttribute('aria-expanded', false);
      this.clearEvents();
    }
  }

  keyClose(e) {
    if (e.keyCode === 27) {
      this.toggle();
    }
  }

  initEvents() {
    this.toggleNav?.addEventListener('click', this.toggle.bind(this));
    this.overlay?.addEventListener('click', this.toggle.bind(this));
    this.closeNavBtn?.addEventListener('click', this.toggle.bind(this));
    document.addEventListener('keydown', this.keyClose.bind(this));
  }

  clearEvents() {
    this.toggleNav?.removeEventListener('click', this.toggle);
    this.overlay?.removeEventListener('click', this.toggle);
    this.closeNavBtn?.removeEventListener('click', this.toggle);
    document.removeEventListener('keydown', this.keyClose);
  }

  initElements() {
    this.toggleNav = document.querySelector(this.options.toggleNavClass);
    this.mobNav = document.querySelector(this.options.navBlock);
    this.overlay = document.querySelector(this.options.overlayClass);
    this.closeNavBtn = this.mobNav.querySelector(this.options.closeNavBtnClass);
  }
}
