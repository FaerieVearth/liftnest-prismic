import Bounded from "@/app/[lang]/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type MarkupProps = SliceComponentProps<Content.MarkupSlice>;

/**
 * Component for "Markup" Slices.
 */
const Markup = ({ slice }: MarkupProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose prose-lg prose-invert mx-auto my-4 md:my-8">
        {slice.primary.title && (
          <h2 className="w-full mb-8 text-3xl font-semibold text-center md:text-5xl">
            {slice.primary.title}
          </h2>
        )}
        {slice.primary.markup && (
          <PrismicRichText
            components={{
              heading2: ({ children }) => (
                <h2 className="text-balanced text-lg my-4 font-medium md:text-xl">
                  {children}
                </h2>
              ),
              em: ({ children }) => (
                <em className="bg-gradient-to-b from-[#ffc46b] to-[#fc5f2f] bg-clip-text not-italic text-transparent">
                  {children}
                </em>
              ),
            }}
            field={slice.primary.markup}
          />
        )}
      </div>
    </Bounded>
  );
};

export default Markup;
