# Moving the blog to Substack

The site is already wired for this. A post migrates when you add one line to its frontmatter.

## Why Substack over Medium

|               | Substack                                 | Medium                                        |
| ------------- | ---------------------------------------- | --------------------------------------------- |
| Subscribers   | You own the email list and can export it | Followers are Medium's                        |
| Code blocks   | Basic, no syntax highlighting            | Basic, also no highlighting                   |
| Discovery     | Weak outside your own audience           | Better for cold search traffic                |
| Custom domain | Yes (paid, one-time fee)                 | Paywalled / limited                           |
| Import        | Import from URL or RSS                   | Import from URL, sets canonical automatically |

Recommendation: Substack as the home, because the portfolio already has a newsletter form and Substack replaces it. Cross-post to Medium later if you want reach, using Medium's "Import a story", which sets the canonical link back to the original.

## Steps

1. Create the publication (suggested name: your own, e.g. `gajanan.substack.com`). Optionally add `writing.gajananrathod.in` as a custom domain.
2. For each of the 4 posts in `content/blog/`, in this order (newest first):
   - `database_optimsation.mdx` (N+1)
   - `sharding-vs-partitioning.mdx`
   - `design-your-db.mdx`
   - `rest-vs-http.mdx`
     Paste the MDX body into the Substack editor. Re-upload the images from `public/blog/`. Check code blocks and tables, since Substack has no MDX components.
   - Note: `rest-vs-http.mdx` and `sharding-vs-partitioning.mdx` reference cover images that don't exist in `public/blog/` (`rest-vs-http-cover.webp`, `sharding-vs-partitioning-cover.webp`). Pick new covers.
3. Publish, copy the post URL, and add to that MDX file's frontmatter:
   ```yaml
   externalUrl: "https://gajanan.substack.com/p/your-slug"
   ```
   Effects: the `/blog` card links out, `/blog/<slug>` 301-redirects to Substack (so old links and SEO carry over), and the post drops out of the sitemap.
4. Once all four are done, set `links.substack` in `config/site.ts` to the publication URL. The Resend newsletter form on `/blog` is replaced by a "Subscribe on Substack" button.
5. Later cleanup: delete the `.mdx` bodies, `app/api/newsletter`, `resend`, and the MDX rendering components. Keep the frontmatter files (or replace them with a plain list) so `/blog` still lists posts.
6. Move existing newsletter subscribers: export from Resend and use Substack's CSV import. Only import people who opted in.

## What stays on the portfolio

`/blog` (nav label "Writing") stays as an index of posts that link out, so the site still shows your writing without hosting it.
