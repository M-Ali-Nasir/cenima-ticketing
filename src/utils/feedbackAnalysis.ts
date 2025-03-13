import natural from 'natural';

// Initialize the sentiment analyzer
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

// Initialize the language processor
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Common English stopwords
const stopwords = [
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with', 'the', 'this', 'but', 'they', 'have', 'had', 'what', 'when',
  'where', 'who', 'which', 'why', 'how', 'all', 'any', 'both', 'each', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'can', 'just', 'should', 'now'
];

// Offensive words list (simplified for demo)
const offensiveWords = [
  'abuse', 'abusive', 'attack', 'awful', 'bad', 'crap', 'damn', 'disgusting',
  'hate', 'horrible', 'idiot', 'jerk', 'loser', 'nasty', 'offensive', 'pathetic',
  'racist', 'sexist', 'shit', 'stupid', 'suck', 'terrible', 'trash', 'ugly',
  'worst', 'worthless'
];

// Stemmed offensive words for better matching
const stemmedOffensiveWords = offensiveWords.map(word => stemmer.stem(word));

export interface FeedbackAnalysis {
  sentiment: {
    score: number;
    comparative: number;
    vote: 'positive' | 'negative' | 'neutral';
  };
  isOffensive: boolean;
  offensiveWords: string[];
  keywords: string[];
}

export function analyzeFeedback(text: string): FeedbackAnalysis {
  // Tokenize the text
  const tokens = tokenizer.tokenize(text.toLowerCase());
  
  // Stem the tokens
  const stemmedTokens = tokens.map(token => stemmer.stem(token));
  
  // Analyze sentiment
  const sentimentScore = analyzer.getSentiment(tokens);
  
  // Check for offensive content
  const offensiveMatches = stemmedTokens.filter(token => 
    stemmedOffensiveWords.includes(token)
  );
  
  // Map stemmed offensive words back to original words in the text
  const foundOffensiveWords = tokens.filter((token, index) => 
    stemmedOffensiveWords.includes(stemmedTokens[index])
  );
  
  // Extract keywords (simplified approach)
  const keywords = tokens.filter(token => 
    token.length > 3 && !stopwords.includes(token)
  ).slice(0, 5);
  
  return {
    sentiment: {
      score: sentimentScore,
      comparative: sentimentScore / tokens.length,
      vote: sentimentScore > 0.05 
        ? 'positive' 
        : sentimentScore < -0.05 
          ? 'negative' 
          : 'neutral'
    },
    isOffensive: offensiveMatches.length > 0,
    offensiveWords: Array.from(new Set(foundOffensiveWords)),
    keywords
  };
}

export function moderateFeedback(text: string): { 
  isApproved: boolean; 
  moderatedText: string;
  reason?: string;
} {
  const analysis = analyzeFeedback(text);
  
  // Reject if offensive
  if (analysis.isOffensive) {
    return {
      isApproved: false,
      moderatedText: text,
      reason: `Contains offensive language: ${analysis.offensiveWords.join(', ')}`
    };
  }
  
  // Reject if extremely negative
  if (analysis.sentiment.score < -0.7) {
    return {
      isApproved: false,
      moderatedText: text,
      reason: 'Extremely negative content'
    };
  }
  
  // Censor offensive words if any slipped through our detection
  let moderatedText = text;
  offensiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    moderatedText = moderatedText.replace(regex, '****');
  });
  
  return {
    isApproved: true,
    moderatedText
  };
} 