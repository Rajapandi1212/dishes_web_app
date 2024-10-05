export const SUPPORTED_LANGUAGES = ["en", "ta", "es"];
export const dishColumnsMap: Record<string, string> = {
  name: "Name",
  diet: "Diet",
  state: "State",
  region: "Region",
  flavor: "Flavor",
  course: "Course",
  prep_time: "Prep Time",
  cook_time: "Cook Time",
};

export const dishColumnsArray = Object.entries(dishColumnsMap).map(
  ([key, value]) => ({
    key,
    value,
  })
);

export const orderDirections = [
  { key: "ASC", value: "ASC" },
  { key: "DESC", value: "DESC" },
];

export const radioOptions = [
  {
    value: "lte",
    label: "Lesser Than / Equal",
  },
  {
    value: "gte",
    label: "Greater Than / Equal",
  },
];
