import { VerseKnowledgeEntry } from '../types/gitaKnowledge';

/**
 * GitaLens — Verse-Centric Knowledge Graph Layer
 * Structured 8-Layer Entries with Multi-Source Attributed Commentaries
 */
export const GITA_KNOWLEDGE_GRAPH: VerseKnowledgeEntry[] = [
  // ==========================================================================
  // Verse 1: BG 2.47 (Karma Yoga / Fruit Detachment)
  // ==========================================================================
  {
    verse_id: 'BG_2_47',
    chapter_number: 2,
    verse_number: 47,
    canonical: {
      verse_id: 'BG_2_47',
      chapter_number: 2,
      verse_number: 47,
      chapter_name_sanskrit: 'साङ्ख्ययोग',
      chapter_name_marathi: 'सांख्ययोग',
      chapter_name_english: 'Sankhya Yoga (Yoga of Knowledge & Action)',
      chapter_theme: 'Detached Action, Equanimity & Transcending Fear',
      shloka_devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      shloka_transliteration_iast: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
      padaccheda: ['कर्मणि', 'एव', 'अधिकारः', 'ते', 'मा', 'फलेषु', 'कदाचन', 'मा', 'कर्मफलहेतुः', 'भूः', 'मा', 'ते', 'सङ्गः', 'अस्तु', 'अकर्मणि'],
      word_analysis: [
        { word_sanskrit: 'कर्मणि', word_transliteration: 'karmaṇi', meaning_english: 'in prescribed action/duty', meaning_marathi: 'कर्तव्य कर्मामध्ये', grammatical_role: 'Locative singular' },
        { word_sanskrit: 'एव', word_transliteration: 'eva', meaning_english: 'only / alone', meaning_marathi: 'फक्त / केवळ' },
        { word_sanskrit: 'अधिकारः', word_transliteration: 'adhikāraḥ', meaning_english: 'right / authority / jurisdiction', meaning_marathi: 'अधिकार / सामर्थ्य' },
        { word_sanskrit: 'ते', word_transliteration: 'te', meaning_english: 'your / unto you', meaning_marathi: 'तुझा' },
        { word_sanskrit: 'मा', word_transliteration: 'mā', meaning_english: 'never / not', meaning_marathi: 'कधीही नाही' },
        { word_sanskrit: 'फलेषु', word_transliteration: 'phaleṣu', meaning_english: 'in the fruits / results', meaning_marathi: 'फळांमध्ये / निकालात' },
        { word_sanskrit: 'कदाचन', word_transliteration: 'kadācana', meaning_english: 'at any time', meaning_marathi: 'कधीही' },
        { word_sanskrit: 'कर्मफलहेतुः', word_transliteration: 'karma-phala-hetuḥ', meaning_english: 'motivated by fruits of work', meaning_marathi: 'फळाची अपेक्षा ठेवून कारण बनणारा' },
        { word_sanskrit: 'भूः', word_transliteration: 'bhūḥ', meaning_english: 'be / become', meaning_marathi: 'होऊ नकोस' },
        { word_sanskrit: 'सङ्गः', word_transliteration: 'saṅgaḥ', meaning_english: 'attachment / clinging', meaning_marathi: 'आसक्ती / ओढ' },
        { word_sanskrit: 'अकर्मणि', word_transliteration: 'akarmaṇi', meaning_english: 'in inaction / sloth', meaning_marathi: 'आळस / कर्म न करण्यामध्ये' }
      ]
    },
    translation_literal_en: 'You have a right to perform your prescribed duty, but never to the fruits of action. Never let the fruits of action be your motive, nor should you be attached to inaction.',
    translation_literal_mr: 'तुला फक्त तुझे विहित कर्तव्य करण्याचा अधिकार आहे, पण त्याच्या फळावर तुझा कधीही अधिकार नाही. कर्माच्या फळाचा हेतू तू धरू नकोस आणि कर्म न करण्याकडे (आळसाकडे) तुझी ओढ नसावी.',
    translation_poetic_en: 'To action alone hast thou a right, and never at all to its fruits; let not the fruits of action be thy motive; neither let there be in thee any attachment to inaction.',
    translation_poetic_mr: 'कर्म करणे हाचि अधिकार तुझा, फळाची आशा सोडून दे साचा। नको धरू हेतू फळाचा मनी, नको अडकू तू आळसामधोनी॥',
    commentaries: [
      {
        source_id: 'dnyaneshwari_mr',
        source_name: 'ज्ञानेश्वरी',
        author: 'संत ज्ञानेश्वर महाराज',
        language: 'marathi',
        core_interpretation: 'कर्म करणे हाच जीवाचा सहज स्वभाव आहे. जसे वृक्षाला फळ येते पण ते फळाची हाव धरत नाही, तद्वत फळाची आसक्ती सोडल्यासच कर्माचे बंधन तुटते.',
        practical_teaching: 'फळाची हाव धरून काम केल्यास मन अस्थिर होते; निष्काम भावाने काम केल्यास तेच कर्म ईश्वरपूजेचे साधन बनते.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'sadhak_sanjivani_mr',
        source_name: 'साधक संजीवनी',
        author: 'स्वामी रामसुखदास',
        language: 'marathi',
        core_interpretation: 'फळावर कोणाचाही अधिकार नाही कारण फळ हे प्रारब्ध, काळ, आणि अनेक घटकांवर अवलंबून असते. आपला अधिकार केवळ वर्तमानात शुद्ध प्रयत्न करण्यावर आहे.',
        practical_teaching: 'भविष्याची काळजी सोडून वर्तमानातील कर्मामध्ये १००% समर्पित व्हावे.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'holy_geeta_chinmayananda_en',
        source_name: 'The Holy Geeta',
        author: 'Swami Chinmayananda',
        language: 'english',
        core_interpretation: 'Worrying about the future dissipated mental energy. True efficiency lies in bringing the whole mind into the present moment of action without psychological anxiety.',
        practical_teaching: 'Do not channel present energies into anxious fantasies about future rewards. Channel 100% focus into executing the work at hand with excellence.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'gandhi_gita_en',
        source_name: 'The Bhagavad Gita According to Gandhi',
        author: 'Mahatma Gandhi',
        language: 'english',
        core_interpretation: 'This is the core foundation of "Anasaktiyoga" (the gospel of selfless action). Renunciation of fruit does not mean indifference to results, but freedom from anxiety and greed.',
        practical_teaching: 'He who is obsessed with the fruit loses his concentration and becomes careless. Anasakti (detachment) brings supreme poise, unflagging perseverance, and joy.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'gita_as_it_is_en',
        source_name: 'Bhagavad-gītā As It Is',
        author: 'A.C. Bhaktivedanta Swami Prabhupada',
        language: 'english',
        core_interpretation: 'Action performed for one’s own sense gratification binds the soul to karma. When work is performed as a devotional sacrifice (Yajna) for Krishna, one attains liberation.',
        practical_teaching: 'Surrender the outcome to the Supreme Lord; do not consider yourself the ultimate proprietor of results.',
        is_summary_only: false,
        verified: true
      }
    ],
    application: {
      problem_context: 'Exam stress, fear of failure, workplace target anxiety, and overthinking outcomes.',
      simple_meaning_en: 'You control your effort and preparation today, but you cannot dictate the outcome. Focus completely on the process, and let go of anxiety about results.',
      simple_meaning_mr: 'तुमचा ताबा फक्त तुमच्या आजच्या अभ्यासावर आणि प्रयत्नांवर आहे; निकालावर नाही. निकालाची चिंता सोडून अभ्यासाच्या प्रक्रियेवर पूर्ण लक्ष द्या.',
      gita_core_teaching_en: 'Detached execution of duty preserves mental energy and produces the highest mastery.',
      gita_core_teaching_mr: 'फळाची चिंता न करता केलेले कर्म सर्वोच्च कार्यक्षमता आणि मनःशांती प्रदान करते.',
      real_life_connection_en: 'A batsman who thinks about a century while facing a fast delivery gets bowled out. The batsman who focuses only on the incoming ball plays the best shot.',
      real_life_connection_mr: 'क्रिकेटमध्ये फलंदाज जर प्रत्येक चेंडूवर शतकाचा विचार करत राहिला तर तो बाद होईल. जो प्रत्येक चेंडू नीट पाहण्यावर लक्ष केंद्रित करतो, तोच यशस्वी होतो.',
      modern_realistic_example_en: 'An engineering student preparing for entrance exams. Instead of constantly calculating cutoff percentiles late at night, they schedule daily 2-hour deep work study blocks with zero phone distractions.',
      modern_realistic_example_mr: 'स्पर्धा परीक्षेचा विद्यार्थी. सतत मेरिट लिस्टचा विचार करण्याऐवजी रोजच्या ठरवलेल्या प्रकरणांवर पूर्ण एकाग्रतेने अभ्यास करणे.',
      practical_actions_en: [
        'Divide your big intimidating goal into small daily action units.',
        'Whenever panic about results strikes, ask: "What is my immediate 30-minute task right now?" and do only that.',
        'Never adopt laziness as an escape from performance fear.'
      ],
      practical_actions_mr: [
        'मोठ्या ध्येयाचे रोजच्या छोट्या टास्कमध्ये विभाजन करा.',
        'जेव्हाही निकालाची भीती वाटेल, तेव्हा स्वतःला विचारा: "सध्याच्या क्षणात मी काय करू शकतो?" आणि लगेच कामाला लागा.',
        'भीतीपोटी आळस किंवा कामाची टाळाटाळ कधीही करू नका.'
      ],
      reflection_question_en: 'If you knew that you could only control your effort and not the cosmic outcome, how would you approach your work today with calm freedom?',
      reflection_question_mr: 'जर तुम्हाला माहित असेल की निकाल तुमच्या हातात नाही पण प्रामाणिक प्रयत्न तुमच्या हातात आहेत, तर आज तुम्ही किती शांतपणे काम कराल?'
    },
    retrieval: {
      search_keywords_en: ['karma', 'duty', 'exam stress', 'fear of failure', 'results', 'anxiety', 'procrastination', 'workplace burnout', 'performance pressure'],
      search_keywords_mr: ['कर्म', 'कर्तव्य', 'परीक्षेचा ताण', 'निकालाची भीती', 'अपयश', 'चिंता', 'आळस', 'कामाचा ताण'],
      emotion_tags: ['anxiety', 'fear', 'stress', 'helplessness', 'distraction'],
      problem_slugs: ['exam_stress', 'fear_of_failure', 'workplace_stress_burnout', 'procrastination_laziness'],
      persona_slugs: ['student', 'professional', 'entrepreneur', 'general_user'],
      concept_slugs: ['karma', 'karma_yoga', 'detachment', 'duty', 'equanimity'],
      semantic_summary: 'Guidance on overcoming result anxiety, exam panic, and fear of failure by focusing 100% on present duty and letting go of outcome attachment.',
      relevance_weight_default: 1.0
    },
    verification_status: 'verified'
  },

  // ==========================================================================
  // Verse 2: BG 2.14 (Resilience / Enduring Fleeting Hardships)
  // ==========================================================================
  {
    verse_id: 'BG_2_14',
    chapter_number: 2,
    verse_number: 14,
    canonical: {
      verse_id: 'BG_2_14',
      chapter_number: 2,
      verse_number: 14,
      chapter_name_sanskrit: 'साङ्ख्ययोग',
      chapter_name_marathi: 'सांख्ययोग',
      chapter_name_english: 'Sankhya Yoga (Yoga of Knowledge)',
      chapter_theme: 'Impermanence of Pain, Resilience & Inner Fortitude',
      shloka_devanagari: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
      shloka_transliteration_iast: 'mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino \'nityās tāṁs titikṣasva bhārata ||',
      padaccheda: ['मात्रास्पर्शाः', 'तु', 'कौन्तेय', 'शीतोष्णसुखदुःखदाः', 'आगम-अपायिनः', 'अनित्याः', 'तान्', 'तितिक्षस्व', 'भारत'],
      word_analysis: [
        { word_sanskrit: 'मात्रास्पर्शाः', word_transliteration: 'mātrā-sparśāḥ', meaning_english: 'contact of senses with objects', meaning_marathi: 'इंद्रियांचा विषयांशी संपर्क' },
        { word_sanskrit: 'शीतोष्ण', word_transliteration: 'śīta-uṣṇa', meaning_english: 'winter and summer / cold and heat', meaning_marathi: 'थंडी आणि उष्णता' },
        { word_sanskrit: 'सुखदुःखदाः', word_transliteration: 'sukha-duḥkha-dāḥ', meaning_english: 'givers of joy and pain', meaning_marathi: 'सुख व दुःख देणारे' },
        { word_sanskrit: 'आगम-अपायिनः', word_transliteration: 'āgama-apāyinaḥ', meaning_english: 'coming and going / appearing and disappearing', meaning_marathi: 'येणारे आणि जाणारे' },
        { word_sanskrit: 'अनित्याः', word_transliteration: 'anityāḥ', meaning_english: 'impermanent / fleeting', meaning_marathi: 'क्षणभंगुर / तात्पुरते' },
        { word_sanskrit: 'तितिक्षस्व', word_transliteration: 'titikṣasva', meaning_english: 'endure patiently / bear with fortitude', meaning_marathi: 'सहन कर / सामोरे जा' }
      ]
    },
    translation_literal_en: 'O son of Kunti, the contacts of the senses with their objects give rise to cold and heat, pleasure and pain. They come and go and are impermanent. Endure them patiently, O descendant of Bharata.',
    translation_literal_mr: 'हे कौन्तेया, इंद्रियांचा विषयांशी होणारा संपर्क हा थंडी आणि उष्णता, सुख आणि दुःख देणारा आहे. हे सर्व येणारे-जाणारे आणि अनित्य आहेत. म्हणून हे भारता, तू त्यांना धैर्याने सहन कर.',
    translation_poetic_en: 'Contacts of senses with their realms cause cold and heat, pleasure and sorrow; they come and vanish, fleeting all—endure them calmly, valiant soul.',
    translation_poetic_mr: 'सुख-दुःखाच्या लाटा येती, थंडी-ऊन जसे बदलती। क्षणभंगुर हे सारे जाणा, धैर्याने त्या सहन करा ना॥',
    commentaries: [
      {
        source_id: 'sivananda_gita_en',
        source_name: 'The Bhagavad Gita',
        author: 'Swami Sivananda',
        language: 'english',
        core_interpretation: 'Titiksha (forbearance) is the mental power to bear all afflictions without anxiety or lamentation. Pleasure and pain are relative dualities of nature; you are the unaffected soul.',
        practical_teaching: 'Do not be elated by praise or crushed by insults. Both are temporary mental weather patterns.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'dnyaneshwari_mr',
        source_name: 'ज्ञानेश्वरी',
        author: 'संत ज्ञानेश्वर महाराज',
        language: 'marathi',
        core_interpretation: 'जसे मृगजळाच्या पाण्याने कोणी भिजत नाही, तद्वत सांसारिक सुख-दुःखाचे ढग आत्म्याला स्पर्श करू शकत नाहीत.',
        practical_teaching: 'जीवनातील संकटे म्हणजे केवळ एक ऋतू आहे; वसंत ऋतू नक्की येणार हा विश्वास बाळगा.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'easwaran_gita_en',
        source_name: 'The Bhagavad Gita',
        author: 'Eknath Easwaran',
        language: 'english',
        core_interpretation: 'Emotional equanimity means learning not to ride the rollercoaster of external circumstances. When things go wrong, remind yourself: "This too shall pass."',
        practical_teaching: 'Develop patience. Pain is inevitable in a changing world, but suffering is optional.',
        is_summary_only: false,
        verified: true
      }
    ],
    application: {
      problem_context: 'Sudden financial setback, illness, heartbreak, job layoff, and mood swings.',
      simple_meaning_en: 'Good times and bad times are like winter and summer—neither stays forever. Stay grounded and resilient through storms.',
      simple_meaning_mr: 'सुख आणि दुःख हे ऋतूंBaseप्रमाणे येतात आणि जातात. संकटात खचून न जाता धैर्याने सामोरे जा.',
      gita_core_teaching_en: 'Impermanence is the nature of sensory experience; the soul remains unshakeable.',
      gita_core_teaching_mr: 'परिस्थिती तात्पुरती असते, पण तुमचा आंतरिक संयम कायम राहू शकतो.',
      real_life_connection_en: 'During winter, trees shed leaves and seem barren, but they quietly conserve roots because spring is guaranteed.',
      real_life_connection_mr: 'झाडांची पाने गळली तरी मुळे मजबूत असतात, कारण वसंत ऋतू येणारच असतो.',
      modern_realistic_example_en: 'A startup founder losing their primary client. Instead of spiraling into depression, they recognize this is a transient dip, preserve their cash runway, and pivot their offerings.',
      modern_realistic_example_mr: 'व्यवसायात अचानक नुकसान झाल्यावर खचून न जाता धैर्याने नवीन संधी शोधणे.',
      practical_actions_en: [
        'Repeat mentally in tough moments: "This feeling is temporary. I can endure it."',
        'Avoid making drastic life decisions during peaks of extreme grief or excitement.',
        'Focus on daily self-care (sleep, nutrition, walking) while waiting for the emotional storm to pass.'
      ],
      practical_actions_mr: [
        'संकटाच्या वेळी स्वतःला आठवण करून द्या: "हा काळही निघून जाईल."',
        'अति दुःखात किंवा अति उत्साहात घाईघाईने मोठे निर्णय घेऊ नका.',
        'प्राणायाम आणि साधे जीवन जगून मनाचे संतुलन राखा.'
      ],
      reflection_question_en: 'Think of the worst hardship you faced 5 years ago—has its emotional intensity not already faded today?',
      reflection_question_mr: 'पाच वर्षांपूर्वी तुम्हाला ज्या गोष्टीचे अतोनात दुःख झाले होते, आज त्याची तीव्रता कमी झाली आहे ना?'
    },
    retrieval: {
      search_keywords_en: ['resilience', 'grief', 'pain', 'loss', 'breakup', 'layoff', 'hardship', 'endurance', 'titiksha'],
      search_keywords_mr: ['सहनशीलता', 'दुःख', 'शोक', 'नुकसान', 'संकट', 'धैर्य', 'चिकाटी'],
      emotion_tags: ['sadness', 'fear', 'helplessness', 'uncertainty'],
      problem_slugs: ['sadness_grief_loss', 'job_uncertainty_layoff', 'fear_anxiety'],
      persona_slugs: ['senior_citizen', 'entrepreneur', 'professional', 'general_user'],
      concept_slugs: ['equanimity', 'atman', 'prakriti', 'suffering'],
      semantic_summary: 'Coping with grief, emotional heartbreak, and economic adversity through resilience, emotional poise, and knowledge of impermanence.',
      relevance_weight_default: 0.95
    },
    verification_status: 'verified'
  },

  // ==========================================================================
  // Verse 3: BG 6.5 (Self-Reliance & Mind Mastery)
  // ==========================================================================
  {
    verse_id: 'BG_6_5',
    chapter_number: 6,
    verse_number: 5,
    canonical: {
      verse_id: 'BG_6_5',
      chapter_number: 6,
      verse_number: 5,
      chapter_name_sanskrit: 'आत्मसंयमयोग',
      chapter_name_marathi: 'आत्मसंयमयोग',
      chapter_name_english: 'Atma Samyama Yoga (Yoga of Meditation & Self-Control)',
      chapter_theme: 'Self-Elevation, Willpower & Mind as Friend or Foe',
      shloka_devanagari: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
      shloka_transliteration_iast: 'uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
      padaccheda: ['उद्धरेत्', 'आत्मना', 'आत्मानम्', 'न', 'आत्मानम्', 'अवसादयेत्', 'आत्मा', 'एव', 'हि', 'आत्मनः', 'बन्धुः', 'आत्मा', 'एव', 'रिपुः', 'आत्मनः'],
      word_analysis: [
        { word_sanskrit: 'उद्धरेत्', word_transliteration: 'uddharet', meaning_english: 'one must elevate / lift up', meaning_marathi: 'उद्धार करावा / वर उचलावे' },
        { word_sanskrit: 'आत्मना', word_transliteration: 'ātmanā', meaning_english: 'by the mind / self', meaning_marathi: 'स्वतःच्या मनाने / बुद्धीने' },
        { word_sanskrit: 'आत्मानम्', word_transliteration: 'ātmānam', meaning_english: 'the self / one’s life', meaning_marathi: 'स्वतःला' },
        { word_sanskrit: 'न', word_transliteration: 'na', meaning_english: 'not / never', meaning_marathi: 'नाही' },
        { word_sanskrit: 'अवसादयेत्', word_transliteration: 'avasādayet', meaning_english: 'degrade / depress / drag down', meaning_marathi: 'अधोगतीला नेऊ नये / खचू देऊ नये' },
        { word_sanskrit: 'बन्धुः', word_transliteration: 'bandhuḥ', meaning_english: 'friend / ally / kinsman', meaning_marathi: 'मित्र / पाठीराखा' },
        { word_sanskrit: 'रिपुः', word_transliteration: 'ripuḥ', meaning_english: 'enemy / foe', meaning_marathi: 'शत्रू' }
      ]
    },
    translation_literal_en: 'Elevate yourself through the power of your own mind, and do not degrade yourself. For the mind alone is the friend of the self, and the mind alone is the enemy of the self.',
    translation_literal_mr: 'माणसाने स्वतःचा उद्धार स्वतःच केला पाहिजे, स्वतःला अधोगतीला नेऊ नये (खचू देऊ नये); कारण मन हेच जीवाचा खरा मित्र आहे आणि मन हेच जीवाचा सर्वात मोठा शत्रू आहे.',
    translation_poetic_en: 'Let a man lift himself by his own Self, let him not depress or lower himself; for the Self alone is the friend of oneself, and the Self alone is the foe.',
    translation_poetic_mr: 'स्वतःच स्वतःचा उद्धार करा, मनाला कधी खचू नका देऊ जरा। मन हेच आपुला सखा सोबती, मनच वैरी बनून करी अधोगती॥',
    commentaries: [
      {
        source_id: 'sarth_gita_ramakrishna_mr',
        source_name: 'श्रीमद्भगवद्गीता : सार्थ',
        author: 'रामकृष्ण मठ',
        language: 'marathi',
        core_interpretation: 'स्वामी विवेकानंदांचे वचन आहे: "सर्व शक्ती तुमच्यात आहे." स्वतःला कधीही दीन, दुर्बल समजू नका. मनाला नियंत्रित केल्यास ते तुम्हाला यशाच्या शिखरावर पोहोचवते.',
        practical_teaching: 'सकारात्मक विचारांची पेरणी करा. बाह्य मदतीची वाट पाहण्यापेक्षा स्वतःच्या आत्मबलावर उभे राहा.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'radhakrishnan_gita_en',
        source_name: 'The Bhagavadgita',
        author: 'Dr. S. Radhakrishnan',
        language: 'english',
        core_interpretation: 'Man is the architect of his own destiny. Spiritual freedom cannot be bestowed from outside; it must be won through conscious self-mastery.',
        practical_teaching: 'Do not blame fate, society, or stars. Take radical self-responsibility for elevating your consciousness.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'holy_geeta_chinmayananda_en',
        source_name: 'The Holy Geeta',
        author: 'Swami Chinmayananda',
        language: 'english',
        core_interpretation: 'When the lower animalistic mind is disciplined and led by the higher discriminative intellect (Buddhi), it turns into your greatest ally and protector.',
        practical_teaching: 'Stop self-pity. Replace self-condemning thoughts with inspiring, resolute purpose.',
        is_summary_only: false,
        verified: true
      }
    ],
    application: {
      problem_context: 'Low self-esteem, self-pity, helplessness, procrastination, and lack of motivation.',
      simple_meaning_en: 'Stop waiting for someone else to rescue you. Your own disciplined mind is your best ally or your worst destroyer. Lift yourself up.',
      simple_meaning_mr: 'बाहेरून कोणी वाचवायला येईल याची वाट पाहू नका. तुमचे मनच तुमचे सर्वात मोठे सामर्थ्य किंवा शत्रू आहे. स्वतःला सावरून उभे राहा.',
      gita_core_teaching_en: 'Total radical personal accountability and self-mastery are the keys to spiritual and worldly elevation.',
      gita_core_teaching_mr: 'स्वतःच्या जीवनाची जबाबदारी स्वतः स्वीकारून मनाला मित्र बनवणे.',
      real_life_connection_en: 'An individual battling digital addiction or bad habits: Nobody can forcibly make them stop until they decide with inner resolve: "I will respect myself."',
      real_life_connection_mr: 'व्यसनाशी किंवा आळसाशी लढणारी व्यक्ती: जोपर्यंत ती स्वतः मनाशी पक्के ठरवत नाही, तोपर्यंत कोणीही तिचा उद्धार करू शकत नाही.',
      modern_realistic_example_en: 'A young professional who feels overlooked for promotions. Instead of complaining, they dedicate 1 hour every morning to upskilling, fitness, and disciplined focus.',
      modern_realistic_example_mr: 'नोकरीत निराशा आल्यावर तक्रार करत बसण्याऐवजी दररोज सकाळी १ तास नवीन कौशल्ये शिकणे व स्वतःला सिद्ध करणे.',
      practical_actions_en: [
        'Eliminate self-defeating language from your inner dialogue (e.g. replace "I am useless" with "I am learning and growing").',
        'Win the first hour of your morning with exercise, meditation, and reading.',
        'Keep commitments made to yourself to build unbreakable self-trust.'
      ],
      practical_actions_mr: [
        'नकारात्मक स्वसंवाद बंद करा; स्वतःचा आदर करायला शिका.',
        'सकाळी उठल्यावर पहिली गोष्ट आत्मविकासाची करा.',
        'स्वतःला दिलेले शब्द पाळून आत्मविश्वास वाढवा.'
      ],
      reflection_question_en: 'Are your daily habits treating your mind as a best friend or as a saboteur?',
      reflection_question_mr: 'तुमच्या रोजच्या सवयी तुमच्या मनाला मित्र बनवत आहेत की शत्रू?'
    },
    retrieval: {
      search_keywords_en: ['self-reliance', 'motivation', 'low confidence', 'helplessness', 'mind control', 'willpower', 'self-discipline', 'procrastination'],
      search_keywords_mr: ['आत्मविश्वास', 'प्रेरणा', 'मनोधैर्य', 'मन नियंत्रण', 'इच्छाशक्ती', 'आळस', 'उद्धार'],
      emotion_tags: ['helplessness', 'laziness', 'uncertainty'],
      problem_slugs: ['procrastination_laziness', 'fear_of_failure', 'life_purpose_meaning'],
      persona_slugs: ['student', 'child', 'professional', 'general_user'],
      concept_slugs: ['mind', 'self_control', 'discipline', 'atman'],
      semantic_summary: 'Building unshakeable self-reliance, overcoming self-doubt and depression, and using mental discipline to elevate oneself.',
      relevance_weight_default: 0.98
    },
    verification_status: 'verified'
  },

  // ==========================================================================
  // Verse 4: BG 2.62-63 (Ladder of Fall / Overcoming Anger & Sensory Attachment)
  // ==========================================================================
  {
    verse_id: 'BG_2_62',
    chapter_number: 2,
    verse_number: 62,
    canonical: {
      verse_id: 'BG_2_62',
      chapter_number: 2,
      verse_number: 62,
      chapter_name_sanskrit: 'साङ्ख्ययोग',
      chapter_name_marathi: 'सांख्ययोग',
      chapter_name_english: 'Sankhya Yoga (Yoga of Knowledge)',
      chapter_theme: 'The Psychological Descent into Anger & Loss of Reason',
      shloka_devanagari: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥',
      shloka_transliteration_iast: 'dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho \'bhijāyate ||',
      padaccheda: ['ध्यायतः', 'विषयान्', 'पुंसः', 'सङ्गः', 'तेषु', 'उपजायते', 'सङ्गात्', 'सञ्जायते', 'कामः', 'कामात्', 'क्रोधः', 'अभिजायते'],
      word_analysis: [
        { word_sanskrit: 'ध्यायतः', word_transliteration: 'dhyāyataḥ', meaning_english: 'while contemplating / brooding upon', meaning_marathi: 'सतत ध्यान / विचार करताना' },
        { word_sanskrit: 'विषयान्', word_transliteration: 'viṣayān', meaning_english: 'sense objects', meaning_marathi: 'भोगविषयांवर' },
        { word_sanskrit: 'सङ्गः', word_transliteration: 'saṅgaḥ', meaning_english: 'attachment / affinity', meaning_marathi: 'आसक्ती' },
        { word_sanskrit: 'कामः', word_transliteration: 'kāmaḥ', meaning_english: 'passionate desire / lust', meaning_marathi: 'तीव्र इच्छा / वासना' },
        { word_sanskrit: 'क्रोधः', word_transliteration: 'krodhaḥ', meaning_english: 'anger / rage', meaning_marathi: 'राग / संताप' }
      ]
    },
    translation_literal_en: 'While contemplating the objects of the senses, a person develops attachment for them; from attachment, desire is born; from desire, anger arises.',
    translation_literal_mr: 'विषयांचे सतत चिंतन करणाऱ्या माणसाची त्या विषयांमध्ये आसक्ती निर्माण होते; आसक्तीतून तीव्र कामना (इच्छा) जन्म घेते आणि कामना पूर्ण न झाल्यास क्रोध (राग) उत्पन्न होतो.',
    translation_poetic_en: 'Brooding on objects creates attachment; from attachment springs craving desire; from desire thwarted bursts forth blazing anger.',
    translation_poetic_mr: 'विषयांचे चिंतन आसक्ती घडवी, आसक्तीतून तीव्र वासना वाढे भारी। वासनेला जर अडथळा आला, क्रोध भडके मग त्या अंतरी॥',
    commentaries: [
      {
        source_id: 'holy_geeta_chinmayananda_en',
        source_name: 'The Holy Geeta',
        author: 'Swami Chinmayananda',
        language: 'english',
        core_interpretation: 'This is the master clinical psychological diagram of how human tragedy begins: Thought -> Attachment -> Craving -> Anger -> Loss of Intellect.',
        practical_teaching: 'Guard your early thoughts. Anger is simply desire obstructed by an obstacle.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'dnyaneshwari_mr',
        source_name: 'ज्ञानेश्वरी',
        author: 'संत ज्ञानेश्वर महाराज',
        language: 'marathi',
        core_interpretation: 'जसा ठिणगीतून मोठा वणवा पेटतो, तद्वत एका साध्या विचारातून मनुष्य क्रोधाच्या आणि विनाशाच्या गर्तेत सापडतो.',
        practical_teaching: 'मनाचे रक्षण सुरुवातीच्या टप्प्यावरच करा; विचार वाईट दिशेला वळताच त्याला ज्ञानयुक्त विवेकाने रोखा.',
        is_summary_only: false,
        verified: true
      }
    ],
    application: {
      problem_context: 'Uncontrolled anger, temper tantrums, digital addiction, obsession with material objects, and road rage.',
      simple_meaning_en: 'Anger does not happen in a vacuum. It begins when you obsess over something, turn it into an urgent craving, and explode when blocked.',
      simple_meaning_mr: 'राग अचानक येत नाही; तो एखाद्या गोष्टीच्या अतिविचारातून आणि अपेक्षाभंगातून जन्म घेतो.',
      gita_core_teaching_en: 'Master the root of desire and thoughts to eliminate the fire of anger before it destroys you.',
      gita_core_teaching_mr: 'विचारांवर वेळेत नियंत्रण ठेवल्यास क्रोधाचा भडका उडत नाही.',
      real_life_connection_en: 'Browsing luxury gadgets you cannot afford creates dissatisfaction; someone asking a simple question makes you snap at them.',
      real_life_connection_mr: 'सोशल मीडियावर सतत महागड्या गोष्टी पाहून स्वतःमध्ये असमाधान निर्माण करणे व घरातील लोकांवर चीडचीड करणे.',
      modern_realistic_example_en: 'A person who gets furious in traffic: The anger is born because their rigid desire to "arrive in exactly 15 minutes" was obstructed by another car.',
      modern_realistic_example_mr: 'रस्त्यावर ट्रॅफिकमध्ये अडकल्यावर हॉर्न वाजवून चिडचिड करणे. वेळेत पोहोचण्याच्या हव्यासातून संताप निर्माण होतो.',
      practical_actions_en: [
        'When anger rises, pause for 10 slow deep breaths before speaking.',
        'Ask yourself: "What hidden expectation of mine was just blocked?"',
        'Practice intermittent digital fasting to quiet the stream of sensory triggers.'
      ],
      practical_actions_mr: [
        'राग आला की १० दीर्घ श्वास घ्या आणि १० सेकंद शांत राहा.',
        'स्वतःला विचारा: "माझी कोणती अपेक्षा पूर्ण झाली नाही म्हणून मी चिडलो आहे?"',
        'सोशल मीडियाचा अतिवापर कमी करून मन शांत ठेवा.'
      ],
      reflection_question_en: 'Look back at your last angry outburst—what was the underlying craving that felt threatened?',
      reflection_question_mr: 'तुम्हाला शेवटचा जेव्हा प्रचंड राग आला होता, तेव्हा तुमची कोणती इच्छा अपूर्ण राहिली होती?'
    },
    retrieval: {
      search_keywords_en: ['anger', 'rage', 'temper', 'desire', 'addiction', 'frustration', 'irritation', 'furious', 'road rage'],
      search_keywords_mr: ['क्रोध', 'राग', 'संताप', 'चीड', 'वासना', 'भांडण', 'आसक्ती'],
      emotion_tags: ['anger', 'greed', 'distraction'],
      problem_slugs: ['anger_frustration', 'unhealthy_attachment'],
      persona_slugs: ['professional', 'parent', 'student', 'leader', 'general_user'],
      concept_slugs: ['anger', 'desire', 'mind', 'self_control'],
      semantic_summary: 'Understanding the root cause of anger and desire in the mind and dissolving fury through awareness and detachment.',
      relevance_weight_default: 0.95
    },
    verification_status: 'verified'
  },

  // ==========================================================================
  // Verse 5: BG 3.35 (Svadharma / Finding Authentic Path)
  // ==========================================================================
  {
    verse_id: 'BG_3_35',
    chapter_number: 3,
    verse_number: 35,
    canonical: {
      verse_id: 'BG_3_35',
      chapter_number: 3,
      verse_number: 35,
      chapter_name_sanskrit: 'कर्मयोग',
      chapter_name_marathi: 'कर्मयोग',
      chapter_name_english: 'Karma Yoga (Yoga of Action)',
      chapter_theme: 'Authenticity, Natural Calling & Pitfalls of Imitation',
      shloka_devanagari: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
      shloka_transliteration_iast: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||',
      padaccheda: ['श्रेयान्', 'स्वधर्मः', 'विगुणः', 'परधर्मात्', 'सु-अनुष्ठितात्', 'स्वधर्मे', 'निधनम्', 'श्रेयः', 'परधर्मः', 'भयावहः'],
      word_analysis: [
        { word_sanskrit: 'श्रेयान्', word_transliteration: 'śreyān', meaning_english: 'far better / more auspicious', meaning_marathi: 'अधिक कल्याणकारी / श्रेष्ठ' },
        { word_sanskrit: 'स्वधर्मः', word_transliteration: 'sva-dharmaḥ', meaning_english: 'one’s own natural duty', meaning_marathi: 'आपला स्वधर्म / स्वाभाविक कर्तव्य' },
        { word_sanskrit: 'विगुणः', word_transliteration: 'viguṇaḥ', meaning_english: 'imperfectly performed', meaning_marathi: 'गुणरहित / अपूर्ण असले तरी' },
        { word_sanskrit: 'परधर्मात्', word_transliteration: 'para-dharmāt', meaning_english: 'than another’s duty', meaning_marathi: 'दुसऱ्याच्या कर्तव्यापेक्षा' },
        { word_sanskrit: 'सु-अनुष्ठितात्', word_transliteration: 'sv-anuṣṭhitāt', meaning_english: 'perfectly performed', meaning_marathi: 'उत्तम प्रकारे आचरलेल्या' },
        { word_sanskrit: 'स्वधर्मे', word_transliteration: 'sva-dharme', meaning_english: 'in one’s own duty', meaning_marathi: 'स्वतःच्या कर्तव्यात' },
        { word_sanskrit: 'निधनम्', word_transliteration: 'nidhanam', meaning_english: 'death / struggle / physical end', meaning_marathi: 'मृत्यू / कष्ट' },
        { word_sanskrit: 'भयावहः', word_transliteration: 'bhayāvahaḥ', meaning_english: 'fraught with fear and danger', meaning_marathi: 'भय निर्माण करणारा / घातक' }
      ]
    },
    translation_literal_en: 'Better is one’s own duty, though devoid of merit, than the duty of another well discharged. Better is death in one’s own duty; the duty of another is fraught with fear.',
    translation_literal_mr: 'दुसऱ्याचा धर्म (कर्तव्य) कितीही चांगल्या रीतीने आचरणात आणला तरी त्यापेक्षा स्वतःचा स्वधर्म अपूर्ण असला तरी श्रेष्ठ आहे. स्वधर्मामध्ये मरण आले तरी ते कल्याणकारी आहे, परंतु परधर्म हा अतिशय भयप्रद आणि विनाशकारी आहे.',
    translation_poetic_en: 'Far better is one’s own natural path, though flawed, than walking another’s with graceful applause; in one’s own calling death is blessed grace, but another’s path breeds fearful disgrace.',
    translation_poetic_mr: 'आपला स्वधर्म जरी सदोष वाटला, तरी तो परधर्माहुनी श्रेष्ठ मानिला। स्वधर्मात मरणही मंगलकारी, परधर्म आणितो भीती भारी॥',
    commentaries: [
      {
        source_id: 'marathi_gita_khair_mr',
        source_name: 'मराठी गीता व विवरण',
        author: 'डॉ. गजानन खैर',
        language: 'marathi',
        core_interpretation: 'स्वधर्म म्हणजे व्यक्तीची निसर्गदत्त प्रकृती आणि सामाजिक जबाबदारी. दुसऱ्यांचे अंधानुकरण केल्याने मानसिक असंतोष आणि अपयश येते.',
        practical_teaching: 'आपल्यातील मूळ कला, क्षमता आणि आवडीला ओळखून त्यात प्रामाणिकपणे कष्ट करावेत.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'gandhi_gita_en',
        source_name: 'The Bhagavad Gita According to Gandhi',
        author: 'Mahatma Gandhi',
        language: 'english',
        core_interpretation: 'Svadharma is living in harmony with one’s truthful calling and station in life. Copying others out of greed or social prestige leads to moral ruin.',
        practical_teaching: 'Honor the simple duty assigned to you by your station and nature. Do not covet another’s glamorous path.',
        is_summary_only: false,
        verified: true
      }
    ],
    application: {
      problem_context: 'Career confusion, peer pressure to follow trends (e.g. coding/MBA), feeling inadequate comparing with others.',
      simple_meaning_en: 'Be yourself. It is far better to be an authentic version of your own calling than a cheap copy of someone else’s success.',
      simple_meaning_mr: 'इतरांची नक्कल करू नका. स्वतःच्या अंगभूत गुणांना ओळखून त्यात प्रगती करणे हेच खरे यश आहे.',
      gita_core_teaching_en: 'Authenticity aligned with your innate nature (Svabhava) creates inner harmony and true excellence.',
      gita_core_teaching_mr: 'स्वतःच्या क्षमतेनुसार काम केल्याने आत्मसमाधान आणि निर्भयता प्राप्त होते.',
      real_life_connection_en: 'A natural writer forced into corporate finance will live in chronic stress, while an authentic carpenter loving woodwork lives in joyful flow.',
      real_life_connection_mr: 'चित्रकलेची आवड असणाऱ्याने इतरांचे पाहून जबरदस्तीने इंजिनिअरिंग केल्यास त्याला आयुष्यभर ताण सहन करावा लागतो.',
      modern_realistic_example_en: 'A student whose parents want them to do medicine, but their deep genius lies in design. Choosing their authentic vocation with courage and hard work leads to true mastery.',
      modern_realistic_example_mr: 'पालकांच्या किंवा समाजाच्या दबावाखाली न येता स्वतःच्या आवडीचे क्षेत्र निवडून त्यात पूर्ण झोकून देणे.',
      practical_actions_en: [
        'List your top 3 natural strengths and activities where you lose track of time.',
        'Stop measuring your life against influencer milestones on social media.',
        'Commit to developing your authentic craft with daily practice.'
      ],
      practical_actions_mr: [
        'तुमच्यातील तीन महत्त्वाचे नैसर्गिक गुण ओळखा.',
        'इतरांच्या यशाशी स्वतःची तुलना करणे त्वरित थांबवा.',
        'आपल्या निवडलेल्या क्षेत्रात रोज मेहनत घेऊन प्राविण्य मिळवा.'
      ],
      reflection_question_en: 'Are you currently living your own authentic life, or are you executing someone else’s script out of fear?',
      reflection_question_mr: 'तुम्ही सध्या स्वतःचे आयुष्य जगत आहात की लोकांच्या अपेक्षेनुसार इतरांची नक्कल करत आहात?'
    },
    retrieval: {
      search_keywords_en: ['svadharma', 'career confusion', 'peer pressure', 'purpose', 'comparison', 'authenticity', 'calling', 'destiny', 'stream selection'],
      search_keywords_mr: ['स्वधर्म', 'करिअर', 'तुलना', 'उद्देश', 'दिशा', 'नक्कल', 'आत्मविश्वास'],
      emotion_tags: ['uncertainty', 'comparison', 'helplessness'],
      problem_slugs: ['career_confusion', 'comparison_peer_pressure', 'life_purpose_meaning'],
      persona_slugs: ['student', 'teacher', 'professional', 'parent', 'entrepreneur'],
      concept_slugs: ['svadharma', 'dharma', 'purpose', 'duty'],
      semantic_summary: 'Choosing the right career and authentic life path by aligning with personal nature (Svadharma) rather than imitating others.',
      relevance_weight_default: 0.96
    },
    verification_status: 'verified'
  },

  // ==========================================================================
  // Verse 6: BG 3.21 (Leadership & Setting Example)
  // ==========================================================================
  {
    verse_id: 'BG_3_21',
    chapter_number: 3,
    verse_number: 21,
    canonical: {
      verse_id: 'BG_3_21',
      chapter_number: 3,
      verse_number: 21,
      chapter_name_sanskrit: 'कर्मयोग',
      chapter_name_marathi: 'कर्मयोग',
      chapter_name_english: 'Karma Yoga (Yoga of Action)',
      chapter_theme: 'Exemplary Leadership, Social Responsibility & Lokasangraha',
      shloka_devanagari: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरोज जनः।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥',
      shloka_transliteration_iast: 'yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṁ kurute lokas tad anuvartate ||',
      padaccheda: ['यत्', 'यत्', 'आचरति', 'श्रेष्ठः', 'तत्', 'तत्', 'एव', 'इतरः', 'जनः', 'सः', 'यत्', 'प्रमाणम्', 'कुरुते', 'लोकः', 'तत्', 'अनुवर्तते'],
      word_analysis: [
        { word_sanskrit: 'यद्यत्', word_transliteration: 'yad yad', meaning_english: 'whatever', meaning_marathi: 'जे जे काही' },
        { word_sanskrit: 'आचरति', word_transliteration: 'ācarati', meaning_english: 'acts / practices / performs', meaning_marathi: 'आचरण करतो' },
        { word_sanskrit: 'श्रेष्ठः', word_transliteration: 'śreṣṭhaḥ', meaning_english: 'a leader / great person / elder', meaning_marathi: 'श्रेष्ठ पुरुष / नेता / वडीलधारे' },
        { word_sanskrit: 'इतरः जनः', word_transliteration: 'itaro janaḥ', meaning_english: 'common people / others', meaning_marathi: 'इतर लोक / समाज' },
        { word_sanskrit: 'प्रमाणम्', word_transliteration: 'pramāṇam', meaning_english: 'standard / benchmark / law', meaning_marathi: 'आदर्श / प्रमाण' },
        { word_sanskrit: 'अनुवर्तते', word_transliteration: 'anuvartate', meaning_english: 'follows / imitates', meaning_marathi: 'त्याचे अनुकरण करतो' }
      ]
    },
    translation_literal_en: 'Whatever a great man does, that very thing other men also do; whatever standard he sets up, the world follows.',
    translation_literal_mr: 'श्रेष्ठ पुरुष जे जे आचरण करतो, इतर सामान्य लोकही त्याचेच अनुकरण करतात. तो ज्या गोष्टीला प्रमाण (आदर्श) मानतो, संपूर्ण समाज त्याच्या मागे चालतो.',
    translation_poetic_en: 'Whatever standard noble leaders set, by that very model all the rest abide; the benchmark raised by their righteous deed becomes the world’s trusted guide.',
    translation_poetic_mr: 'श्रेष्ठ जन जसे आचरण करिती, इतर जन तैसेचि चालती। त्यांनी ठेविला जो आदर्श पुढे, समाज चाले त्याचि पाऊलखुणेकडे॥',
    commentaries: [
      {
        source_id: 'dnyaneshwari_mr',
        source_name: 'ज्ञानेश्वरी',
        author: 'संत ज्ञानेश्वर महाराज',
        language: 'marathi',
        core_interpretation: 'थोर पुरुषांवर समाजाची मोठी जबाबदारी असते. त्यांनी धर्म आणि नीतिमत्तेचा मार्ग सोडला तर समाज दिशाहीन होतो.',
        practical_teaching: 'शब्दांपेक्षा कृतीतून आदर्श निर्माण करा; कुटुंबात व समाजात जबाबदारीने वागा.',
        is_summary_only: false,
        verified: true
      },
      {
        source_id: 'gita_as_it_is_en',
        source_name: 'Bhagavad-gītā As It Is',
        author: 'A.C. Bhaktivedanta Swami Prabhupada',
        language: 'english',
        core_interpretation: 'Leaders, teachers, and parents must be strictly moral and dutiful because children and citizens naturally follow the example of superiors.',
        practical_teaching: 'Never preach what you do not practice. Integrity is the single indispensable quality of true leadership.',
        is_summary_only: false,
        verified: true
      }
    ],
    application: {
      problem_context: 'Leadership ethics, parenting by example, mentoring students, team lead responsibilities.',
      simple_meaning_en: 'People do not do what you say; they do what you do. Lead by your personal character and conduct.',
      simple_meaning_mr: 'लोक तुमच्या बोलण्याने नव्हे, तर तुमच्या वागण्याने शिकतात. स्वतः आदर्श बनून नेतृत्व करा.',
      gita_core_teaching_en: 'True leadership is established through spotless personal conduct and dedication to the collective welfare (Loka-sangraha).',
      gita_core_teaching_mr: 'आदर्श आचरण आणि निःस्वार्थ सेवेनेच खरे नेतृत्व सिद्ध होते.',
      real_life_connection_en: 'A parent telling children not to look at phones while constantly scrolling at the dinner table fails to teach discipline.',
      real_life_connection_mr: 'पालकांनी स्वतः टीव्ही पाहत मुलांना अभ्यासाला बसण्यास सांगणे निष्फळ ठरते; स्वतः वाचन केल्यास मुलेही वाचतात.',
      modern_realistic_example_en: 'A CEO who flies economy during company austerity and stays punctual builds immense loyalty across all employees.',
      modern_realistic_example_mr: 'एका कंपनीचा मॅनेजर स्वतः वेळेवर येऊन प्रामाणिकपणे काम करतो, त्यामुळे संपूर्ण टीम उत्साहाने काम करते.',
      practical_actions_en: [
        'Audit your daily habits: Are they worthy of being copied by your team or children?',
        'Take responsibility first when things go wrong, and share credit when things succeed.',
        'Speak with calm consistency and keep promises.'
      ],
      practical_actions_mr: [
        'स्वतःच्या वागणुकीचे परीक्षण करा: तुमचे वागणे इतरांसाठी आदर्श आहे का?',
        'चूक झाल्यास स्वतः जबाबदारी घ्या आणि यशाचे श्रेय टीमला द्या.',
        'जे बोलता ते करून दाखवा.'
      ],
      reflection_question_en: 'If everyone in your organization or family mirrored your exact daily behavior, would the environment flourish?',
      reflection_question_mr: 'जर तुमच्या घरातील किंवा ऑफिसमधील सर्व लोकांनी हुबेहूब तुमच्यासारखे वागण्यास सुरुवात केली, तर ते वातावरण आनंदी राहील का?'
    },
    retrieval: {
      search_keywords_en: ['leadership', 'ethics', 'parenting', 'teaching', 'role model', 'team management', 'integrity', 'responsibility'],
      search_keywords_mr: ['नेतृत्व', 'पालकत्व', 'शिक्षक', 'आदर्श', 'जबाबदारी', 'प्रामाणिकपणा'],
      emotion_tags: ['ego', 'helplessness'],
      problem_slugs: ['leadership_responsibility', 'ethical_dilemma_business', 'family_conflicts_expectations'],
      persona_slugs: ['leader', 'teacher', 'parent', 'entrepreneur', 'professional'],
      concept_slugs: ['leadership', 'duty', 'responsibility', 'dharma'],
      semantic_summary: 'Ethical leadership, authentic parenting, and setting righteous standards for the community and team.',
      relevance_weight_default: 0.94
    },
    verification_status: 'verified'
  }
];

export function getVerseById(verseId: string): VerseKnowledgeEntry | undefined {
  return GITA_KNOWLEDGE_GRAPH.find(v => v.verse_id === verseId || v.canonical.verse_id === verseId);
}

export function getAllVerses(): VerseKnowledgeEntry[] {
  return GITA_KNOWLEDGE_GRAPH;
}
