import { GitaConcept, PersonaType, ProblemCategory } from '../types/gitaKnowledge';

export interface ProblemDefinition {
  slug: string;
  category: ProblemCategory;
  title_en: string;
  title_mr: string;
  keywords_en: string[];
  keywords_mr: string[];
  recommended_verses: string[]; // e.g. ["BG_2_47", "BG_6_5"]
}

export interface PersonaDefinition {
  type: PersonaType;
  title_en: string;
  title_mr: string;
  tagline_en: string;
  tagline_mr: string;
  common_problems: string[];
  core_verses: string[];
}

// -------------------------------------------------------------
// 1. Problem Taxonomy (6 Categories & Full Sub-Problems)
// -------------------------------------------------------------
export const PROBLEM_TAXONOMY: ProblemDefinition[] = [
  // Student Problems
  {
    slug: 'exam_stress',
    category: 'student_problems',
    title_en: 'Exam Stress & Tension',
    title_mr: 'परीक्षेचा ताण व चिंता',
    keywords_en: ['exam', 'test', 'marks', 'score', 'revision', 'stress', 'panic', 'hall ticket'],
    keywords_mr: ['परीक्षा', 'ताण', 'पेपर', 'गुण', 'अभ्यास', 'घाबरणे'],
    recommended_verses: ['BG_2_47', 'BG_2_14', 'BG_6_5']
  },
  {
    slug: 'fear_of_failure',
    category: 'student_problems',
    title_en: 'Fear of Failure & Academic Defeat',
    title_mr: 'अपयशाची भीती व निराशा',
    keywords_en: ['fail', 'failure', 'rejected', 'losing', 'mock test', 'loser', 'embarrassment'],
    keywords_mr: ['अपयश', 'नापास', 'हार', 'फेल', 'भय', 'लाज'],
    recommended_verses: ['BG_2_47', 'BG_2_38', 'BG_2_11', 'BG_18_38']
  },
  {
    slug: 'career_confusion',
    category: 'student_problems',
    title_en: 'Career Confusion & Decision Making',
    title_mr: 'करिअर संभ्रम व योग्य दिशा',
    keywords_en: ['career', 'degree', 'stream', 'confusion', 'choice', 'future job', 'profession'],
    keywords_mr: ['करिअर', 'दिशा', 'शिक्षण', 'गोंधळ', 'भविष्य', 'निवड'],
    recommended_verses: ['BG_3_35', 'BG_18_47', 'BG_2_41']
  },
  {
    slug: 'lack_of_concentration',
    category: 'student_problems',
    title_en: 'Lack of Concentration & Mind Wandering',
    title_mr: 'एकाग्रतेचा अभाव व भटकणारे मन',
    keywords_en: ['focus', 'distracted', 'concentration', 'mind wandering', 'daydreaming', 'phone addiction'],
    keywords_mr: ['एकाग्रता', 'लक्ष', 'मन भटकणे', 'मोबाइल', 'चंचल मन'],
    recommended_verses: ['BG_6_26', 'BG_6_34', 'BG_6_35', 'BG_2_62']
  },
  {
    slug: 'procrastination_laziness',
    category: 'student_problems',
    title_en: 'Procrastination & Lethargy',
    title_mr: 'काम पुढे ढकलणे व आळस',
    keywords_en: ['procrastinate', 'delay', 'lazy', 'tomorrow', 'inactive', 'unmotivated', 'sloth'],
    keywords_mr: ['आळस', 'टाळाटाळ', 'उद्या करू', 'कंटाळा', 'सुस्ती'],
    recommended_verses: ['BG_18_39', 'BG_3_8', 'BG_6_5']
  },
  {
    slug: 'comparison_peer_pressure',
    category: 'student_problems',
    title_en: 'Comparison with Peers & Envy',
    title_mr: 'इतरांशी तुलना व मत्सराची भावना',
    keywords_en: ['comparison', 'classmate', 'ranks', 'jealous', 'relative scores', 'peer pressure'],
    keywords_mr: ['तुलना', 'दुसऱ्यांशी स्पर्धा', 'मत्सर', 'दबाव'],
    recommended_verses: ['BG_3_35', 'BG_12_13', 'BG_5_18']
  },

  // Emotional Problems
  {
    slug: 'fear_anxiety',
    category: 'emotional_problems',
    title_en: 'Fear, Panic & Dread',
    title_mr: 'भीती, घबराट व असुरक्षितता',
    keywords_en: ['fear', 'anxious', 'terror', 'phobia', 'nervousness', 'dread', 'panic attack'],
    keywords_mr: ['भीती', 'घाबरणे', 'थरकाप', 'असुरक्षित', 'घबराट'],
    recommended_verses: ['BG_2_11', 'BG_4_10', 'BG_18_66', 'BG_2_14']
  },
  {
    slug: 'anger_frustration',
    category: 'emotional_problems',
    title_en: 'Anger & Rage Management',
    title_mr: 'क्रोध, संताप व चिडचिड',
    keywords_en: ['anger', 'angry', 'rage', 'temper', 'shouting', 'hate', 'furious', 'irritated'],
    keywords_mr: ['राग', 'क्रोध', 'संताप', 'चीड', 'भांडण'],
    recommended_verses: ['BG_2_62', 'BG_2_63', 'BG_16_21', 'BG_5_23']
  },
  {
    slug: 'sadness_grief_loss',
    category: 'emotional_problems',
    title_en: 'Sadness, Grief & Deep Loss',
    title_mr: 'दुःख, शोक व विरह',
    keywords_en: ['sad', 'grief', 'crying', 'loss', 'death', 'mourning', 'heartbreak', 'sorrow'],
    keywords_mr: ['दुःख', 'शोक', 'रडणे', 'विरह', 'वेदना', 'उदासी'],
    recommended_verses: ['BG_2_11', 'BG_2_13', 'BG_2_20', 'BG_2_27']
  },
  {
    slug: 'overthinking_restlessness',
    category: 'emotional_problems',
    title_en: 'Overthinking & Restless Mind',
    title_mr: 'अतिविचार व मानसिक अस्वस्थता',
    keywords_en: ['overthinking', 'racing thoughts', 'insomnia', 'worrying', 'rumination', 'restless'],
    keywords_mr: ['अतिविचार', 'गोंधळ', 'अस्वस्थ मन', 'शांतता नाही'],
    recommended_verses: ['BG_6_19', 'BG_6_35', 'BG_2_70']
  },
  {
    slug: 'loneliness_isolation',
    category: 'emotional_problems',
    title_en: 'Loneliness & Inner Emptiness',
    title_mr: 'एकटेपणा व आंतरिक पोकळी',
    keywords_en: ['lonely', 'alone', 'nobody cares', 'isolated', 'empty', 'abandoned'],
    keywords_mr: ['एकटेपणा', 'कोणी नाही', 'उदास', 'एकांत'],
    recommended_verses: ['BG_6_30', 'BG_18_61', 'BG_9_29']
  },

  // Career Problems
  {
    slug: 'workplace_stress_burnout',
    category: 'career_problems',
    title_en: 'Workplace Pressure & Burnout',
    title_mr: 'कामाचा ताण व मानसिक थकवा',
    keywords_en: ['work', 'boss', 'deadline', 'target', 'overworked', 'burnout', 'corporate stress'],
    keywords_mr: ['नोकरी', 'ऑफिस', 'टार्गेट', 'थकवा', 'ताण'],
    recommended_verses: ['BG_2_47', 'BG_3_19', 'BG_5_10']
  },
  {
    slug: 'job_uncertainty_layoff',
    category: 'career_problems',
    title_en: 'Job Uncertainty & Layoffs',
    title_mr: 'नोकरीची अनिश्चितता व संकट',
    keywords_en: ['job loss', 'layoff', 'fired', 'unemployment', 'instability', 'career risk'],
    keywords_mr: ['नोकरी जाणे', 'बेरोजगारी', 'संकट', 'अनिश्चितता'],
    recommended_verses: ['BG_2_14', 'BG_9_22', 'BG_18_61']
  },
  {
    slug: 'ethical_dilemma_business',
    category: 'career_problems',
    title_en: 'Ethical Dilemma & Moral Integrity',
    title_mr: 'नैतिक पेच व सचोटी',
    keywords_en: ['ethics', 'moral', 'corruption', 'cheating', 'honesty', 'compromise', 'right and wrong'],
    keywords_mr: ['नीतिमत्ता', 'सत्य', 'प्रामाणिकपणा', 'भ्रष्टाचार', 'योग्य काय'],
    recommended_verses: ['BG_3_21', 'BG_18_30', 'BG_4_18']
  },

  // Relationship Problems
  {
    slug: 'unhealthy_attachment',
    category: 'relationship_problems',
    title_en: 'Unhealthy Attachment & Co-dependency',
    title_mr: 'अति-आसक्ती व परावलंबित्व',
    keywords_en: ['attachment', 'possession', 'clingy', 'breakup', 'heartache', 'obsession'],
    keywords_mr: ['आसक्ती', 'मोह', 'नाते', 'ब्रेकअप', 'अडकणे'],
    recommended_verses: ['BG_2_62', 'BG_5_10', 'BG_13_9']
  },
  {
    slug: 'family_conflicts_expectations',
    category: 'relationship_problems',
    title_en: 'Family Conflicts & High Expectations',
    title_mr: 'कौटुंबिक वाद व अपेक्षांचा भार',
    keywords_en: ['family', 'parents', 'in-laws', 'expectations', 'arguments', 'fights'],
    keywords_mr: ['कुटुंब', 'वाद', 'अपेक्षा', 'भांडणे', 'तणाव'],
    recommended_verses: ['BG_12_15', 'BG_12_18', 'BG_2_38']
  },
  {
    slug: 'betrayal_forgiveness',
    category: 'relationship_problems',
    title_en: 'Betrayal, Hurt & Forgiveness',
    title_mr: 'विश्वासघात व क्षमाशीलता',
    keywords_en: ['betrayed', 'cheated', 'hurt', 'forgive', 'revenge', 'grudge', 'backstabbed'],
    keywords_mr: ['विश्वासघात', 'फसवणूक', 'क्षमा', 'बदला', 'राग'],
    recommended_verses: ['BG_12_13', 'BG_16_3', 'BG_10_34']
  },

  // Life Problems
  {
    slug: 'life_purpose_meaning',
    category: 'life_problems',
    title_en: 'Life Purpose & Meaning of Existence',
    title_mr: 'जीवनाचा खरा उद्देश व सार्थकता',
    keywords_en: ['purpose', 'why am I here', 'meaning of life', 'existential crisis', 'destiny'],
    keywords_mr: ['जीवनाचा उद्देश', 'सार्थकता', 'मी कोण', 'ध्येय'],
    recommended_verses: ['BG_3_35', 'BG_18_46', 'BG_7_19', 'BG_15_15']
  },
  {
    slug: 'material_attachment_dissatisfaction',
    category: 'life_problems',
    title_en: 'Inner Emptiness Despite Material Success',
    title_mr: 'सर्व काही असूनही असमाधान व पोकळी',
    keywords_en: ['wealth', 'luxury', 'unsatisfied', 'boredom', 'hedonic treadmill', 'money'],
    keywords_mr: ['पैसे', 'असमाधान', 'सुखाची व्याख्या', 'पोकळी'],
    recommended_verses: ['BG_2_70', 'BG_5_22', 'BG_18_37']
  },

  // Social & Professional Problems
  {
    slug: 'leadership_responsibility',
    category: 'social_professional_problems',
    title_en: 'Exemplary Leadership & Setting Standards',
    title_mr: 'आदर्श नेतृत्व व सामाजिक जबाबदारी',
    keywords_en: ['leadership', 'role model', 'team lead', 'setting example', 'responsibility'],
    keywords_mr: ['नेतृत्व', 'आदर्श', 'जबाबदारी', 'मार्गदर्शन'],
    recommended_verses: ['BG_3_21', 'BG_3_25', 'BG_18_48']
  }
];

// -------------------------------------------------------------
// 2. Persona Taxonomy (9 Personas)
// -------------------------------------------------------------
export const PERSONA_TAXONOMY: PersonaDefinition[] = [
  {
    type: 'student',
    title_en: 'Student / Seeker of Knowledge',
    title_mr: 'विद्यार्थी / ज्ञानसाधक',
    tagline_en: 'Navigating exams, focus, competition, and career horizons.',
    tagline_mr: 'परीक्षा, एकाग्रता, करिअर आणि भविष्याची दिशा.',
    common_problems: ['exam_stress', 'fear_of_failure', 'lack_of_concentration', 'career_confusion', 'procrastination_laziness'],
    core_verses: ['BG_2_47', 'BG_6_5', 'BG_6_35', 'BG_3_35']
  },
  {
    type: 'child',
    title_en: 'Child / Young Youth',
    title_mr: 'बालक / किशोरवयीन',
    tagline_en: 'Building foundational habits, curiosity, and emotional resilience.',
    tagline_mr: 'चांगल्या सवयी, निर्भयता आणि आनंदी जीवन.',
    common_problems: ['fear_anxiety', 'comparison_peer_pressure', 'lack_of_concentration'],
    core_verses: ['BG_6_5', 'BG_2_14', 'BG_17_15']
  },
  {
    type: 'teacher',
    title_en: 'Teacher / Educator / Mentor',
    title_mr: 'शिक्षक / मार्गदर्शक / गुरु',
    tagline_en: 'Illuminating minds with patience, selfless duty, and role modeling.',
    tagline_mr: 'विद्यार्थ्यांना योग्य संस्कार, ज्ञान व मार्गदर्शन.',
    common_problems: ['leadership_responsibility', 'workplace_stress_burnout'],
    core_verses: ['BG_3_21', 'BG_4_34', 'BG_3_25']
  },
  {
    type: 'parent',
    title_en: 'Parent / Family Guardian',
    title_mr: 'पालक / कुटुंब प्रमुख',
    tagline_en: 'Balancing love with detachment, guidance without control.',
    tagline_mr: 'मुलांचे संगोपन, कौटुंबिक जबाबदाऱ्या आणि आसक्तीमुक्त प्रेम.',
    common_problems: ['unhealthy_attachment', 'family_conflicts_expectations', 'overthinking_restlessness'],
    core_verses: ['BG_2_47', 'BG_3_21', 'BG_12_15']
  },
  {
    type: 'professional',
    title_en: 'Working Professional',
    title_mr: 'नोकरदार / व्यावसायिक',
    tagline_en: 'Managing corporate pressures, performance targets, and inner serenity.',
    tagline_mr: 'ऑफिसचा ताण, कामाचा भार आणि मनःशांती.',
    common_problems: ['workplace_stress_burnout', 'job_uncertainty_layoff', 'anger_frustration'],
    core_verses: ['BG_2_47', 'BG_2_48', 'BG_3_19', 'BG_5_10']
  },
  {
    type: 'entrepreneur',
    title_en: 'Entrepreneur / Creator',
    title_mr: 'उद्योजक / निर्माता',
    tagline_en: 'Taking bold risks, enduring volatility, and staying steadfast in vision.',
    tagline_mr: 'जोखीम, चढ-उतार, व्यवसाय व नवीन निर्मिती.',
    common_problems: ['fear_of_failure', 'job_uncertainty_layoff', 'leadership_responsibility'],
    core_verses: ['BG_2_47', 'BG_2_38', 'BG_18_26', 'BG_3_21']
  },
  {
    type: 'leader',
    title_en: 'Leader / Decision Maker',
    title_mr: 'नेते / निर्णय घेणारे',
    tagline_en: 'Guiding organizations with Lokasangraha (welfare of all) and equanimity.',
    tagline_mr: 'लोकसंग्रह, निःपक्षपाती निर्णय व आदर्श आचरण.',
    common_problems: ['leadership_responsibility', 'ethical_dilemma_business', 'career_confusion'],
    core_verses: ['BG_3_20', 'BG_3_21', 'BG_5_18', 'BG_18_30']
  },
  {
    type: 'senior_citizen',
    title_en: 'Senior Citizen / Elder',
    title_mr: 'ज्येष्ठ नागरिक',
    tagline_en: 'Cultivating spiritual peace, graceful detachment, and transcendental surrender.',
    tagline_mr: 'आत्मशांती, निवृत्ती, भगवद्भक्ती व समाधान.',
    common_problems: ['loneliness_isolation', 'sadness_grief_loss', 'life_purpose_meaning'],
    core_verses: ['BG_2_13', 'BG_8_5', 'BG_18_66', 'BG_2_70']
  },
  {
    type: 'general_user',
    title_en: 'Seeker / General Human',
    title_mr: 'सर्वसामान्य साधक / प्रत्येक व्यक्ती',
    tagline_en: 'Overcoming existential sorrow, conquering the mind, and living with purpose.',
    tagline_mr: 'मानवी जीवनातील संकटांवर मात व आनंदी जीवन.',
    common_problems: ['fear_anxiety', 'anger_frustration', 'overthinking_restlessness', 'life_purpose_meaning'],
    core_verses: ['BG_2_47', 'BG_6_5', 'BG_2_14', 'BG_18_66']
  }
];

// -------------------------------------------------------------
// 3. Gita Philosophical Concepts Taxonomy (42 Indexed Concepts)
// -------------------------------------------------------------
export const GITA_CONCEPTS_TAXONOMY: GitaConcept[] = [
  {
    id: 'karma',
    name_sanskrit: 'कर्म',
    name_english: 'Karma (Action & Cause)',
    name_marathi: 'कर्म',
    definition_en: 'The universal principle of cause and effect governed by deliberate physical, verbal, and mental deeds.',
    definition_mr: 'मन, वाणी व शरीराने केलेले कार्य आणि त्याचे परिणाम.',
    related_concepts: ['karma_yoga', 'action', 'duty']
  },
  {
    id: 'karma_yoga',
    name_sanskrit: 'कर्मयोग',
    name_english: 'Karma Yoga (Yoga of Selfless Action)',
    name_marathi: 'कर्मयोग',
    definition_en: 'The spiritual path of dedicated, skillful action performed as an offering without selfish attachment to the fruits.',
    definition_mr: 'फळाची आसक्ती न ठेवता कर्तव्यभावाने व कौशल्याने केलेले निःस्वार्थ कर्म.',
    related_concepts: ['karma', 'svadharma', 'detachment', 'duty']
  },
  {
    id: 'svadharma',
    name_sanskrit: 'स्वधर्म',
    name_english: 'Svadharma (Personal Duty / Authentic Nature)',
    name_marathi: 'स्वधर्म',
    definition_en: 'One’s innate duty and natural vocation aligned with one’s psychological nature and cosmic role.',
    definition_mr: 'आपल्या मूळ स्वभावाला आणि परिस्थितीला साजेसे विहित कर्तव्य.',
    related_concepts: ['dharma', 'duty', 'purpose']
  },
  {
    id: 'dharma',
    name_sanskrit: 'धर्म',
    name_english: 'Dharma (Cosmic Order / Righteousness)',
    name_marathi: 'धर्म',
    definition_en: 'The universal moral order, righteousness, and sustaining principles that hold the universe in harmony.',
    definition_mr: 'सदाचार, नीती, आणि विश्वाला धारण करणारे सत्य.',
    related_concepts: ['svadharma', 'ethics', 'responsibility']
  },
  {
    id: 'detachment',
    name_sanskrit: 'अनासक्ती / वैराग्य',
    name_english: 'Anasakti / Vairagya (Detachment / Dispassion)',
    name_marathi: 'अनासक्ती / वैराग्य',
    definition_en: 'Mental freedom from possessiveness, outcome anxiety, and addictive material craving.',
    definition_mr: 'फळाच्या चिंतेपासून व मोहापासून मनाची मुक्ती.',
    related_concepts: ['renunciation', 'desire', 'equanimity']
  },
  {
    id: 'desire',
    name_sanskrit: 'काम',
    name_english: 'Kama (Sensory Craving / Uncontrolled Desire)',
    name_marathi: 'काम / वासना',
    definition_en: 'Selfish longing and psychological thirst that agitates the intellect and triggers anger when obstructed.',
    definition_mr: 'विषयोपभोगांची तीव्र लालसा जी न मिळाल्यास संतापात बदलते.',
    related_concepts: ['anger', 'greed', 'mind']
  },
  {
    id: 'anger',
    name_sanskrit: 'क्रोध',
    name_english: 'Krodha (Anger & Wrath)',
    name_marathi: 'क्रोध / संताप',
    definition_en: 'The blinding destructive passion born when cherished selfish desires are thwarted, clouding rational memory.',
    definition_mr: 'इच्छाभंगामुळे उत्पन्न होणारा विनाशकारी विकार जो बुद्धी नष्ट करतो.',
    related_concepts: ['desire', 'ego', 'suffering']
  },
  {
    id: 'ego',
    name_sanskrit: 'अहंकार',
    name_english: 'Ahamkara (False Ego / Pride)',
    name_marathi: 'अहंकार',
    definition_en: 'The false identification of the immortal Self with the physical body and psychological doership.',
    definition_mr: 'स्वतःला शरीराशी व कर्तेपणाशी जोडून निर्माण होणारा गर्व.',
    related_concepts: ['atman', 'prakriti', 'knowledge']
  },
  {
    id: 'mind',
    name_sanskrit: 'मन',
    name_english: 'Manas (The Mind)',
    name_marathi: 'मन',
    definition_en: 'The internal sensory faculty responsible for thoughts, emotions, doubts, and fluctuations; capable of being one’s best friend or worst enemy.',
    definition_mr: 'विचार आणि भावनांचे केंद्र, जे योग्य नियंत्रणाने मित्र आणि दुर्लक्षाने शत्रू बनते.',
    related_concepts: ['self_control', 'discipline', 'meditation']
  },
  {
    id: 'self_control',
    name_sanskrit: 'आत्मसंयम',
    name_english: 'Atma-Samyama (Self-Control & Mastery)',
    name_marathi: 'आत्मसंयम',
    definition_en: 'Regulating the senses and mind through steady discrimination and regular spiritual practice (Abhyasa).',
    definition_mr: 'अभ्यास व वैराग्याने इंद्रिये व मनावर प्रभुत्व मिळवणे.',
    related_concepts: ['discipline', 'mind', 'dhyana']
  },
  {
    id: 'equanimity',
    name_sanskrit: 'समत्वम्',
    name_english: 'Samatvam (Equanimity / Balance in Mind)',
    name_marathi: 'समत्व बुद्धी',
    definition_en: 'Inner poised equilibrium in success and failure, pleasure and pain, gain and loss.',
    definition_mr: 'सुख-दुःख, जय-पराजय आणि लाभ-हानी मध्ये मनाचा समतोल राखणे.',
    related_concepts: ['karma_yoga', 'happiness', 'detachment']
  },
  {
    id: 'atman',
    name_sanskrit: 'आत्मन्',
    name_english: 'Atman (The Immortal Self / Pure Consciousness)',
    name_marathi: 'आत्मा',
    definition_en: 'The eternal, indestructible, unchangeable conscious witness within all living beings.',
    definition_mr: 'अमर, शाश्वत व अविकारी चैतन्य जे कधीही मरत नाही.',
    related_concepts: ['brahman', 'moksha', 'knowledge']
  },
  {
    id: 'gunas',
    name_sanskrit: 'त्रिगुण',
    name_english: 'Tri-Gunas (The Three Modalities of Nature)',
    name_marathi: 'त्रिगुण (सत्त्व, रज, तम)',
    definition_en: 'The three fundamental qualities composing material nature: Sattva (clarity/harmony), Rajas (passion/action), and Tamas (inertia/darkness).',
    definition_mr: 'प्रकृतीचे तीन मूलभूत गुण: सत्त्व (प्रकाश/ज्ञान), रज (लोभ/धडपड), आणि तम (आळस/अज्ञान).',
    related_concepts: ['prakriti', 'sattva', 'rajas', 'tamas']
  },
  {
    id: 'bhakti',
    name_sanskrit: 'भक्ति',
    name_english: 'Bhakti (Loving Devotion & Surrender)',
    name_marathi: 'भक्ति व शरणागती',
    definition_en: 'Unconditional love, reverence, and wholehearted surrender of the soul to the Supreme Divine.',
    definition_mr: 'भगवंताप्रती अनन्य प्रेम, निष्ठा आणि सर्वस्वाचे समर्पण.',
    related_concepts: ['devotion', 'surrender', 'moksha']
  },
  {
    id: 'moksha',
    name_sanskrit: 'मोक्ष',
    name_english: 'Moksha (Spiritual Liberation / Freedom)',
    name_marathi: 'मोक्ष / मुक्ती',
    definition_en: 'Ultimate liberation from the cycle of birth, death, delusion, and sorrow through realization of the Divine.',
    definition_mr: 'जन्म-मरणाच्या फेऱ्यातून व दुःखातून अंतिम मुक्ती आणि परमानंदाची प्राप्ती.',
    related_concepts: ['atman', 'brahman', 'liberation']
  }
];
