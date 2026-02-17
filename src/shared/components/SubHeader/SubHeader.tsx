import React from "react";
import "./SubHeader.css";
interface SubHeaderProps {
  children: React.ReactNode;
}
const SubHeader: React.FC<SubHeaderProps> = ({ children }) => {
  return (
    <div className="subheader-container">
      <div className="subheader-content"> 
        {children} 
      </div>
    </div>
  );
};
export default SubHeader;
