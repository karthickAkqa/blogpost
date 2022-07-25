// build-search.js
import dotenv from "dotenv";
import algoliasearch from "algoliasearch";
import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';
// import sm from "../sm.json" assert { type: 'json' };

import * as fs from 'fs';
const sm_utf = fs.readFileSync('./sm.json', 'utf8');
const sm = JSON.parse(sm_utf);


const accessToken = ''
const routes = [
    {
        type: 'article',
        path: '/article/:uid',
    },
    {
        type: 'page',
        path: '/:uid',
    },
]


export const createClient = (config = {}) => {
    const client = prismic.createClient(sm.apiEndpoint, {
        fetch,
        accessToken,
        routes,
    });
    return client;
};

async function getAllBlogPosts() {
    const client = createClient();
    const articles = await client.getAllByType("article", {
        orderings: [
            { field: "my.article.publishDate", direction: "desc" },
            { field: "document.first_publication_date", direction: "desc" },
        ],
    });
    return articles;
}

function transformPostsToSearchObjects(posts) {
    const transformed = posts.map((post) => {
        return {
            objectID: post.id,
            title: post.data.title[0].text,
            slug: post.uid,
            date: post.last_publication_date,
            type: post.type,
        };
    });

    return transformed;
}

(async function () {
    dotenv.config();

    try {
        const posts = await getAllBlogPosts();
        const transformed = transformPostsToSearchObjects(posts);

        // initialize the client with your environment variables
        const client = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.ALGOLIA_SEARCH_ADMIN_KEY,
        );

        // initialize the index with your index name
        const index = client.initIndex("articles");

        // save the objects!
        const algoliaResponse = await index.saveObjects(transformed);

        // check the output of the response in the console
        console.log(
            `🎉 Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
                "\n",
            )}`,
        );
    } catch (error) {
        console.log(error);
    }
})();