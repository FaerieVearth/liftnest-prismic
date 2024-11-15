"use client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import Bounded from "@/app/components/Bounded";

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
      <div ref={sliderRef} className="keen-slider h-[500px] rounded-xl">
        {slice.primary.element.length > 1 &&
          slice.primary.element.map((item, index) => (
            <div key={index} className="keen-slider__slide relative">
              <PrismicNextImage
                field={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <h3 className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-lg">
                {item.tag}
              </h3>
            </div>
          ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <span className="bg-black/50 text-white px-3 py-1 rounded-md text-sm">
            {currentSlide + 1}/{instanceRef.current.track.details.slides.length}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="bg-white/80 hover:bg-white p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
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
              className="bg-white/80 hover:bg-white p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
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
