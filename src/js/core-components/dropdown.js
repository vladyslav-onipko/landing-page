export default class Dropdown {
  constructor(element) {
    this.element = element;
    this.dropdownBlock = null;
    this.toggleBtn = null;
    this.closeBtn = null;

    this.options = {
      wrapperClass: '.js-dropdown',
      dropdownClass: '.js-dropdown-block',
      btnClass: '.js-dropdown-toggle',
      closeBtnClass: '.js-dropdown-close',
      openedClass: 'is-open',
    };

    this.init();
  }

  init() {
    this.initElements();
    this.initEvents();
  }

  initEvents() {
    this.toggleBtn?.addEventListener('click', this.toggle.bind(this));
    this.closeBtn?.addEventListene('click', this.toggle.bind(this));
    document.addEventListener('click', this.closeOutside.bind(this));
  }

  toggle() {
    if (!this.toggleBtn || !this.dropdownBlock) return;

    const isOpen = this.dropdownBlock.classList.contains(this.options.openedClass);

    if (!isOpen) {
      this.dropdownBlock.classList.add(this.options.openedClass);
      this.toggleBtn.classList.add(this.options.openedClass);
      this.toggleBtn.setAttribute('aria-expanded', true);
      this.dropdownBlock.setAttribute('aria-hidden', false);
    } else {
      this.dropdownBlock.classList.remove(this.options.openedClass);
      this.toggleBtn.classList.remove(this.options.openedClass);
      this.toggleBtn.setAttribute('aria-expanded', false);
      this.dropdownBlock.setAttribute('aria-hidden', true);
      this.clearEvents();
    }
  }

  closeOutside(e) {
    if (!this.dropdownBlock || !this.toggleBtn) return;

    const currentTarget = e.target.closest('div');
    const isOpen = this.dropdownBlock.classList.contains(this.options.openedClass);

    if (isOpen && currentTarget !== this.element) {
      this.dropdownBlock.classList.remove(this.options.openedClass);
      this.toggleBtn.classList.remove(this.options.openedClass);
      this.toggleBtn.setAttribute('aria-expanded', false);
      this.dropdownBlock.setAttribute('aria-hidden', true);
      this.clearEvents();
    }
  }

  clearEvents() {
    this.toggleBtn?.removeEventListener('click', this.toggle);
    this.closeBtn?.removeEventListener('click', this.closeOutside);
    document.removeEventListener('click', this.closeOutside);
  }

  initElements() {
    this.dropdownBlock = this.element.querySelector(this.options.dropdownClass);
    this.toggleBtn = this.element.querySelector(this.options.btnClass);
    this.closeBtn = this.element.querySelector(this.options.closeBtnClass);
  }
}
