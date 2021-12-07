const Page1 = function ({ setstep, setClickRegister, data }) {
  return (
    <div className="service_container" id="title">
      <div className="service_icon">
        <span>
          <img src="/assets/images/Idea_icon.png" />
        </span>
      </div>
      <div className="service_block">
        <h1>Want to hire us for your project?</h1>
        <h5>
          Get The world's leading team of builders to develop your product with
          our transparent task-based escrow system
        </h5>
        <button
          onClick={() => {
            if (data === null) {
              setClickRegister(true);
            } else {
              setstep(1);
            }
          }}
        >
          TELL US ABOUT YOUR IDEA
        </button>
        <br />
      </div>
    </div>
  );
};
export default Page1;
