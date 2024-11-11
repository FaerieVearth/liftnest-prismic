"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Bounded from "@/app/components/Bounded";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps): JSX.Element => {
  return (
    <Bounded
      className="text-start"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-balance text-5xl font-bold">
                    {children}
                  </h2>
                ),
              }}
            />

            <div className="mb-6 mt-10 max-w-xl">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Accordion selectionMode="multiple" variant="shadow">
              {slice.primary.qna.map((item, index) => (
                <AccordionItem key={index} title={item.question}>
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
    </Bounded>
  );
};

export default Faq;
