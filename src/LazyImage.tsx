import React from "react";

const LazyImage = ({
  src = "/pfp.jpeg",
  alt = "Image",
  className = "",
  ...props
}) => {
  return (
    <img src={src} alt={alt} loading="lazy" className={className} {...props} />
  );
};

export default LazyImage;
