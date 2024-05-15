const axios = require('axios');

describe('API Endpoint Testing', () => {
    it('Should retrieve posts and log them in Markdown table format.', async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;

        posts.forEach(post => {
            post.status = "published"; 
            post.publishedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); 
            post.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        });

        const maxLengths = {
            slug: Math.max(...posts.map(post => post.title.length), 'slug'.length),
            status: Math.max(...posts.map(post => post.status.length), 'status'.length),
            publishedAt: 'publishedAt'.length,
            updatedAt: 'updatedAt'.length
        };

        const formatLine = (slug, status, publishedAt, updatedAt) => {
            return `| ${slug.padEnd(maxLengths.slug)} | ${status.padEnd(maxLengths.status)} | ${publishedAt} | ${updatedAt} |`;
        };

        let table = formatLine('slug', 'status', 'publishedAt', 'updatedAt') + '\n';
        table += formatLine('----', '------', '------------', '----------') + '\n';
        posts.forEach(post => {
            table += formatLine(post.title, post.status, post.publishedAt, post.updatedAt) + '\n';
        });

        console.log(table);
    });
});
