
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });
  }

  async generatePost(topic: string, tone: string): Promise<string> {
    try {
      // Advanced prompt engineering for "Human" writing
      const prompt = `You are a world-class ghostwriter for a top tech founder. Write a LinkedIn post about "${topic}".
      
      STRICT WRITING RULES (To sound Human, NOT AI):
      1. NO corporate jargon (e.g., "delve", "landscape", "game-changer", "unleash").
      2. NO "Broetry" (do not put a line break after every single sentence). Group thoughts into short paragraphs.
      3. Start with a cold hook. No "Hello connections" or "I want to talk about".
      4. Use a conversational, slightly imperfect tone. It's okay to start sentences with "And" or "But".
      5. Focus on a specific story, mistake, or realization. Be vulnerable.
      6. Tone: ${tone}.
      7. Length: 150-250 words.
      
      Structure:
      - Hook (1 short sentence, controversial or surprising)
      - The Context (2-3 sentences)
      - The Meat (The insight/story)
      - The Takeaway (1 strong sentence)
      - Engagement Question (Short)

      Output ONLY the post body text.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Could not generate content. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "An error occurred while connecting to the AI. Please check your connection.";
    }
  }

  async improveContent(content: string, instruction: string): Promise<string> {
    try {
      const prompt = `Act as a senior editor. 
      Current draft: "${content}"
      Instruction: ${instruction}
      
      Goal: Make it sound more human, punchier, and remove any "AI fluff".
      Return ONLY the improved content text.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || content;
    } catch (error) {
       return content;
    }
  }

  async generateHooks(content: string): Promise<string[]> {
    try {
       const prompt = `Read this post: "${content}".
       Generate 3 viral opening hooks/headlines.
       Style: Click-worthy but not clickbait. Short. Punchy.
       Return them as a JSON array of strings. e.g. ["Hook 1", "Hook 2"]`;
       
       const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      
      return this.parseJson(response.text);
    } catch (e) {
      return ["Here is the truth...", "Stop doing this immediately.", "I learned this the hard way."];
    }
  }

  async generateCarousel(topic: string): Promise<{title: string, body: string}[]> {
    try {
      const prompt = `Create a 5-slide educational LinkedIn carousel about: "${topic}".
      Return a JSON array where each item has a "title" (short, punchy) and "body" (1-2 sentences max).
      
      Rules:
      - Keep it actionable.
      - No fluff.
      - Slide 1: The Hook.
      - Slide 5: The Summary/CTA.
      
      Example output format:
      [{"title": "Slide 1", "body": "text"}, {"title": "Slide 2", "body": "text"}]`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const result = this.parseJson(response.text);
      // Validate structure
      if (Array.isArray(result) && result.length > 0 && result[0].title) {
         return result;
      }
      throw new Error("Invalid JSON structure");
    } catch (e) {
      console.error(e);
      return [
        { title: "Error Generating", body: "Please try again." },
        { title: "Slide 2", body: "Content placeholder." }
      ];
    }
  }

  async generateReply(commentText: string): Promise<string> {
    try {
      const prompt = `Write a casual, friendly reply to this comment: "${commentText}". 
      Don't sound like a bot. Keep it lower case (optional) and casual. Under 20 words.`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || "Thanks for sharing!";
    } catch (e) {
      return "Thanks for the comment!";
    }
  }

  private parseJson(text: string | undefined): any {
     if (!text) return [];
     try {
        // Remove markdown code blocks if present
        let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
     } catch (e) {
        console.error("JSON Parse Error", e);
        return [];
     }
  }
}
