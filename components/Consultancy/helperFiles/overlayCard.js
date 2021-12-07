const OverlayCard = function ({ children }) {
  return (
    <div className="overlay-card">
      <div className="inner-section">{children}</div>
    </div>
  );
};
export default OverlayCard;
