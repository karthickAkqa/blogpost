import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { AlgoliaSearch } from "../components/Search";
import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Bounded } from "../components/Bounded";
import { Heading } from "../components/Heading";
import {useDarkMode} from "../components/useDarkMode"; 
import 'instantsearch.css/themes/satellite.css';


const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "text")
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(" ");

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const Article = ({ article }) => {
  const featuredImage =
    (prismicH.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices);
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const excerpt = getExcerpt(article.data.slices);

  return (
    <li className="w-full sm:w-1/2 md:w-1/3 self-stretch  px-4 my-4">
      <div className="rounded overflow-hidden ">
      <div className="aspect-w-4 aspect-h-3 relative bg-gray-100">
        <PrismicLink document={article} tabIndex="-1">
            {prismicH.isFilled.image(featuredImage) && (
              <PrismicNextImage
                field={featuredImage}
                layout="fill"
                className="object-cover"
              />
            )}
        </PrismicLink>
      </div>
      <div className="grid grid-cols-1 gap-3 md:col-span-2 px-6 py-5 bg-white shadow-lg ">
        <h2 className="font-semibold text-xl mb-2">
          <PrismicLink document={article}>
            <PrismicText field={article.data.title} />
          </PrismicLink> 
        </h2>
        <p className="font-roboto italic tracking-tighter ">
          {dateFormatter.format(date)}
        </p>
        {excerpt && (
          <p className="font-roboto text-base leading-relaxed  md:leading-relaxed">
            {excerpt}
          </p>
        )}
      </div></div>
    </li>
  );
};


const Index = ({ articles, navigation, settings }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>

      <Bounded size="widest">
        
        <AlgoliaSearch/> 
        <ul className="flex flex-wrap -mx-4">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </ul>
      </Bounded>
      
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      articles,
      navigation,
      settings,
    },
  };
}
 

 