import type { ComponentChildren } from "preact";

interface JobsListProps {
  children: ComponentChildren;
}

export const JobsList = ({ children }: JobsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {children}
    </div>
  );
};
