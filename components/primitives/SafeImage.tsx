"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function SafeImage(props: ImageProps) {
  const [err, setErr] = useState(false);
  const src = err ? "/placeholder.svg" : (props.src as string);
  return (
    <Image
      {...props}
      src={src}
      onError={() => setErr(true)}
      alt={props.alt || "image"}
    />
  );
}
