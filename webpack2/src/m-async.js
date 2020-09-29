
function test(params) {
  return import(/*  webpackPrefetch: true */ "lodash").then(
    ({ default: _ }) => {
      var element = document.createElement("div");
      element.innerHTML = _.join(["a", "b", "c"], "-");
      return element;
    }
  );
}
document.addEventListener("click", () => {
  test().then((element) => {
    document.body.appendChild(element);
  });
});
