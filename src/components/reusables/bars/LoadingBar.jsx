import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import "../../styles/loading-bar.css";

export default function LoadingBar({ loading, children, minDuration = 800 }) {
  const [showLoader, setShowLoader] = useState(loading);

  useEffect(() => {
    let timer;
    if (loading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, minDuration);
    }
    return () => clearTimeout(timer);
  }, [loading, minDuration]);
  if (showLoader) {
    return (
      <div className="loading-container">
        <BarLoader className="loading-spinner" color="#8693ab" />
        <p className="loading-text">Loading ...</p>
      </div>
    );
  }
  return children;
}
