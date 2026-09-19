// Swiper 11 ships ESM-only via package "exports", which CRA's Jest transform
// does not resolve. Tests only need the carousel to render its children.
import React from 'react';

export const Swiper = ({ children }) => <div data-testid="swiper">{children}</div>;
export const SwiperSlide = ({ children }) => <div>{children}</div>;
export const Navigation = {};
export const Pagination = {};
export const Autoplay = {};

export default Swiper;
