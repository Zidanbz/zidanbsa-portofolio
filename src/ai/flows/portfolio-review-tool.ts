'use server';

/**
 * @fileOverview An AI-powered portfolio review tool.
 *
 * - portfolioReviewTool - A function that handles the portfolio review process.
 * - PortfolioReviewToolInput - The input type for the portfolioReviewTool function.
 * - PortfolioReviewToolOutput - The return type for the portfolioReviewTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioReviewToolInputSchema = z.object({
  portfolioLink: z.string().url().describe('The link to the portfolio to be reviewed.'),
});
export type PortfolioReviewToolInput = z.infer<typeof PortfolioReviewToolInputSchema>;

const PortfolioReviewToolOutputSchema = z.object({
  aestheticsFeedback: z.string().describe('Feedback on the portfolio aesthetics.'),
  featuresFeedback: z.string().describe('Feedback on the portfolio features.'),
  contentFeedback: z.string().describe('Feedback on the portfolio content.'),
  overallFeedback: z.string().describe('Overall feedback and suggestions for improvement.'),
});
export type PortfolioReviewToolOutput = z.infer<typeof PortfolioReviewToolOutputSchema>;

export async function portfolioReviewTool(input: PortfolioReviewToolInput): Promise<PortfolioReviewToolOutput> {
  return portfolioReviewToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioReviewToolPrompt',
  input: {schema: PortfolioReviewToolInputSchema},
  output: {schema: PortfolioReviewToolOutputSchema},
  prompt: `You are an expert portfolio reviewer providing feedback on computer science student portfolios.

  Analyze the portfolio at the following link: {{{portfolioLink}}}

  Provide detailed feedback on the aesthetics, features, and content of the portfolio.
  Also, provide overall feedback and suggestions for improvement based on industry best practices and successful portfolio examples.

  Your output must conform to the following JSON schema: ${JSON.stringify(PortfolioReviewToolOutputSchema.describe(''))}`,
});

const portfolioReviewToolFlow = ai.defineFlow(
  {
    name: 'portfolioReviewToolFlow',
    inputSchema: PortfolioReviewToolInputSchema,
    outputSchema: PortfolioReviewToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
