import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'
import React from 'react'
import clsx from 'clsx'

export default function ButtonLink({className, ...restProps}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink  {...restProps} className={clsx("relative inline-flex h-fit min-w-24 justify-center rounded-md border border-[#fc9270] bg-[#fc9270] px-4 py-2 text-slate-700 outline-none ring-[#fc5f2e] transition-colors hover:text-[#ffffff] after:hover:bg-opacity-15 focus:ring-2", className)}/>
  )
}
