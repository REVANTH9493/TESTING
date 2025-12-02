"use server";

import { getPersonalizedCourseRecommendations, type PersonalizedCourseRecommendationsInput } from "@/ai/flows/personalized-course-recommendations";

export async function getRecommendationsAction(
  input: PersonalizedCourseRecommendationsInput
) {
  try {
    const result = await getPersonalizedCourseRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get recommendations." };
  }
}
