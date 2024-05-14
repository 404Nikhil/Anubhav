import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Author from "./_Child/Author";
import company from "../../assets/images/company.png";
import { CiBookmark } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { htmlToText } from 'html-to-text';
import { BACKEND_URL } from "../../constants";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);
  const [blogContent, setBlogContent] = useState('');

  const fetchBlogData = async () => {
    const response = await axios.get(BACKEND_URL + '/blogs?useLatest=true')
    setBlogData(response.data)
  }

  useEffect(() => {
    fetchBlogData()
  }, [])

  console.log(blogData)
  return (
    <>
      <div className="p-0 w-full  flex flex-col items-center max-w-[1540px]">
        <h1 className="text-black pb-20 x-sm:text-[35px]">Trending Stories</h1>
        <div className="w-[70%] p-4 lg-xl:w-[100%] flex flex-col gap-10">
          {blogData.map((item) => {
            return (
              <>
                <BlogCard
                  link={`/blog/${item._id}`}
                  Title={item.title}
                  imagesrc={company}
                  author={item.author.name}
                  company={item.companyName}
                  readingTime={20}
                  date="21/12/2022"
                />

                {/* <Link to={`/blog/${item._id}`}>
                  <div className="w-[100%] flex justify-between items-center pt-0 md:flex-col md:items-center md:gap-3">
                    <img
                      src={company}
                      alt="company image"
                      className="w-[25rem] rounded-none"
                    />
                    <div className="xl:w-[50%] w-[40%] flex flex-col items-start md:w-[54%] x-sm:w-[100%]">
                      <h1 className="text-black text-[30px] md:text-[20px] md:g-black">
                        {item.companyName}
                      </h1>
                      <Author person={{ name: item?.author?.name, company: item?.companyName }} />
                      <p className="text-black text-[14px]">
                        {htmlToText(item.description).slice(0, 100)}
                        <Link to={`/blog/${item._id}`} className="text-gray-500">...Read more</Link>
                      </p>
                      <div className="w-full flex justify-between pt-3">
                        <p className="text-gray-500 pt-2"> mins read</p>
                        <div className="flex  gap-2">
                          <a href="#">
                            <CiHeart color="#888888" className="w-[20px] h-[30px]" />
                          </a>
                          <a href="#">
                            <CiBookmark color="#888888" className="w-[20px] h-[30px]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link> */}
              </>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default BlogSection;



