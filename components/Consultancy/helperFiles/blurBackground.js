import { useEffect, useRef } from "react";

function BlurBackground({ children }) {
  useEffect(() => {
    document.body.classList.add("hide-overflow");
  }, []);
  return (
    <div className="blurBkg">
      <div className="centered-blur-body">{children}</div>
    </div>
  );
}
export default BlurBackground;
