"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Bounded from "@/app/components/Bounded";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative mx-4"
      >
        <div className="mt-16 prose glass-container grid items-start gap-8 -bg--theme-secondary px-8 py-8 backdrop-blur-sm lg:grid-cols-5 lg:py-12">
          <div className="flex flex-col items-center md:items-start lg:col-span-3">
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

            <div className="prose prose-invert mb-6 mt-10 max-w-xl">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Accordion>
              {slice.primary.qna.map((item, index) => (
                <AccordionItem key={index} title={item.question}>
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Faq;
