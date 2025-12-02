'use server';

/**
 * @fileOverview A personalized course recommendation AI agent.
 *
 * - getPersonalizedCourseRecommendations - A function that handles the course recommendation process.
 * - PersonalizedCourseRecommendationsInput - The input type for the getPersonalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the getPersonalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  learningHistory: z
    .array(z.string())
    .describe('List of course names the user has completed.'),
  searchHistory: z
    .array(z.string())
    .describe('List of search queries the user has made on the platform.'),
  interests: z
    .array(z.string())
    .describe('List of topics or subjects the user is interested in.'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('List of recommended course names.'),
  reasoning: z
    .string()
    .describe('Explanation of why these courses were recommended.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized course recommendations to users based on their learning history, search history, and interests.

  Consider the following information about the user:

  Learning History: {{#if learningHistory.length}}{{#each learningHistory}}- {{this}}
  {{/each}}{{else}}No learning history available.{{/if}}
  Search History: {{#if searchHistory.length}}{{#each searchHistory}}- {{this}}
  {{/each}}{{else}}No search history available.{{/if}}
  Interests: {{#if interests.length}}{{#each interests}}- {{this}}
  {{/each}}{{else}}No specified interests.{{/if}}

  Based on this information, recommend courses that would be most relevant and helpful to the user. Explain your reasoning for each recommendation.

  Format your response as a JSON object with 'recommendedCourses' (an array of course names) and 'reasoning' (a string explaining the recommendations) fields.
  `,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
