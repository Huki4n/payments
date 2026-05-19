import { useGetSavingsSlidesQuery } from "../api/goals-api";

export function useSavingsSlides() {
  const { data: slides = [], isLoading, isError, error } =
    useGetSavingsSlidesQuery();

  return { slides, isLoading, isError, error };
}
