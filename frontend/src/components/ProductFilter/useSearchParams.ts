import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type SearchParamValue =
  | string
  | string[]
  | null
  | undefined;

export type SearchParamState = Record<string, string[]>;

const normalizeKey = (key: string) => {
  return key.trim().toLowerCase();
};

const normalizeValues = (
  value: SearchParamValue
): string[] => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return [];
  }

  const values = Array.isArray(value)
    ? value
    : [value];

  return values
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseSearchParams = (
  searchParams: URLSearchParams
): SearchParamState => {
  const state: SearchParamState = {};

  searchParams.forEach((value, key) => {
    const normalizedKey = normalizeKey(key);

    const values = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!state[normalizedKey]) {
      state[normalizedKey] = [];
    }

    state[normalizedKey].push(...values);
  });

  return state;
};

const useSearchParam = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  /*
   * This is recalculated whenever the URL search params
   * change.
   *
   * URL:
   *
   * ?category=burger,pizza&brand=nike
   *
   * state:
   *
   * {
   *   category: ["burger", "pizza"],
   *   brand: ["nike"]
   * }
   */
  const state = useMemo(() => {
    return parseSearchParams(searchParams);
  }, [searchParams]);

  /*
   * Get one parameter.
   */
  const getParam = useCallback(
    (key: string): string[] => {
      const normalizedKey = normalizeKey(key);

      return state[normalizedKey] ?? [];
    },
    [state]
  );

  /*
   * Set / update one parameter.
   *
   * IMPORTANT:
   *
   * This does NOT append another parameter.
   *
   * Existing:
   *
   * ?category=burger,pizza&brand=nike
   *
   * setParam("category", ["pizza"])
   *
   * becomes:
   *
   * ?category=pizza&brand=nike
   */
  const setParam = useCallback(
    (
      key: string,
      value: SearchParamValue
    ): SearchParamState => {
      const normalizedKey = normalizeKey(key);

      /*
       * Copy current URL params.
       */
      const params = new URLSearchParams(
        searchParams
      );

      /*
       * Remove existing value.
       */
      params.delete(normalizedKey);

      /*
       * Convert string / string[] into string[].
       */
      const values = normalizeValues(value);

      /*
       * Set the new value once.
       */
      if (values.length > 0) {
        params.set(
          normalizedKey,
          values.join(",")
        );
      }

      /*
       * Update URL.
       *
       * React Router will trigger a re-render.
       */
      setSearchParams(params);

      /*
       * Return the state that will exist after this update.
       *
       * We parse `params`, not the old `searchParams`.
       */
      return parseSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  /*
   * Remove one parameter completely.
   */
  const removeParam = useCallback(
    (key: string): SearchParamState => {
      const normalizedKey = normalizeKey(key);

      const params = new URLSearchParams(
        searchParams
      );

      params.delete(normalizedKey);

      setSearchParams(params);

      return parseSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  /*
   * Check whether a parameter contains a value.
   */
  const hasParam = useCallback(
    (key: string, value: string): boolean => {
      return getParam(key).includes(value);
    },
    [getParam]
  );

  /*
   * Get the complete current state.
   */
  const getAllParams = useCallback(() => {
    return state;
  }, [state]);

  /*
   * Clear every search parameter.
   */
  const clearParams = useCallback(() => {
    const params = new URLSearchParams();

    setSearchParams(params);

    return {};
  }, [setSearchParams]);

  return {
    /*
     * Current parsed URL state
     */
    state,

    /*
     * Individual parameter
     */
    getParam,

    /*
     * Update individual parameter
     */
    setParam,

    /*
     * Remove individual parameter
     */
    removeParam,

    /*
     * Check value
     */
    hasParam,

    /*
     * Get everything
     */
    getAllParams,

    /*
     * Clear everything
     */
    clearParams,
  };
};

export default useSearchParam;