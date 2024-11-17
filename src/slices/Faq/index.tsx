"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Bounded from "@/app/[lang]/components/Bounded";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps): JSX.Element => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-2xl hover:underline",
    indicator: "text-2xl text-black ",
    content: "text-xl px-2",
  };
  return (
    <Bounded
      className="text-start my-4"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.title}
        components={{
          heading2: ({ children }) => (
            <h2 className="bg-gradient-to-b from-[#ffc46b] to-[#fc5f2f] bg-clip-text not-italic text-transparent mx-auto mb-4 max-w-2xl text-balance text-center text-4xl font-bold md:text-5xl">
              {children}
            </h2>
          ),
        }}
      />

      <div className="prose mx-auto mb-12 mt-2 max-w-2xl text-center text-lg md:text-2xl text-gray-600">
        <PrismicRichText field={slice.primary.body} />
      </div>
      <Accordion selectionMode="multiple" itemClasses={itemClasses}>
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
