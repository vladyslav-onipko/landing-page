import Dropdown from './core-components/dropdown.js';
import ThemeSwitcher from './core-components/theme-switcher.js';
import MobNavigation from './core-components/mob-navigation.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  // Initializing dropdowns
  const dropdowns = document.querySelectorAll('.js-dropdown');
  if (!dropdowns.length) return;
  dropdowns.forEach((dropdown) => new Dropdown(dropdown));

  // Initializing theme switcher
  const switcher = new ThemeSwitcher();

  // Initializing mobile navigation
  const mobNav = new MobNavigation();

  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    modules: [Navigation],
    navigation: {
      nextEl: '.is-swiper-next',
      prevEl: '.is-swiper-prev',
    },
  });
});
