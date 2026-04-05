import React from 'react';

const SectionHeading = ({ children }: { children: string }) => {
  return (
    <div
      className="
      text-2xl
      sm:text-3xl
      text-slate-800
      font-extrabold
      py-4
      px-2
      tracking-tight
    "
    >
      {children}
    </div>
  );
};

export default SectionHeading;
