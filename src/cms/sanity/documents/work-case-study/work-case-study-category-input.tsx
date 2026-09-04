import { useEffect, useState } from "react";
import { set, type StringInputProps, useClient } from "sanity";

import { apiVersion } from "../../env";

const CATEGORIES_QUERY = `array::unique(
  *[_type in ["page", "report"]].sections[_type == "workCaseStudiesSection"].categories[]
)`;

export function WorkCaseStudyCategoryInput({
  value,
  onChange,
  elementProps,
}: StringInputProps) {
  const client = useClient({ apiVersion });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch<string[]>(CATEGORIES_QUERY)
      .then((result) => {
        if (!cancelled) setCategories(result ?? []);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      });

    return () => {
      cancelled = true;
    };
  }, [client]);

  const options =
    value && !categories.includes(value) ? [value, ...categories] : categories;

  return (
    <div>
      <select
        {...elementProps}
        value={value ?? ""}
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          onChange(set(nextValue || undefined));
        }}
      >
        <option value="">Select a category</option>
        {options.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {!categories.length && (
        <p>Add categories in a Work - Case Studies section first.</p>
      )}
    </div>
  );
}
