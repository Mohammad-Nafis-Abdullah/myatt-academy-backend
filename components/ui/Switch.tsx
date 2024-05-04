import * as React from "react";

const Switch = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const Case = ({
  children,
  condition,
}: {
  children: React.ReactNode;
  condition: boolean;
}) => {
  if (!condition) return null;
  return children;
};

Switch.Case = Case;

export default Switch;
