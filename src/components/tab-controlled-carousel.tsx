"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "~/components/ui/carousel";
import Image from "next/image";

export function TabControlledCarousel() {
  const [activeTab, setActiveTab] = useState("0");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const carouselItems = [
    { id: "0", title: "Image 1", src: "/placeholder.svg?height=400&width=600" },
    { id: "1", title: "Image 2", src: "/placeholder.svg?height=400&width=600" },
    { id: "2", title: "Image 3", src: "/placeholder.svg?height=400&width=600" },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    setActiveTab(current.toString());
  }, [current]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    api?.scrollTo(parseInt(value));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            {carouselItems.map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {carouselItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className="p-1">
                  <Image src={item.src} alt={item.title} width={600} height={400} className="w-full h-auto rounded-lg" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
