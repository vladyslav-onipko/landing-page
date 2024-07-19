export default class ThemeSwitcher {
  constructor() {
    this.toggle = null;

    this.options = {
      toggleId: 'theme-toggle',
      darkMode: 'dark-mode',
      lightMode: 'light-mode',
    };

    this.init();
  }

  init() {
    this.initElements();
    this.initEvents();
    this.initTheme();
  }

  toggleTheme() {
    if (!this.toggle) return;

    if (this.toggle.checked) {
      document.body.classList.add(this.options.darkMode);
      document.body.classList.remove(this.options.lightMode);
    } else {
      document.body.classList.add(this.options.lightMode);
      document.body.classList.remove(this.options.darkMode);
    }
  }

  // Initialize theme based on system preference
  initTheme() {
    if (!this.toggle) return;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.toggle.checked = true;
      document.body.classList.add(this.options.darkMode);
    } else {
      document.body.classList.add(this.options.lightMode);
    }
  }

  initElements() {
    this.toggle = document.getElementById(this.options.toggleId);
  }

  initEvents() {
    this.toggle?.addEventListener('change', this.toggleTheme.bind(this));
  }
}
