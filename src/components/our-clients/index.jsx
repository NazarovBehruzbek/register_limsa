import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import limsaImg from "../../assets/limsa.png";
import homkitImg from "../../assets/homekit.png";
import dezinfiksiyaImg from "../../assets/dezinfiksiya.png";
import avtozoomImg from "../../assets/avtozoom.svg";
import loyalImg from "../../assets/loyal.png";
import namanganImg from "../../assets/namangan.jpg";
import { Autoplay } from "swiper/modules";
import "./our-clients.scss";

const OurClients = () => {
  return (
    <section className="our-clients">
      <h2>Bizning mijozlarimiz</h2>

      <Swiper
        breakpoints={{
          260: {
            slidesPerView: 1,
          },
          360: {
            slidesPerView: 2,
          },
          540: {
            slidesPerView: 3,
          },
          760: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={30}
        // slidesPerView={5}
        autoplay={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="img">
            <img src={limsaImg} alt="our partners" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img">
            <img src={dezinfiksiyaImg} alt="our partners" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img">
            <img src={homkitImg} alt="our partners" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img">
            <img src={loyalImg} alt="our partners" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img">
            <img src={namanganImg} alt="our partners" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img">
            <img src={avtozoomImg} alt="our partners" />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default OurClients;
