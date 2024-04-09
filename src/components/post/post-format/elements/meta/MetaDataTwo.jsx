import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../../../utils";

const MetaDataTwo = ({ metaData }) => {
  const basePathLink =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
      : "";
  const postDate = metaData.date.split(" ");

  return (
    <div
      className="banner banner__single-post banner__single-type-two"
      style={{ backgroundImage: `url(${basePathLink + metaData.featureImg})` }}
    >
      <div className="grad-overlay" />
      <div className="post-navigation-wrapper post-navigation__banner">
        <div className="post-navigation">
          <div className="post-nav-content">
            <Link href="#">
              <a className="prev-post">
                <i className="feather icon-chevron-left" />
                Prev Post
              </a>
            </Link>
          </div>
        </div>
        <div className="post-navigation">
          <div className="post-nav-content">
            <Link href="#">
              <a className="next-post">
                Next Post
                <i className="feather icon-chevron-right" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/* End of .post-navigation-wrapper */}
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="post-date perfect-square bg-primary-color">
              {postDate[0]}
              <span>{postDate[1]}</span>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="post-title-wrapper">
              <div className="btn-group">
                <Link
                  className={`cat-btn ${
                    metaData.cate_bg ?? "bg-color-blue-one"
                  }`}
                  href={`/category/${slugify(metaData.cate)}`}
                >
                  {metaData.cate}
                </Link>
              </div>
              <h2 className="m-b-xs-0 axil-title hover-line color-white m-t-xs-10">
                {metaData.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaDataTwo;
