import Link from "next/link";

const HomepageBuyMinority = function () {
  return (
    <div className="homepage__buy">
      <div className="heading__number mt-5 mb-5">
        <h3 className="text_white">02</h3>
      </div>
      <div className="container">
        <div className="container-buy">
          <div className="content-buy">
            <div className="heading-buy mb-5">
              <h2 className="title-buy text_white">
                Buy $MINORITY <br /> FAIR LAUNCH
              </h2>
            </div>
            <div className="link__container-buy">
              <Link href="#/register">
                <a>
                  <div className="link-buy">
                    LEARN MORE <i className="fas fa-caret-down" />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="bg__container-buy">
            <img
              className="bg__image-buy"
              src="./assets/images/buy-$minority.png"
            />
          </div>
          <div className="bg__layer-buy" />
        </div>
      </div>
    </div>
  );
};

export default HomepageBuyMinority;
