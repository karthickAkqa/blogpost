import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import { HorizontalDivider } from "../../components/HorizontalDivider";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const LatestArticle = ({ article }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter primary-content md:text-4xl">
        <PrismicLink document={article}>
          <PrismicText field={article.data.title} />
        </PrismicLink>
      </h1>
      <p className="font-roboto italic tracking-tighter text-slate-500">
        {dateFormatter.format(date)}
      </p>
    </li>
  );
};

const Article = ({ article, latestArticles, navigation, settings }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <Layout
      withHeaderDivider={false}
      withProfile={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(article.data.title)} 
        </title>
      </Head> 
        <div className="grid ">
          <div className="container  mx-auto w-full max-w-6xl">
            <PrismicLink
              href="/"
              className="font-semibold tracking-tight text-slate-400"
            >
              &larr; Back to articles
            </PrismicLink>
            <section className="px-4 md:px-6 lg:py-12 ">     
                <h1 className="text-3xl font-semibold tracking-tighter primary-content md:text-4xl">
                  <PrismicText field={article.data.title} />
                </h1>
                <p className="font-roboto italic tracking-tighter text-slate-500">
                  {dateFormatter.format(date)}
                </p>               
            </section>
            <article>
              <SliceZone slices={article.data.slices} components={components} />
            </article>
          </div> 
        </div>
      {latestArticles.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest articles
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestArticles.map((article) => (
                  <LatestArticle key={article.id} article={article} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const article = await client.getByUID("article", params.uid);
  const latestArticles = await client.getAllByType("article", {
    limit: 3,
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      article,
      latestArticles,
      navigation,
      settings,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return {
    paths: articles.map((article) => prismicH.asLink(article, linkResolver)),
    fallback: false,
  };
}