import { shlokas, Shloka } from "../data/shlokas";

export function detectEmotions(input: string): string[] {
  const lowercaseInput = input.toLowerCase();
  const emotionMap: { [key: string]: string[] } = {
    anxiety: ["anxious", "worry", "worried", "nervous", "exam", "result", "future", "stress", "stressed"],
    fear: ["scared", "fear", "afraid", "frightened", "terror"],
    failure: ["fail", "failed", "loser", "defeated", "setback"],
    sadness: ["sad", "unhappy", "pain", "crying", "depressed", "sorrow", "grief"],
    anger: ["angry", "rage", "mad", "frustrated", "irritated", "hate"],
    greed: ["money", "rich", "possessions", "want", "more", "greedy"],
    helplessness: ["helpless", "cannot", "stuck", "useless", "hopeless"],
    distraction: ["focus", "distracted", "mobile", "social media", "mind wandering"],
    ego: ["ego", "superior", "better than", "arrogant", "pride"],
    perfectionism: ["perfect", "mistake", "fault", "error", "guilt"],
    laziness: ["lazy", "procrastination", "bored", "stuck", "avoiding", "bed"],
    uncertainty: ["uncertain", "confused", "doubt", "what to do"],
    comparison: ["jealous", "envy", "social media", "others", "better than me"],
    unjust: ["unfair", "unjust", "corrupt", "cheated"],
  };

  const detected: string[] = [];
  for (const [emotion, keywords] of Object.entries(emotionMap)) {
    if (keywords.some(keyword => lowercaseInput.includes(keyword))) {
      detected.push(emotion);
    }
  }
  
  return detected;
}

export function findRelevantShloka(emotions: string[]): Shloka {
  // If no emotions detected, return a random one or a general one
  if (emotions.length === 0) {
    return shlokas[Math.floor(Math.random() * shlokas.length)];
  }

  // Find shlokas that match the most detected emotions
  const scoredShlokas = shlokas.map(shloka => {
    const score = shloka.emotions.filter(e => emotions.includes(e)).length;
    return { shloka, score };
  });

  // Sort by score descending
  scoredShlokas.sort((a, b) => b.score - a.score);

  // Return the best match (or random among top matches if tied)
  const topScore = scoredShlokas[0].score;
  const bestMatches = scoredShlokas.filter(s => s.score === topScore);
  
  return bestMatches[Math.floor(Math.random() * bestMatches.length)].shloka;
}
