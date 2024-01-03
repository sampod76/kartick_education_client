"use client";
import React, { useEffect, useRef } from "react";
// import OwlCarousel, { Options } from "react-owl-carousel3";
import "owl.carousel/dist/assets/owl.carousel.css"; // Import Owl Carousel CSS
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./testimonial.css";

// interface TestimonialMainProps {}

// const responsive: Options.Responsive = {
//   0: {
//     items: 1,
//   },
//   768: {
//     items: 2,
//   },
//   1170: {
//     items: 3,
//   },
// };

export default function TestimonialMain() {
  return (
    <div>
      <section className="main">
        {/* <OwlCarousel
        ref={testimonialsSliderRef}
        loop
        center
        items={3}
        margin={0}
        autoplay
        dots
        autoplayTimeout={8500}
        smartSpeed={450}
        responsive={responsive}
      >
        {/* Your testimonial items go here */}
        {/* </OwlCarousel> */}
        <div className="customer-feedback">
          <div className="container text-center">
            <div className="row">
              <div className="col-sm-offset-2 col-sm-8">
                <div>
                  <h2 className="section-title">What Clients Say</h2>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
                <div className="owl-carousel feedback-slider">
                  <div className="feedback-slider-item">
                    <img
                      src="//c2.staticflickr.com/8/7310/buddyicons/24846422@N06_r.jpg"
                      className="center-block img-circle"
                      alt="Customer Feedback"
                    />
                    <h3 className="customer-name">Lisa Redfern</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. It is a long established fact that a
                      reader will be distracted by the readable its layout.
                    </p>
                    <span className="light-bg customer-rating" data-rating="5">
                      5<i className="fa fa-star"></i>
                    </span>
                  </div>

                  <div className="feedback-slider-item">
                    <img
                      src="https://i.ibb.co/VxhHWhd/professional-Side.png"
                      className="center-block img-circle"
                      alt="Customer Feedback"
                    />
                    <h3 className="customer-name">Cassi</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. It is a long established fact that a
                      reader will be distracted by the readable its layout.
                    </p>
                    <span className="light-bg customer-rating" data-rating="4">
                      4<i className="fa fa-star"></i>
                    </span>
                  </div>

                  <div className="feedback-slider-item">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/451270/profile/profile-80.jpg"
                      className="center-block img-circle"
                      alt="Customer Feedback"
                    />
                    <h3 className="customer-name">Md Nahidul</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. It is a long established fact that a
                      reader will be distracted by the readable its layout.
                    </p>
                    <span className="light-bg customer-rating" data-rating="5">
                      5<i className="fa fa-star"></i>
                    </span>
                  </div>
                </div>

                <div className="feedback-slider-thumb hidden-xs">
                  <div className="thumb-prev">
                    <span>
                      <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/451270/profile/profile-80.jpg"
                        alt="Customer Feedback"
                      />
                    </span>
                    <span className="light-bg customer-rating">
                      5<i className="fa fa-star"></i>
                    </span>
                  </div>

                  <div className="thumb-next">
                    <span>
                      <img
                        src="https://res.cloudinary.com/hnmqik4yn/image/upload/c_fill,fl_force_strip,h_128,q_100,w_128/v1493982718/ah57hnfnwxkmsciwivve.jpg"
                        alt="Customer Feedback"
                      />
                    </span>
                    <span className="light-bg customer-rating">
                      4<i className="fa fa-star"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="copyright">
        <p>
          Me On:
          <a
            href="https://www.toptal.com/resume/md-nahidul-islam"
            target="_blank"
            className="toptal"
          >
            Toptal
          </a>
          <a
            href="https://upstack.co/team/md-35"
            target="_blank"
            className="upstack"
          >
            Upstack
          </a>
          <a
            href="https://www.upwork.com/o/profiles/users/_~0195eb53c731b0e159/"
            target="_blank"
            className="upwork"
          >
            UpWork
          </a>
          <a
            href="https://www.fiverr.com/thenahidul"
            target="_blank"
            className="fiverr"
          >
            Fiverr
          </a>
        </p>
        <a
          href="https://www.toptal.com/B7avWk/worlds-top-talent"
          className="jobs"
          target="_blank"
        >
          Jobs
        </a>
      </div>
    </div>
  );
}
