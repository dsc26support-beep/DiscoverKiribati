// Decap CMS configuration. Edits are saved as pull requests ("editorial
// workflow"), so nothing goes live until someone merges it — and the build
// re-validates every content file before deploying (scripts/validate-content.ts).
// Login goes through the Cloudflare Pages Functions in /functions/api.
(function () {
  var text = function (name, label, extra) {
    return Object.assign({ name: name, label: label, widget: "string" }, extra || {});
  };
  var optional = { required: false };
  var image = {
    name: "image", label: "Photo", widget: "object", required: false,
    hint: "Leave empty for no photo. If you add one, every box below is required.",
    fields: [
      { name: "src", label: "Image file", widget: "image" },
      text("alt", "Alt text (describe the photo for screen readers)"),
      text("credit", "Photographer / source"),
      text("licence", "Licence or permission (e.g. 'Owned by business, permission granted')"),
    ],
  };
  var common = [
    text("id", "ID (short unique code, e.g. b9)"),
    text("slug", "Web address name (lowercase, hyphens)", { pattern: ["^[a-z0-9]+(-[a-z0-9]+)*$", "Lowercase letters, numbers and hyphens only"] }),
    { name: "order", label: "Display order (1 = first)", widget: "number", value_type: "int", min: 1 },
  ];
  var destination = { name: "destination", label: "Island / destination", widget: "relation", collection: "destinations", search_fields: ["name"], value_field: "slug", display_fields: ["name"] };
  var folder = function (name, label, label_singular, fields, extra) {
    return Object.assign({
      name: name, label: label, label_singular: label_singular, folder: "content/" + name,
      create: true, extension: "json", format: "json", identifier_field: "slug",
      slug: "{{slug}}", fields: fields,
    }, extra || {});
  };

  window.CMS_CONFIG = {
    load_config_file: false,
    backend: {
      name: "github",
      repo: "dsc26support-beep/DiscoverKiribati",
      branch: "main",
      base_url: window.location.origin,
      auth_endpoint: "api/auth",
    },
    publish_mode: "editorial_workflow",
    media_folder: "public/images",
    public_folder: "/images",
    site_url: window.location.origin,
    collections: [
      folder("businesses", "Businesses", "Business", common.concat([
        text("name", "Business name"),
        { name: "category", label: "Category", widget: "select", options: [
          { label: "Accommodation", value: "accommodation" }, { label: "Tours & Activities", value: "tours-activities" },
          { label: "Culture & Community", value: "culture-community" }, { label: "Food & Dining", value: "food-dining" },
          { label: "Transport", value: "transport" }, { label: "Local Services", value: "local-services" },
          { label: "Shops & Souvenirs", value: "shops-souvenirs" }, { label: "Travel Essentials", value: "travel-essentials" } ] },
        destination,
        text("location", "Town / village", optional),
        text("shortDescription", "Short description (one or two sentences)"),
        { name: "description", label: "Full description", widget: "text" },
        image,
        text("website", "Website (full https:// address)", optional),
        text("email", "Email", optional),
        text("phone", "Phone", optional),
        { name: "mwaketeSeller", label: "Also sells on Mwakete", widget: "boolean", default: false },
        { name: "featured", label: "Featured on homepage", widget: "boolean", default: false },
        { name: "sponsored", label: "Paid / sponsored placement (shows a label)", widget: "boolean", default: false },
        { name: "verificationStatus", label: "Verification status (be honest)", widget: "select", options: [
          { label: "Information supplied by business", value: "information-supplied-by-business" },
          { label: "Details pending confirmation", value: "details-pending-confirmation" },
          { label: "Unverified", value: "unverified" } ] },
        { name: "listingStatus", label: "Listing status", widget: "select", options: [
          { label: "Draft (not public)", value: "draft" }, { label: "Published", value: "published" }, { label: "Demo (sample only)", value: "demo" } ] },
        text("lastReviewed", "Last reviewed (YYYY-MM-DD) — required when Published", Object.assign({ pattern: ["^\\d{4}-\\d{2}-\\d{2}$", "Use YYYY-MM-DD"] }, optional)),
        text("affiliateUrl", "Affiliate link — only if an approved partner exists", optional),
        text("affiliateDisclosure", "Affiliate disclosure sentence", optional),
      ]), { summary: "{{name}} — {{listingStatus}}" }),

      folder("destinations", "Destinations", "Destination", common.concat([
        text("name", "Name"),
        { name: "region", label: "Region", widget: "select", options: ["Gilbert Islands", "Phoenix Islands", "Line Islands"] },
        { name: "introduction", label: "Introduction", widget: "text" },
        { name: "geography", label: "Geography", widget: "text" },
        { name: "practicalNotes", label: "Practical notes", widget: "text" },
        { name: "needsVerification", label: "Facts still to verify", widget: "list", required: false, default: [] },
        { name: "suggestedExperienceSlugs", label: "Suggested experiences", widget: "relation", collection: "experiences", search_fields: ["title"], value_field: "slug", display_fields: ["title"], multiple: true, required: false },
        { name: "nearbyDestinationSlugs", label: "Nearby destinations", widget: "relation", collection: "destinations", search_fields: ["name"], value_field: "slug", display_fields: ["name"], multiple: true, required: false },
        image,
      ])),

      folder("experiences", "Experiences", "Experience", common.concat([
        text("title", "Title"),
        { name: "introduction", label: "Introduction", widget: "text" },
        { name: "description", label: "Description", widget: "text" },
        destination,
        { name: "relatedBusinessSlugs", label: "Related businesses", widget: "relation", collection: "businesses", search_fields: ["name"], value_field: "slug", display_fields: ["name"], multiple: true, required: false },
        { name: "safetyNotes", label: "Safety notes", widget: "text", required: false },
        text("bookingUrl", "Booking link (https://)", optional),
        { name: "isSample", label: "Sample content (hidden from search engines)", widget: "boolean", default: false },
        image,
      ])),

      folder("articles", "Journal articles", "Article", common.concat([
        text("title", "Title"),
        { name: "category", label: "Category", widget: "select", options: [
          { label: "Destination Guides", value: "destination-guides" }, { label: "Culture & Traditions", value: "culture-traditions" },
          { label: "Food", value: "food" }, { label: "Ocean & Nature", value: "ocean-nature" },
          { label: "Community Stories", value: "community-stories" }, { label: "Travel Planning", value: "travel-planning" },
          { label: "Local Business Features", value: "local-business-features" } ] },
        { name: "summary", label: "Summary", widget: "text" },
        { name: "body", label: "Paragraphs", widget: "list", field: { name: "paragraph", label: "Paragraph", widget: "text" } },
        { name: "publishedStatus", label: "Status", widget: "select", options: [
          { label: "Unpublished", value: "unpublished" }, { label: "Published", value: "published" }, { label: "Sample", value: "sample" } ] },
        image,
      ])),
    ],
  };
})();
