import React from 'react';

const SectionHeading = ({ children }: { children: string }) => {
  return (
    <div
      className="
      mb-7 text-2xl sm:text-3xl text-foreground font-bold tracking-tight
    "
    >
      {children}
    </div>
  );
};

export default SectionHeading;
