export const generateSlug = ({
  title,
  year,
}: {
  title: string;
  year: string;
}) => {
  const titleSlug = title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

  return `${titleSlug}-${year}`;
};
