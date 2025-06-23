import { useState } from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
`;

const AccordionHeader = styled.button<{ isOpen: boolean }>`
  padding: 5px;
  border: 1px solid gray;
  border-radius: ${(p) => (p.isOpen ? "5px 5px 0px 0px" : "5px")};
  font-weight: bold;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const AccordionContent = styled.div`
  padding: 10px;
  background: gray;
  border-radius: 0px 0px 5px 5px;
`;

const AccordionTrigger = styled.button`
  padding: 5px;
`;

const Accordion = ({
  items = [],
  allowMultiple = false,
  defaultOpenIndexes = [],
  styleConfig = {},
}: {
  items: any[];
  allowMultiple?: boolean;
  defaultOpenIndexes: number[];
  styleConfig?: {
    containerCustomClass?: string;
    headerCustomClass?: string;
    itemCustomClass?: string;
    contentCustomClass?: string;
  };
}) => {
  const [openIndexes, setOpenIndexes] = useState(new Set(defaultOpenIndexes));

  const toggleItem = (itemIdx: number) => {
    const newOpenIndexes = new Set(openIndexes);

    if (allowMultiple) {
      if (newOpenIndexes.has(itemIdx)) {
        newOpenIndexes.delete(itemIdx);
      } else {
        newOpenIndexes.add(itemIdx);
      }
    } else {
      if (newOpenIndexes.has(itemIdx)) {
        newOpenIndexes.clear();
      } else {
        newOpenIndexes.clear();
        newOpenIndexes.add(itemIdx);
      }
    }

    setOpenIndexes(newOpenIndexes);
  };

  const isOpen = (index: number) => openIndexes.has(index);

  return (
    <AccordionContainer className={styleConfig?.containerCustomClass}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          className={styleConfig?.itemCustomClass}
        >
          <AccordionHeader
            onClick={() => toggleItem(index)}
            className={styleConfig?.headerCustomClass}
            aria-expanded={isOpen(index)}
            isOpen={isOpen(index)}
          >
            <span>{item.title}</span>
            {isOpen(index) ? (
              <AccordionTrigger>&#8607;</AccordionTrigger>
            ) : (
              <AccordionTrigger>&#8609;</AccordionTrigger>
            )}
          </AccordionHeader>

          {isOpen(index) && (
            <AccordionContent className={styleConfig?.contentCustomClass}>
              <div>
                {typeof item.content === "string" ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default Accordion;
