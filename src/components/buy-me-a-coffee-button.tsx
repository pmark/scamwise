'use client';

import React, { useEffect, useRef } from 'react';

export const BuyMeACoffeeButton = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
    script.setAttribute('data-name', 'bmc-button');
    script.setAttribute('data-slug', 'scamwise');
    script.setAttribute('data-color', '#FFDD00');
    script.setAttribute('data-emoji', '');
    script.setAttribute('data-font', 'Cookie');
    script.setAttribute('data-text', 'Buy me a coffee');
    script.setAttribute('data-outline-color', '#000000');
    script.setAttribute('data-font-color', '#000000');
    script.setAttribute('data-coffee-color', '#ffffff');
    script.async = true;

    // To prevent multiple buttons from rendering on fast refresh
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }
    ref.current.appendChild(script);

    const currentRef = ref.current;

    return () => {
      if (currentRef) {
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
      }
    };
  }, []);

  return <div ref={ref}></div>;
};
