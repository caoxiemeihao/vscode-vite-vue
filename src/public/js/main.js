; (() => {
  if (!window.Vue) {
    console.error('window.Vue is invalid!');
    return;
  }

  const {
    createApp,
    ref,
    reactive,
    computed,
    watch,
    onMounted,
  } = window.Vue;

  createApp({
    name: 'root',
    setup() {
      const message = ref('What the fuck!');

      return {
        message,
      };
    },
  }).mount('#root');
})();
