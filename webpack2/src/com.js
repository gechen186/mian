document.addEventListener('click', () => {
  import(/* webpackChunkName: "test", webpackPrefetch: true */ './click.js').then(({ default: fn }) => {
    fn()
  })
})