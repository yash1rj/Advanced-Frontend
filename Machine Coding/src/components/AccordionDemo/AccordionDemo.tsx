import Accordion from "../../common/Accordion";

const accordionItems = [
  {
    id: 1,
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Meta and the open-source community.",
  },
  {
    id: 2,
    title: "How do React components work?",
    content: (
      <div>
        <p>
          React components are reusable pieces of code that return JSX elements.
          They can be:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Function components (recommended)</li>
          <li>Class components (legacy)</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: "What are React hooks?",
    content:
      "Hooks are functions that let you use state and other React features in function components. Common hooks include useState, useEffect, useContext, and many others.",
  },
  {
    id: 4,
    title: "What is JSX?",
    content:
      "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files, making it easier to create React components.",
  },
];

const AccordionDemo = () => {
  return (
    <>
      <h2>Accordion Demo</h2>
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Single Item Open (Default)
        </h3>
        <Accordion items={accordionItems} defaultOpenIndexes={[0]} />
      </section>
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Multiple Items Open
        </h3>
        <Accordion
          items={accordionItems}
          allowMultiple={true}
          defaultOpenIndexes={[1, 2]}
          styleConfig={{
            headerCustomClass: "custom-accordion-header",
            contentCustomClass: "custom-accordion-content",
          }}
        />
      </section>
    </>
  );
};

export default AccordionDemo;
