import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedSlider = ({ products, setSelectedProduct }) => {
    return (
        <Swiper
            className="my-banner-slider"
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            navigation
            pagination={{ clickable: true }}
            loop={false}
        >
            {products.map((item) => (
                <SwiperSlide key={item.id}>
                    <div className="slider-item">
                        <div className="slider-content">
                            <span className="badge">Sản phẩm nổi bật</span>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <div className="slider-buttons">
                                <button
                                    className="btn-action btn-detail"
                                    onClick={() => setSelectedProduct(item)}
                                >
                                    Xem chi tiết
                                </button>
                                <button
                                    className="btn-action btn-store"
                                    onClick={() => window.location.href = '/shop'}
                                >
                                    Xem cửa hàng
                                </button>
                            </div>
                        </div>
                        <div className="slider-image">
                            <img
                                src={`https://localhost:7132${item.imageUrl}`}
                                alt={item.name}
                                onError={(e) => { e.target.src = '/default-product.png'; }}
                            />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default FeaturedSlider;