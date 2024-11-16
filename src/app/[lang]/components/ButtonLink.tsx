import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'
import React from 'react'
import clsx from 'clsx'

export default function ButtonLink({className, ...restProps}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink  {...restProps} className={clsx("relative inline-flex h-fit min-w-24 justify-center rounded-md px-4 py-2 outline-none hover:bg-[#B28160] hover:text-white transition-colors", className)}/>
  )
}
