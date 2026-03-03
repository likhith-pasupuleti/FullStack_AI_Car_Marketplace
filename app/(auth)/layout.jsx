import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-white to-orange-200">
      {children}
    </div>
  );
};

export default AuthLayout;
