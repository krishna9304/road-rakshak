import { notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import HomeLayout from "../components/HomeLayout/Layout";
import NewsCard from "../components/newsCard";
import { BACKEND_URL } from "../constants";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/v1/news/getNews`)
      .then((res) => {
        if (res.data.res) {
          setNews(res.data.news);
          notification.success({
            message: "Success",
            description: res.data.msg,
          });
        } else {
          notification.error({
            message: "Error",
            description: "There is some error!",
          });
        }
      })
      .catch(console.error);
  }, []);
  return (
    <HomeLayout header={"News"}>
      {news.map((item, idx) => {
        return (
          <NewsCard
            key={idx}
            img={item.picture}
            headline={item.headline}
            description={item.description}
            references={item.references}
          />
        );
      })}
    </HomeLayout>
  );
};

export default News;
