import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../utils";

const PostVideoTwo = ({ data, pClass, videoIcon }) => {
  return (
    <div className={`media post-block post-block__small ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}>
      <Link className="align-self-center" href={`/post/${data.slug}`}>
         
            <Image
            src={data.featureImg}
            alt={data.title}
            width={100}
            height={100}
            />
            {videoIcon === true ? <span className="video-play-btn video-play-btn__small" /> : "" }
            
        </Link>
      
      <div className="media-body">
        <div className="post-cat-group">
			<Link  className={`post-cat ${data.cate_bg ?? "bg-color-blue-one"}`} href={`/category/${slugify(data.cate)}`}>
                {data.cate}
            </Link>
        </div>
        <h3 className="axil-post-title hover-line hover-line">
           <Link href={`/post/${data.slug}`}>
				{data.title}
			</Link>
        </h3>
        <div className="post-metas">
          <ul className="list-inline">
            <li>
				<span>By</span>
				<Link className="post-author" href={`/author/${slugify(data.author_name)}`}>
					{data.author_name}
				</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostVideoTwo;
