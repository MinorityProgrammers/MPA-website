import React from "react";

const BlogThree = () => {
  return (
    <section className="blog-one  blog-one__home-two">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            Our latest news <br />& articles
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="blog-one__single">
              <div className="blog-one__image">
                <img src="/assets/images/blog-1-1.jpg" alt="" />
                <a className="blog-one__plus" href="news-details.html">
                  <i className="kipso-icon-plus-symbol"></i>
                </a>
              </div>
              <div className="blog-one__content text-center">
                <div className="blog-one__meta">
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Posted On Jan 19"
                    href="#"
                  >
                    <i className="fa fa-calendar-alt"></i>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="No Comments"
                    href="#"
                  >
                    <i className="fa fa-comments"></i>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Posted By Admin"
                    href="#"
                  >
                    <i className="fa fa-user"></i>
                  </a>
                </div>
                <h2 className="blog-one__title">
                  <a href="news-details.html">What Is A Software Engineer?</a>
                </h2>
                <p className="blog-one__text">
                  What exactly is a software engineer?
                </p>
                <a href="news-details.html" className="blog-one__link">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog-one__single">
              <div className="blog-one__image">
                <img src="/assets/images/blog-1-2.jpg" alt="" />
                <a className="blog-one__plus" href="news-details.html">
                  <i className="kipso-icon-plus-symbol"></i>
                </a>
              </div>
              <div className="blog-one__content text-center">
                <div className="blog-one__meta">
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Posted On Jan 19"
                    href="#"
                  >
                    <i className="fa fa-calendar-alt"></i>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="No Comments"
                    href="#"
                  >
                    <i className="fa fa-comments"></i>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Posted By Admin"
                    href="#"
                  >
                    <i className="fa fa-user"></i>
                  </a>
                </div>
                <h2 className="blog-one__title">
                  <a href="news-details.html">
                    Do you need a degree in Computer Science?
                  </a>
                </h2>
                <p className="blog-one__text">
                  Do you need a degree in computer science.
                </p>
                <a href="news-details.html" className="blog-one__link">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog-one__single">
              <div className="blog-one__image">
                <img src="/assets/images/blog-1-3.jpg" alt="" />
                <a className="blog-one__plus" href="news-details.html">
                  <i className="kipso-icon-plus-symbol"></i>
                </a>
              </div>
              <div className="blog-one__content text-center">
                <div className="blog-one__meta">
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Posted On Jan 19"
                    href="#"
                  >
                    <i className="fa fa-calendar-alt"></i>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="No Comments"
                    href="#"
                  >
                    <i className="fa fa-comments"></i>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Posted By Admin"
                    href="#"
                  >
                    <i className="fa fa-user"></i>
                  </a>
                </div>
                <h2 className="blog-one__title">
                  <a href="news-details.html">
                    Learn in our bootcamp, incubator, accelerator programs
                  </a>
                </h2>
                <p className="blog-one__text"></p>
                <a href="news-details.html" className="blog-one__link">
                  Learn Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogThree;
