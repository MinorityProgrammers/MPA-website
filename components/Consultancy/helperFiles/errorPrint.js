function ErrorPrint({ errors = [], red, left }) {
  return (
    <div className="errorEle">
      {errors.map((error, index) => {
        return (
          <h4
            key={index}
            style={{
              color: red ? "var(--errorRed)" : "",
              textAlign: left ? "left" : "",
            }}
          >
            - {error}
          </h4>
        );
      })}
    </div>
  );
}
export default ErrorPrint;
