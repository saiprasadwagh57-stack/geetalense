import { shlokas, Shloka } from "../data/shlokas";

export function detectEmotions(input: string): string[] {
  const lowercaseInput = input.toLowerCase();
  const emotionMap: { [key: string]: string[] } = {
    anxiety: [
      "anxious", "worry", "worried", "nervous", "exam", "result", "future", "stress", "stressed", "overthinking", "panic", "tension", "pressure",
      "चिंता", "काळजी", "तणाव", "घबराट", "परीक्षा", "भविष्य", "tension", "परेशान"
    ],
    fear: [
      "scared", "fear", "afraid", "frightened", "terror", "phobia", "death", "danger",
      "भीती", "भय", "घाबरलो", "डर", "खौफ"
    ],
    failure: [
      "fail", "failed", "loser", "defeated", "setback", "rejected", "rejection", "interview", "loss", "lost",
      "अपयश", "हार", "नापास", "अपयशी", "नुकसान", "फेल"
    ],
    sadness: [
      "sad", "unhappy", "pain", "crying", "depressed", "depression", "sorrow", "grief", "lonely", "alone", "heartbreak", "breakup",
      "दुःख", "उदास", "एकटेपणा", "रडणे", "वेदना", "विरह", "दुखी"
    ],
    anger: [
      "angry", "rage", "mad", "frustrated", "irritated", "hate", "fight", "screaming", "temper",
      "राग", "संताप", "चीड", "क्रोध", "भांडण", "गुस्सा"
    ],
    greed: [
      "money", "rich", "possessions", "want", "more", "greedy", "wealth", "luxury",
      "लोभ", "लालच", "हव्यास", "पैसे", "श्रीमंत"
    ],
    helplessness: [
      "helpless", "cannot", "stuck", "useless", "hopeless", "powerless", "tired", "giving up",
      "हताश", "असमर्थ", "लाचार", "मदत", "काहीच जमत नाही"
    ],
    distraction: [
      "focus", "distracted", "mobile", "social media", "mind wandering", "attention", "concentration", "study", "studying",
      "लक्ष", "एकाग्रता", "अभ्यास", "मन भटकणे", "ध्यान"
    ],
    ego: [
      "ego", "superior", "better than", "arrogant", "pride", "jealousy", "status",
      "अहंकार", "गर्व", "माझा मोठेपणा", "घमंड"
    ],
    perfectionism: [
      "perfect", "mistake", "fault", "error", "guilt", "regret", "past",
      "चूक", "पश्चात्ताप", "दोष", "गिल्ट"
    ],
    laziness: [
      "lazy", "procrastination", "bored", "stuck", "avoiding", "bed", "sleep", "inactive", "delay", "tomorrow",
      "आळस", "सुस्ती", "कंटाळा", "टाळाटाळ", "काम पुढे ढकलणे"
    ],
    uncertainty: [
      "uncertain", "confused", "doubt", "what to do", "decision", "choice", "career", "path",
      "संभ्रम", "गोंधळ", "शंका", "निर्णय", "काय करू", "मार्ग"
    ],
    comparison: [
      "jealous", "envy", "social media", "others", "better than me", "comparison", "inferior",
      "मत्सर", "जळफळाट", "तुलना", "ईर्ष्या"
    ],
    unjust: [
      "unfair", "unjust", "corrupt", "cheated", "betrayal", "cheating", "fraud",
      "अन्याय", "विश्वासघात", "फसवणूक", "धोका"
    ],
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
  // If no emotions detected, return a foundational verse (Karma Yoga BG 2.47 or Mind Control BG 6.5)
  if (emotions.length === 0) {
    return shlokas[0];
  }

  // Find shlokas that match the most detected emotions
  const scoredShlokas = shlokas.map(shloka => {
    const score = shloka.emotions.filter(e => emotions.includes(e)).length;
    return { shloka, score };
  });

  // Sort by score descending
  scoredShlokas.sort((a, b) => b.score - a.score);

  // Return the best match (or first among top matches)
  const topScore = scoredShlokas[0].score;
  const bestMatches = scoredShlokas.filter(s => s.score === topScore);
  
  return bestMatches[0].shloka;
}
