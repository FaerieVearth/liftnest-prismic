"use client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import Bounded from "@/app/[lang]/components/Bounded";
import AnimatedContent from "./AnimatedContent";
/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */
const Images = ({ slice }: ImagesProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      {/*       <AnimatedContent>
        <div className="mb-8 mt-12">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balanced prose text-center text-3xl font-medium md:text-5xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="bg-gradient-to-b from-[#ffc46b] to-[#fc5f2f] bg-clip-text not-italic text-transparent">
                {children}
              </em>
            ),
          }}
        />
                <p className="prose text-center text-lg md:text-xl">
            <PrismicRichText field={slice.primary.subheading} />
          </p>
        </div>
      </AnimatedContent> */}

      {slice.primary.heading && slice.primary.heading.length > 0 && (
        <div className="mb-8 mt-12">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-balanced prose text-center text-3xl font-medium md:text-5xl">
                  {children}
                </h2>
              ),
              em: ({ children }) => (
                <em className="bg-gradient-to-b from-[#ffc46b] to-[#fc5f2f] bg-clip-text not-italic text-transparent">
                  {children}
                </em>
              ),
            }}
          />
          <div className="prose text-center text-lg md:text-xl mt-5">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
        </div>
      )}

      <div ref={sliderRef} className="keen-slider h-[500px] rounded-xl">
        {slice.primary.element.length > 1 &&
          slice.primary.element.map((item, index) => (
            <div key={index} className="keen-slider__slide relative">
              <PrismicNextImage
                field={item.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <h3 className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1 text-lg text-white">
                {item.tag}
              </h3>
            </div>
          ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <span className="rounded-md bg-black/50 px-3 py-1 text-sm text-white">
            {currentSlide + 1}/{instanceRef.current.track.details.slides.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="rounded-full bg-white/80 p-2 hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={() => instanceRef.current?.next()}
              className="rounded-full bg-white/80 p-2 hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default Images;
