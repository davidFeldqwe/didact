function createElement(type, props, ...children) {
  return {
    $$typeof: Symbol.for("react.element"),
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "string" ? createTextElement(child) : child
      ),
    },
  };
}

function createTextElement(text) {
  return {
    $$typeof: Symbol.for("react.element"),
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type !== "TEXT_ELEMENT"
      ? document.createElement(element.type)
      : document.createTextNode(element.type);
  console.log("🚀 ~ render ~ dom:", dom);

  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((key) => {
      dom[key] = element.props[key];
    });

  // map over the children
  element.props.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

const Didact = {
  createElement,
  render,
};

/**@jsxRuntime classic */
/** @jsx Didact.createElement */
const element2 = (
  <div id="foo">
    <a>Hello</a>
    <br />
    hi
    <b />
  </div>
);

const container = document.getElementById("root");
Didact.render(element2, container);
// ReactDOM.createRoot(container).render(element2);
