"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = [
  "/img/Photo from Alex Rodg.jpg",
  "/img/Photo from Alex Rodg(2).jpg",
  "/img/Photo from Alex Rodg(3).jpg",
  "/img/Photo from Alex Rodg(4).jpg",
  "/img/Photo from Alex Rodg(5).jpg",
  "/img/Photo from Alex Rodg(6).jpg",
  "/img/Photo from Alex Rodg(7).jpg",
  "/img/Photo from Alex Rodg(8).jpg",
  "/img/Photo from Alex Rodg(9).jpg",
  "/img/Photo from Alex Rodg(10).jpg",
  "/img/Photo from Alex Rodg(11).jpg",
  "/img/Photo from Alex Rodg(12).jpg",
  "/img/Photo from Alex Rodg(13).jpg",
  "/img/Photo from Alex Rodg(14).jpg",
];

export default function ImageCarousel() {
    return (
      <main className="m-auto p-4 w-[95%]">
        <Carousel
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem className="relative max-h-[500px]" key={index}>
                <Image style={{ borderRadius: "0.6rem"}} className="rounded-md aspect-sqaure object-cover h-[500px]  "  height={500} width={500} src={image} alt="recipe image" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext />
        </Carousel>
      </main>
    );
}