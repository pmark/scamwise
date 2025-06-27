'use client';

import React, { useEffect, useRef } from 'react';

export const BuyMeACoffeeButton = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect runs once when the component mounts.
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

    ref.current.appendChild(script);

    const currentRef = ref.current;

    // This cleanup function runs when the component unmounts.
    // It's crucial for preventing issues with fast refresh in development.
    return () => {
      if (currentRef) {
        // When the component unmounts, we remove the script and the widget.
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return <div ref={ref}></div>;
};
