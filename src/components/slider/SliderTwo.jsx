import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import ErrorPage from "../../pages/404";
import Loader from "../common/Loader";

const SliderTwo = () => {
  function SlickNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="feather icon-chevron-right"></i>
      </button>
    );
  }

  function SlickPrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="feather icon-chevron-left"></i>
      </button>
    );
  }

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [nav3, setNav3] = useState(null);
  const [shape, setShape] = useState("");

  // Fetch featured posts from Sanity
  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => {
      const query = `*[_type == 'post' && featured == true]{
      title,
      slug,
      'featureImg': mainImage.asset->url,

      'cate': categories[0]->title
    }[0...3]`; // Get up to 3 featured posts

      const response = await client.fetch(query);
      return response;
    },
  });

  // Social Share Toggle
  const ShareToggler = (e) => {
    const targeElm = e.target.nextElementSibling;

    if (targeElm) {
      targeElm.classList.toggle("show-shares");
    }
  };
  useEffect(() => {
    setShape("shape-loaded");
  }, []);

  // Slick Slider Configuration
  const slideSettingsContent = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  };

  const slideSettingsImage = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "0",
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
  };

  const slideSettingsShare = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    vertical: true,
  };

  return (
    <div className="banner banner__home-with-slider banner__home-with-slider-two grad-bg">
      <div className={`axil-shape-circle ${shape}`} />
      <div className={`axil-shape-circle__two ${shape}`} />
      <div className="container">
        <div className="row">
          <div className="col-xl-5">
            <div className="banner-slider-container banner-slider-container-two">
              {isLoading && <Loader />}
              {error && <ErrorPage />}

              {data && (
                <Slider
                  {...slideSettingsContent}
                  asNavFor={nav3}
                  ref={(slider1) => setNav1(slider1)}
                  className="slick-slider slick-slider-for"
                >
                  {data.map((postData) => (
                    <div className="item" key={postData.slug}>
                      <h1 className="page-title m-b-xs-40 hover-line">
                        <Link href={`/post/${postData.slug}`}>
                          {postData.title}
                        </Link>
                      </h1>
                      <div className="btn-group">
                        <Link
                          className="btn btn-primary m-r-xs-30"
                          href={`/post/${data.slug}`}
                        >
                          READ MORE
                        </Link>
                        <Link
                          className="btn-link"
                          href={`/category/${data?.slug?.current}`}
                        >
                          ALL CURRENT NEWS
                        </Link>
                      </div>{" "}
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className="banner-slider-container-synced banner-slider-container-synced__two">
            <Slider
              {...slideSettingsImage}
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              className="slick-slider slick-slider-nav"
            ></Slider>
          </div>
          <div className="banner-share-slider-container banner-share-slider-container__two">
            <Slider
              {...slideSettingsShare}
              asNavFor={nav2}
              ref={(slider3) => setNav3(slider3)}
              className="slick-slider banner-share-slider"
            >
              {data?.slice(0, 3).map((data) => (
                <div className="item" key={data.slug}>
                  <div className="banner-shares slick-banner-shares">
                    <div className="toggle-shares" onClick={ShareToggler}>
                      Shares <span>+</span>
                    </div>
                    <div className="social-share-wrapper">
                      <ul className="social-share social-share__with-bg">
                        <li>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https://new.axilthemes.com/post/${data.slug}`}
                          >
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-x-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-behance" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderTwo;
