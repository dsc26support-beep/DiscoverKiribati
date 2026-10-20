import Link from "next/link";
import Button from "@/components/Button";
import PlaceholderImage from "@/components/PlaceholderImage";
import BusinessCard from "@/components/BusinessCard";
import DestinationCard from "@/components/DestinationCard";
import ArticleCard from "@/components/ArticleCard";
import MwaketePromo from "@/components/MwaketePromo";
import { destinations } from "@/data/destinations";
import { getFeaturedBusinesses } from "@/data/businesses";
import { articles } from "@/data/articles";
import { categoryLabels } from "@/lib/labels";
import type { BusinessCategory } from "@/lib/types";

const interestCategories: { category: BusinessCategory; description: string }[] = [
  { category: "accommodation", description: "Guesthouses and places to stay" },
  { category: "tours-activities", description: "Lagoon trips, diving, and guided days out" },
  { category: "culture-community", description: "Craft, dance, and community experiences" },
  { category: "food-dining", description: "Local dishes and fresh-caught fish" },
];

export default function HomePage() {
  const featured = getFeaturedBusinesses().slice(0, 3);
  const featuredDestination = destinations[0];
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* 2. Hero */}
      <section className="relative overflow-hidden bg-ocean text-warm-white">
        <div className="container-wide grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <div>
            <p className="label-caps text-coral">An independent guide to the Gilbert, Phoenix &amp; Line Islands</p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Discover Kiribati
            </h1>
            <p className="mt-5 max-w-lg text-lg text-warm-white/85">
              A remote Pacific nation of atolls and lagoons, spread across
              three time zones and thousands of kilometres of ocean — home to
              a resilient culture, warm hospitality, and some of the most
              untouched coastlines left on Earth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/destinations" variant="secondary">
                Explore the Islands
              </Button>
              <Button href="/experiences" variant="outline">
                Discover Local Experiences
              </Button>
            </div>
          </div>
          <PlaceholderImage
            label="Kiribati lagoon — photography needed"
            className="aspect-[4/3] w-full rounded-2xl lg:aspect-square"
          />
        </div>
      </section>

      {/* 7. Search interface */}
      <section className="border-b border-grey/15 bg-sand">
        <div className="container-wide py-6">
          <form action="/explore" method="GET" className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="home-search" className="sr-only">
              Search destinations, businesses and experiences
            </label>
            <input
              id="home-search"
              name="q"
              type="search"
              placeholder="Search destinations, businesses, experiences…"
              className="w-full rounded-full border border-grey/30 bg-warm-white px-5 py-3 text-sm focus:border-lagoon focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-warm-white hover:bg-lagoon"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="container-wide space-y-20 py-16 sm:space-y-28 sm:py-24">
        {/* 8. Featured destination / editorial story */}
        <section aria-labelledby="featured-destination-heading" className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <PlaceholderImage
            label={`${featuredDestination?.name} — photography needed`}
            className="aspect-[4/3] w-full rounded-2xl"
          />
          <div>
            <p className="label-caps text-lagoon">Featured destination</p>
            <h2 id="featured-destination-heading" className="mt-2 font-display text-3xl text-ocean">
              {featuredDestination?.name}
            </h2>
            <p className="mt-4 text-charcoal/85">{featuredDestination?.introduction}</p>
            <Link
              href={`/destinations/${featuredDestination?.slug}`}
              className="mt-5 inline-block font-semibold text-lagoon no-underline hover:text-ocean"
            >
              Read the destination guide →
            </Link>
          </div>
        </section>

        {/* 9. Explore by interest */}
        <section aria-labelledby="interests-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="interests-heading" className="font-display text-3xl text-ocean">
              Explore by interest
            </h2>
            <Link href="/explore" className="text-sm font-semibold text-lagoon no-underline hover:text-ocean">
              View all categories →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interestCategories.map((item) => (
              <Link
                key={item.category}
                href={`/explore?category=${item.category}`}
                className="group block rounded-xl border border-grey/15 p-6 no-underline transition-colors hover:border-lagoon"
              >
                <h3 className="font-display text-lg text-ocean group-hover:text-lagoon">
                  {categoryLabels[item.category]}
                </h3>
                <p className="mt-2 text-sm text-grey">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 10. Featured accommodation & experience listings */}
        <section aria-labelledby="featured-listings-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="featured-listings-heading" className="font-display text-3xl text-ocean">
              Featured listings
            </h2>
            <Link href="/explore" className="text-sm font-semibold text-lagoon no-underline hover:text-ocean">
              Browse the full directory →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </section>

        {/* 11. Culture, food, ocean & community storytelling */}
        <section aria-labelledby="storytelling-heading">
          <h2 id="storytelling-heading" className="font-display text-3xl text-ocean">
            Life on the atolls
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Culture & community", copy: "Weaving, dance, and a way of life shaped by the lagoon and the land." },
              { title: "Food", copy: "Fresh fish, coconut, and breadfruit — simple island cooking at its best." },
              { title: "Ocean & nature", copy: "Vast lagoons, coral reefs, and seabird colonies across a remote archipelago." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-sand p-6">
                <h3 className="font-display text-lg text-ocean">{item.title}</h3>
                <p className="mt-2 text-sm text-charcoal/80">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Local business spotlight */}
        {featured[0] && (
          <section aria-labelledby="spotlight-heading" className="grid gap-8 rounded-2xl bg-sand p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <PlaceholderImage
              label={`${featured[0].name} — photography needed`}
              className="aspect-[4/3] w-full rounded-2xl"
            />
            <div>
              <p className="label-caps text-coral">Local business spotlight</p>
              <h2 id="spotlight-heading" className="mt-2 font-display text-2xl text-ocean">
                {featured[0].name}
              </h2>
              <p className="mt-3 text-charcoal/85">{featured[0].shortDescription}</p>
              <Link
                href={`/businesses/${featured[0].slug}`}
                className="mt-5 inline-block font-semibold text-lagoon no-underline hover:text-ocean"
              >
                View listing →
              </Link>
            </div>
          </section>
        )}

        {/* 13. Mwakete promotional section */}
        <section aria-labelledby="mwakete-heading">
          <h2 id="mwakete-heading" className="sr-only">
            Mwakete marketplace
          </h2>
          <MwaketePromo />
        </section>

        {/* 14. Practical travel information preview */}
        <section aria-labelledby="travel-info-heading" className="grid gap-6 sm:grid-cols-3">
          <h2 id="travel-info-heading" className="sr-only">
            Practical travel information
          </h2>
          {[
            { title: "Getting here", copy: "Flights route through Bonriki International Airport on South Tarawa. Confirm current routing with an airline." },
            { title: "When to go", copy: "Kiribati has a tropical climate year-round — check seasonal rainfall and cyclone guidance before booking." },
            { title: "Staying connected", copy: "Internet access is improving but still limited on outer islands — plan accordingly." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-grey/15 p-6">
              <h3 className="font-display text-lg text-ocean">{item.title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{item.copy}</p>
            </div>
          ))}
          <div className="sm:col-span-3">
            <Link href="/travel-guide" className="font-semibold text-lagoon no-underline hover:text-ocean">
              Read the full travel guide →
            </Link>
          </div>
        </section>

        {/* Journal preview */}
        <section aria-labelledby="journal-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="journal-heading" className="font-display text-3xl text-ocean">
              From the journal
            </h2>
            <Link href="/journal" className="text-sm font-semibold text-lagoon no-underline hover:text-ocean">
              Visit the journal →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* 15. Business listing invitation */}
        <section aria-labelledby="listing-invite-heading" className="rounded-2xl bg-ocean px-8 py-14 text-center text-warm-white sm:px-12">
          <h2 id="listing-invite-heading" className="font-display text-3xl">
            Run a tourism business in Kiribati?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-warm-white/80">
            Independent businesses are always welcome in the directory —
            selling through Mwakete is never required to be listed.
          </p>
          <Button href="/submit-business" variant="secondary" className="mt-6">
            List your business
          </Button>
        </section>

        {/* 16. Newsletter — omitted: no working, consented collection
            mechanism is implemented yet. See README "Known limitations". */}

        {/* Explore more destinations */}
        <section aria-labelledby="more-destinations-heading">
          <h2 id="more-destinations-heading" className="font-display text-3xl text-ocean">
            More islands to discover
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(1, 4).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
