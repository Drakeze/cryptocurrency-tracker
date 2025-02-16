// Imports That I might need 
// import { useState } from 'react'        // When using state
// import { useEffect } from 'react'       // When using effects
// import { useCallback } from 'react'     // When using callbacks
// import Image from 'next/image'          // When using Next.js images
// import Link from 'next/link'           // When using Next.js links
import page from 'page./page.tsx';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;