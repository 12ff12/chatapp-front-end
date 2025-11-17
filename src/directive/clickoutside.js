import { createApp } from 'vue'
import App from '@/App.vue'

export default {
  install(app) {
    app.directive('click-outside', {
      beforeMount(el, binding) {
        el.__clickOutsideHandler__ = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            if (typeof binding.value === 'function') {
              binding.value(event);
            }
          }
        };
        document.addEventListener('click', el.__clickOutsideHandler__, true);
      },
      unmounted(el) {
        document.removeEventListener('click', el.__clickOutsideHandler__, true);
        delete el.__clickOutsideHandler__;
      }
    });
  }
};