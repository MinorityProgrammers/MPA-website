function Sponsorship({ displayCheckout, handleMCardClick }) {
  return (
    <div className="sponsor-page-wrapper">
      <div className="sponsor-page">
        <div className="sp-top">
          <div className="sp-head-text">
            <h1>Book A Partnership Meeting!</h1>
            <p>
              Team up with the largest international diversity focused
              development organization.
            </p>
            <p>
              We are always taking up meetings regarding partnership
              opportunities.
            </p>
          </div>
          <div className="sp-t-imgs">
            <img
              className="img-earth-bg"
              src="assets/images/sponsorship/earth-bg.svg"
              alt="earth icon background"
            />
            <img
              className="img-earth"
              src="assets/images/sponsorship/earth.svg"
              alt="earth icon"
            />
          </div>
          <a
            className="inline-block"
            href="http://minorityprogrammers.com/partner"
          >
            <div className="sp-btn">
              <div className="btn-txt">BOOK NOW</div>
            </div>
          </a>
          <div className="sp-t-footer-icons">
            <div className="fis">
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-1.svg"
                    alt="top icon 1"
                  />
                </div>
                <div className="ti-name">
                  <div>Sponsorship for Hackathon</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-2.svg"
                    alt="top icon 2"
                  />
                </div>
                <div className="ti-name">
                  <div>Hiring Talent</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-3.svg"
                    alt="top icon 3"
                  />
                </div>
                <div className="ti-name">
                  <div>Pipelining Developers</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-4.svg"
                    alt="top icon 4"
                  />
                </div>
                <div className="ti-name">
                  <div>Developing Coursework</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-5.svg"
                    alt="top icon 5"
                  />
                </div>
                <div className="ti-name">
                  <div>Volunteer Time as Mentor</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-6.svg"
                    alt="top icon 6"
                  />
                </div>
                <div>
                  <div className="ti-name">
                    Hiring our Developers to Build Your Product
                  </div>
                </div>
              </div>
            </div>
            <div className="fis">
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-7.svg"
                    alt="top icon 7"
                  />
                </div>
                <div className="ti-name">
                  <div>Hosting Workshop</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-8.svg"
                    alt="top icon 8"
                  />
                </div>
                <div className="ti-name">
                  <div>Improving our Existing Products</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-9.svg"
                    alt="top icon 9"
                  />
                </div>
                <div className="ti-name">
                  <div>Investing in Minority Startups</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-10.svg"
                    alt="top icon 10"
                  />
                </div>
                <div className="ti-name">
                  <div>Investing in Minority Venture Capital</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-11.svg"
                    alt="top icon 11"
                  />
                </div>
                <div className="ti-name">
                  <div>Building a Local Community STEM through MTTF</div>
                </div>
              </div>
              <div className="ti-wrapper">
                <div className="sp-icon ti-icon">
                  <img
                    src="assets/images/sponsorship/ti-12.svg"
                    alt="top icon 12"
                  />
                </div>
                <div>
                  <div className="ti-name">
                    Integrating Your Organization into the MPA dApp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-middle">
          <div className="sp-head-text f-width">
            <h1>Checkout For Sponsorship Tiers</h1>
            <p>
              MPA will help you to have priority based search results for job
              posting, events and courses.
            </p>
          </div>
          <div className="sp-cards">
            <div className="m-cards-wrapper">
              <div className="m-card" onClick={() => handleMCardClick("ally")}>
                <div className="c-header">
                  <div className="sp-icon mi-icon bg-white">
                    <img
                      src="assets/images/sponsorship/ally.svg"
                      alt="ally icon"
                    />
                  </div>
                  <h3>MINORITY ALLY</h3>
                  <h4>$5000</h4>
                </div>
                <div className="c-body">
                  <ul style={{ listStyleType: "disc" }}>
                    <li>Listed as Minority Ally on Homepage</li>
                    <li>
                      Top priority search results for job posting, events, and
                      courses
                    </li>
                    <li>Priority for MPA corporate collaborative efforts</li>
                  </ul>
                </div>
              </div>
              <div
                className="m-card"
                onClick={() => handleMCardClick("friend")}
              >
                <div className="c-header">
                  <div className="sp-icon mi-icon bg-white">
                    <img
                      src="assets/images/sponsorship/friend.svg"
                      alt="friend icon"
                    />
                  </div>
                  <h3>MINORITY FRIEND</h3>
                  <h4>$3000</h4>
                </div>
                <div className="c-body">
                  <ul>
                    <li>Listed on the Sponsor list</li>
                    <li>
                      Secondary priority search results for job posting, events,
                      and courses
                    </li>
                  </ul>
                </div>
              </div>
              <div className="m-card" onClick={() => handleMCardClick("mafia")}>
                <div className="c-header">
                  <div className="sp-icon mi-icon bg-white">
                    <img
                      src="assets/images/sponsorship/mafia.png"
                      alt="mafia icon"
                    />
                  </div>
                  <h3>MINORITY MAFIA</h3>
                  <h4>$1000</h4>
                </div>
                <div className="c-body">
                  <ul>
                    <li>Premium swag bag of MP branded gear</li>
                    <li>Exclusive corporate NFT drop</li>
                    <li>2-week social media campaign</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex f-j-center">
            <a className="inline-block" href="#">
              <div className="sp-btn" onClick={displayCheckout}>
                <div className="btn-txt">CHECKOUT</div>
              </div>
            </a>
          </div>
        </div>
        <div className="sp-bottom">
          <div className="sp-head-text f-width">
            <h1>Our Past Sponsors</h1>
          </div>
          <div className="sp-tier">
            <a
              href="https://www.cgi.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor1.png"
                alt="cgi past sponsor logo"
              />
            </a>
            <a
              href="https://www.accenture.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor2.png"
                alt="accenture past sponsor logo"
              />
            </a>
            <a
              href="https://www.captechconsulting.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor3.png"
                alt=" past sponsor logo"
              />
            </a>
            <a
              href="https://www.stellar.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor4.png"
                alt=" past sponsor logo"
              />
            </a>
            <a
              href="https://enzyme.finance/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor5.png"
                alt="enzyme past sponsor logo"
              />
            </a>
            <a
              href="https://www.plutopepe.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor6.png"
                alt=" past sponsor logo"
              />
            </a>
            <a
              href="https://ripplex.io/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor9.png"
                alt="ripplex past sponsor logo"
              />
            </a>
            <a
              href="https://idle.finance/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor7.png"
                alt="idle past sponsor logo"
              />
            </a>
            <a
              href="https://tokamak.network/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="assets/images/sponsorship/sponsor8.png"
                alt="tokamak network past sponsor logo"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsorship;
