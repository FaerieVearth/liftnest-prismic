import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { useState, FormEvent } from "react";
import ContactForm from "@/app/components/ContactForm";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <ContactForm
      title={slice.primary.title ?? ""}
      body={slice.primary.body ?? ""}
      recipientEmail={slice.primary.sendto_mail ?? ""}
      facebook={slice.primary.fb_url ?? ""}
      instagram={slice.primary.insta_url ?? ""}
      gdprText={slice.primary.gdpr ?? ""}
      sendButtonText={slice.primary.send ?? ""}
    />
  );
};

export default Contact;
