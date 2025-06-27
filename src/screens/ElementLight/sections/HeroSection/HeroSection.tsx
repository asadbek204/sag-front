import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../../components/ui/carousel";

export const HeroSection = (): JSX.Element => {
  // Product categories data
  const categories = [
    {
      title: "Gilamlar",
      backgroundImage: "bg-[url(/gilamlar.png)]",
      subcategories: [
        "Klassik dizayn",
        "Neoklassik dizayn",
        "Zamonaviy dizayn",
        "Bolalar dizayni",
      ],
    },
    {
      title: "Kovrolin",
      backgroundImage: "bg-[url(/kovrolin.png)]",
      subcategories: [],
    },
    {
      title: "Gazon",
      backgroundImage: "bg-[url(/gazon.png)]",
      subcategories: [],
    },
  ];

  // Collection cards data
  const collections = [
    {
      title: "Yangi kolleksiyalar",
      backgroundImage: "bg-[url(/img-1.png)]",
      titlePosition: "top-[98px] left-[104px]",
    },
    {
      title: "Top kolleksiyalar",
      backgroundImage: "bg-[url(/img-2.png)]",
      titlePosition: "top-[98px] left-[114px]",
    },
    {
      title: "Chegirma",
      backgroundImage: "bg-[url(/img-3.png)]",
      titlePosition: "top-[98px] left-[146px]",
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      backgroundImage: "bg-[url(/screenshot-5-png.png)]",
      content:
        "Toshkentda navbatdagi SAG XL\ndo'konining rasmiy ochilish marosimi\nbo'lib o'tdi.",
    },
    {
      backgroundImage: "bg-[url(/sayt-uchun-1-jpg.png)]",
      content: "Silver Mercury va White Square\nfestivallarida uchta g'alaba!",
    },
    {
      backgroundImage: "bg-[url(/25-4-png.png)]",
      content:
        "SAG 25 yilligi munosabati bilan Abu-\nDabida hamkorlari uchun biznes tur\ntashkillashtirdi",
    },
    {
      backgroundImage: "bg-[url(/6-jpg.png)]",
      content: "",
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "SAG do'konlarining boshqalardan farqi\nnimada?",
      answer: "",
    },
    {
      question:
        "SAG do'koni bo'lmagan hududlarga gilamlar\nqanday yetkazib beriladi?",
      answer: "",
    },
    {
      question: "Nostandart gilam ranglari va o'lchamlari\nmavjudmi?",
      answer: "",
    },
    {
      question: "Mahsulotlarni jonli ravishda qayerda\nko'rishim mumkin?",
      answer: "",
    },
    {
      question: "Muddatli to'lovga xarid qila olamanmi?",
      answer: "",
    },
    {
      question: "Muddatli to'lov foyizi qanaqa va nechchi\noyga?",
      answer: "",
    },
  ];

  return (
    <section className="w-full bg-[#faf9f7]">
      {/* Banner section */}
      <div className="w-full">
        <div className="w-full bg-[url(/banner.png)] bg-cover bg-center h-[920px]" />
      </div>

      {/* Categories section */}
      <div className="w-full flex justify-center mt-[775px]">
        <div className="max-w-[1206px] w-full px-[15px] pt-[15px] pb-[132px]">
          <div className="flex gap-[30px] w-full">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="flex-1 p-0 border-0 rounded-none overflow-hidden relative"
              >
                <div
                  className={`h-[496.64px] ${category.backgroundImage} bg-cover bg-center`}
                />
                <div className="flex flex-col w-[372px] items-start gap-2 p-6 absolute top-0 left-0">
                  <div className="w-full">
                    <h2 className="text-white text-4xl font-normal [font-family:'Inter',Helvetica] pb-6">
                      {category.title}
                    </h2>
                  </div>

                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="w-full pb-4">
                      <a
                        href="#"
                        className="text-white text-[17.3px] [font-family:'Inter',Helvetica] font-normal underline"
                      >
                        {subcategory}
                      </a>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Collections section */}
      <div className="w-full bg-[#c6b3a3] py-16">
        <div className="max-w-[1206px] w-full mx-auto px-[15px]">
          <div className="flex justify-between w-full">
            {collections.map((collection, index) => (
              <div key={index} className="flex-1 relative">
                <div
                  className={`${collection.backgroundImage} bg-cover bg-center h-[229.18px]`}
                />
                <div className={`absolute ${collection.titlePosition}`}>
                  <p className="text-white text-xl [font-family:'Inter',Helvetica] font-normal leading-[31.2px]">
                    {collection.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-[70px]">
            <h2 className="[font-family:'Inter',Helvetica] font-normal text-white text-[38.6px] leading-[48px]">
              Blog
            </h2>
          </div>
        </div>

        {/* Blog carousel */}
        <div className="max-w-[1206px] w-full mx-auto overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent className="flex">
              {blogPosts.map((post, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 min-w-[401.33px]"
                >
                  <Card className="border-0 rounded-none">
                    <CardContent className="p-[15px]">
                      <div className="relative">
                        <div
                          className={`${post.backgroundImage} bg-cover bg-center h-[371.33px]`}
                        />
                        {post.content && (
                          <div className="absolute top-[30px] left-6 min-w-[347.31px] h-[371px]">
                            <p className="text-white text-[17.6px] [font-family:'Inter',Helvetica] font-normal leading-[27px] whitespace-pre-line">
                              {post.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* FAQ section */}
      <div className="w-full flex justify-center">
        <div className="max-w-[1206px] w-full px-[15px] py-[123.2px] flex flex-col gap-12">
          <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#212529] text-[40px] leading-[48px]">
            Ko'p beriladigan savollar
          </h2>

          <div className="flex flex-wrap justify-between gap-[0px_201px]">
            <div className="flex-1 max-w-[502.5px]">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.slice(0, 3).map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-[#ecdfd4] py-0"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <div className="text-left [font-family:'Inter',Helvetica] font-normal text-[#212529] text-xl leading-6 whitespace-pre-line">
                        {item.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex-1 max-w-[502.5px]">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.slice(3, 6).map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 3}`}
                    className="border-b border-[#ecdfd4] py-0"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <div className="text-left [font-family:'Inter',Helvetica] font-normal text-[#212529] text-xl leading-6 whitespace-pre-line">
                        {item.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom carousel */}
      <div className="w-full bg-[#c6b3a3] py-[15px]">
        <div className="max-w-[1206px] w-full mx-auto px-[15px]">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="basis-1/2">
                <div className="h-[229.18px] bg-[url(/20.png)] bg-cover bg-center" />
              </CarouselItem>
              <CarouselItem className="basis-1/2">
                <div className="h-[229.18px] bg-[url(/24.png)] bg-cover bg-center" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
