//convert, for example, "Jane Smith" to "jane-smith"
export function nameToSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

//convert, for example, "jane-smith" to "Jane Smith"
export function slugToName(slug) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}