import React from "react";
import "@/shared/components/SubHeader/SubHeader.css";

interface SubHeaderProps {
  children: React.ReactNode;
}

const SubHeader: React.FC<SubHeaderProps> = ({ children }) => {
  // By rendering the container div unconditionally, we reserve its space in the layout.
  // The content div is only rendered if children are provided, preventing an empty
  // content box from being visible when there's no sub-header.
  return (
    <div className="subheader-container">
      {children && <div className="subheader-content">{children}</div>}
    </div>
  );
};

export default SubHeader;
