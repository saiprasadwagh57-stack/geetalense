export interface Shloka {
  id: string;
  theme: string;
  emotions: string[];
  shloka: string;
  meaning_en: string;
  meaning_mr: string;
  guidance_en: string;
  guidance_mr: string;
  example: string;
  reference: string;
}

export const shlokas: Shloka[] = [
  {
    id: "2-47",
    theme: "Task Focus / Detachment",
    emotions: ["anxiety", "fear", "failure", "stress"],
    shloka: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    meaning_en: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
    meaning_mr: "तुला फक्त तुझे विहित कर्तव्य करण्याचा अधिकार आहे, पण त्याचे फळ मिळवण्याचा नाही. कर्माच्या फळाचा हेतू तू धरू नकोस आणि कर्म न करण्याकडे तुझी ओढ नसावी.",
    guidance_en: "When you stress about results, you lose focus on the action itself. The Gita teaches: focus 100% on the process. Your effort is in your control; the outcome is driven by many factors beyond you.",
    guidance_mr: "जेव्हा तुम्ही फळाचा विचार करता, तेव्हा तुम्ही कर्मावरील लक्ष गमावता. गीता शिकवते: १००% प्रक्रियेवर लक्ष केंद्रित करा. तुमचे प्रयत्न तुमच्या हातात आहेत; फळ हे अनेक घटकांवर अवलंबून असते.",
    example: "A student preparing for exams. If they only think about passing/failing, they can't study properly. If they focus on just 'learning the chapter' (the work), they perform better.",
    reference: "Chapter 2, Verse 47"
  },
  {
    id: "2-14",
    theme: "Resilience / Change",
    emotions: ["sadness", "unhappy", "pain", "hardship"],
    shloka: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदु:खदा:।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    meaning_en: "O son of Kunti, the contact between the senses and their objects gives rise to fleeting perceptions of happiness and distress. These are non-permanent and come and go like the winter and summer seasons. One must learn to tolerate them without being disturbed.",
    meaning_mr: "हे कौन्तेया, इंद्रिये आणि विषय यांच्या संपर्काने होणारे सुख-दु:ख हे थंडी आणि उष्णतेसारखे येणारे-जाणारे आणि अनित्य आहेत. म्हणून हे भारता, तू त्यांचा स्वीकार करायला शिक.",
    guidance_en: "Nothing lasts forever—neither great joy nor deep sorrow. View your current pain as a passing season. Resilience comes from knowing that 'this too shall pass'.",
    guidance_mr: "काहीही कायम टिकत नाही - ना खूप आनंद, ना खूप दुःख. तुमच्या सध्याच्या दुःखाकडे एक येऊन जाणाऱ्या ऋतूसारखे पहा. 'हे ही जाईल' हे जाणून घेण्यानेच संकटाशी लढण्याची ताकद मिळते.",
    example: "During a harsh winter, the trees lose leaves. But they endure, knowing spring will come. Your current struggle is just a winter phase of life.",
    reference: "Chapter 2, Verse 14"
  },
  {
    id: "6-5",
    theme: "Self-Reliance",
    emotions: ["helplessness", "inferiority", "hopelessness", "weakness"],
    shloka: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मन:॥",
    meaning_en: "Elevate yourself through the power of your mind, and do not degrade yourself. For the mind can be the friend and also the enemy of the self.",
    meaning_mr: "माणसाने स्वतःचा उद्धार स्वतःच केला पाहिजे, स्वतःला अधोगतीला नेऊ नये; कारण मन हेच जीवाचा मित्र आहे आणि मन हेच जीवाचा शत्रू आहे.",
    guidance_en: "You are your own greatest asset or your own worst enemy. Stop looking for external saviors. Your willpower and positive mindset are the keys to rising from any situation.",
    guidance_mr: "तुम्ही तुमची सर्वात मोठी संपत्ती किंवा तुमचे सर्वात मोठे शत्रू आहात. बाहेरील तारणाऱ्यांचा शोध थांबवा. तुमची इच्छाशक्ती आणि सकारात्मक मानसिकता ही कोणत्याही परिस्थितीतून पुन्हा उठण्याची गुरुकिल्ली आहे.",
    example: "A person fighting addiction. No one can force them to quit; they must find the inner strength to decide for themselves. They must be their own friend first.",
    reference: "Chapter 6, Verse 5"
  },
  {
    id: "16-21",
    theme: "Self-Control",
    emotions: ["anger", "greed", "lust", "frustration"],
    shloka: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मन:।\nकाम: क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥",
    meaning_en: "There are three gates leading to the hell of self-destruction for the soul—lust, anger, and greed. Therefore, one should abandon these three.",
    meaning_mr: "काम, क्रोध आणि लोभ ही आत्म्याचा नाश करणारी नरकाची तीन द्वारे आहेत. म्हणून या तिन्हींचा त्याग करावा.",
    guidance_en: "Anger and greed consume your rational thinking. When you feel a surge of anger, pause. Realize it is a trap that only leads to your own downfall, not your enemy's.",
    guidance_mr: "राग आणि लोभ तुमच्या तर्कशुद्ध विचारांचा नाश करतात. जेव्हा तुम्हाला रागाची लाट जाणवेल, तेव्हा थोडा वेळ थांबून विचार करा. लक्षात ठेवा, हा एक सापळा आहे जो तुमचा नाश करेल.",
    example: "Road rage. Reacting with anger might feel powerful in the moment, but it leads to accidents, legal trouble, and mental unrest—a personal 'hell'.",
    reference: "Chapter 16, Verse 21"
  },
  {
    id: "2-70",
    theme: "Peace / Contentment",
    emotions: ["greed", "desire", "restlessness", "FOMO"],
    shloka: "आपूर्यमाणमचलप्रतिष्ठं समुद्रमाप: प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमाप्नोति न कामकामी॥",
    meaning_en: "As the ocean remains undisturbed even though rivers are constantly pouring into it, so the person who remains undisturbed despite the flow of desires achieves peace—and not the person who strives to satisfy such desires.",
    meaning_mr: "ज्याप्रमाणे सर्व बाजूंनी येऊन मिळणाऱ्या नद्यांनी न भरता समुद्र अचल राहतो, त्याचप्रमाणे ज्याच्यामध्ये सर्व कामना विलीन होतात, तोच शांती प्राप्त करतो; विषयांचा उपभोग घेणारा नाही.",
    guidance_en: "Peace doesn't come from fulfilling every wish. It comes from being like the ocean—vast enough to handle desires without being disturbed by them.",
    guidance_mr: "प्रत्येक इच्छा पूर्ण केल्याने शांती मिळत नाही. ती समुद्रासारखे बनण्याने मिळते - इतके विशाल की सर्व इच्छांना सामावून घेऊनही शांत राहाल.",
    example: "Scrolling through social media and feeling 'FOMO' (Fear of Missing Out). If you are like a small pond, every 'post' disturbs you. If you are like the ocean, you see the trends but stay calm within.",
    reference: "Chapter 2, Verse 70"
  },
  {
    id: "18-61",
    theme: "Surrender / Trust",
    emotions: ["control", "stress", "worry", "uncertainty"],
    shloka: "ईश्वर: सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति।\nभ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया॥",
    meaning_en: "The Supreme Lord dwells in the hearts of all living beings, O Arjuna. According to their karma, He directs the wanderings of all living entities, who are seated as on a machine, made of material energy.",
    meaning_mr: "हे अर्जुना, ईश्वर सर्व प्राण्यांच्या हृदयात स्थित आहे आणि आपल्या मायेने सर्व प्राण्यांना यंत्रारूढ असल्याप्रमाणे फिरवत आहे.",
    guidance_en: "You don't have to carry the whole world on your shoulders. Trust that there is a larger cosmic order at play. Do your part and surrender the rest to the Divine.",
    guidance_mr: "तुम्हाला संपूर्ण जगाचे ओझे तुमच्या खांद्यावर वाहण्याची गरज नाही. एका मोठ्या वैश्विक व्यवस्थेवर विश्वास ठेवा. तुमचे कर्तव्य करा आणि उरलेले ईश्वरावर सोडा.",
    example: "A pilot flying a plane through a storm. They use all their skills, but at some point, they must trust the plane's technology and the laws of physics to see them through.",
    reference: "Chapter 18, Verse 61"
  },
  {
    id: "2-62",
    theme: "Focus / Mental Health",
    emotions: ["distraction", "addiction", "confusion"],
    shloka: "ध्यायतो विषयान्पुंस: सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते काम: कामात्क्रोधोऽभिजायते॥",
    meaning_en: "While contemplating on the objects of the senses, a person develops attachment to them; from attachment, desire is born, and from desire, anger arises.",
    meaning_mr: "विषयांचे ध्यान करणाऱ्या माणसाची त्या विषयांमध्ये आसक्ती निर्माण होते; आसक्तीतून काम (इच्छा) निर्माण होतो आणि काम पूर्ण न झाल्यामुळे क्रोध उत्पन्न होतो.",
    guidance_en: "Your thoughts are the seeds of your reality. Constant thinking about something creates a loop of desire and eventually frustration. Guard your 'attention'.",
    guidance_mr: "तुमचे विचार तुमच्या वास्तवाचे बीज आहेत. एखाद्या गोष्टीचा सतत विचार केल्याने इच्छा आणि शेवटी निराशेचे चक्र निर्माण होते. तुमच्या 'ध्यानाचे' रक्षण करा.",
    example: "Over-thinking about buying a luxury car you can't afford. It starts as a thought, becomes an obsession, and eventually makes you angry at your current life.",
    reference: "Chapter 2, Verse 62"
  },
  {
    id: "2-63",
    theme: "Consequences of Anger",
    emotions: ["anger", "rage", "regret"],
    shloka: "क्रोधाद्भवति सम्मोह: सम्मोहात्स्मृतिविभ्रम:।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
    meaning_en: "From anger comes total delusion, and from delusion, loss of memory. When memory is lost, intelligence is destroyed, and when intelligence is destroyed, one perishes.",
    meaning_mr: "क्रोधापासून संमोह (मूढभाव) उत्पन्न होतो, संमोहातून स्मृतीचा भ्रम होतो, स्मृती नष्ट झाल्याने बुद्धीचा नाश होतो आणि बुद्धीचा नाश झाल्याने माणसाचा सर्वनाश होतो.",
    guidance_en: "Anger is a chain reaction that kills your wisdom. In 10 seconds of rage, you can burn down years of hard work or relationships. Take a deep breath.",
    guidance_mr: "राग ही एक साखळी प्रतिक्रिया आहे जी तुमच्या बुद्धीचा नाश करते. १० सेकंदांच्या रागात तुम्ही कित्येक वर्षांचे कष्ट किंवा नातेसंबंध उद्ध्वस्त करू शकता. दीर्घ श्वास घ्या.",
    example: "Fighting with a loved one. In anger, you forget all their past kindness (loss of memory) and say things that destroy the bond (destruction of intelligence).",
    reference: "Chapter 2, Verse 63"
  },
  {
    id: "18-48",
    theme: "Duty over Perfection",
    emotions: ["perfectionism", "guilt", "procrastination"],
    shloka: "सहजं कर्म कौन्तेय सदोषमपि न त्यजेत्।\nसर्वारम्भा हि दोषेण धूमेनाग्निरिवावृता:॥",
    meaning_en: "One should not abandon the work they were born to do, O son of Kunti, even if such work is faulty, for all undertakings are covered by some fault, as fire is covered by smoke.",
    meaning_mr: "हे कौन्तेया, दोषयुक्त असले तरी स्वतःचे स्वाभाविक कर्म सोडू नये; कारण जसा अग्नी धुराने वेढलेला असतो, तसेच सर्व उपक्रम कोणत्या ना कोणत्या दोषाने वेढलेले असतात.",
    guidance_en: "Don't wait for the 'perfect' task or 'perfect' time. Every action has some flaw. Starting is more important than being perfect. Done is better than perfect.",
    guidance_mr: "'परिपूर्ण' कामाची किंवा वेळेची वाट पाहू नका. प्रत्येक कृतीत काही ना काही दोष असतोच. कामाची सुरुवात करणे हे परिपूर्णतेपेक्षा जास्त महत्त्वाचे आहे.",
    example: "A writer struggling with the first draft. They want it to be perfect, so they don't write. But like fire has smoke, a first draft has errors. Just write.",
    reference: "Chapter 18, Verse 48"
  },
  {
    id: "6-35",
    theme: "Mind Control",
    emotions: ["distraction", "lack of focus", "restless"],
    shloka: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
    meaning_en: "O mighty-armed son of Kunti, what you say is correct; the mind is indeed very difficult to restrain. But by practice and detachment, it can be controlled.",
    meaning_mr: "हे महाबाहो (अर्जुना), निःसंशयपणे मन चंचल आणि ताब्यात आणण्यास कठीण आहे; परंतु हे कौन्तेया, अभ्यास (प्रॅक्टिस) आणि वैराग्य (अलिप्तता) याद्वारे ते संयमित केले जाऊ शकते.",
    guidance_en: "Don't beat yourself up if your mind wanders. Krishna acknowledges it is hard! The solution is two-fold: consistent Practice (Abhyasa) and learning to let go (Vairagya).",
    guidance_mr: "जर तुमचे मन भरकटत असेल तर स्वतःला दोष देऊ नका. कृष्ण मान्य करतो की ते कठीण आहे! उपाय दोन गोष्टींमध्ये आहे: सतत सराव (अभ्यास) आणि विरक्ती (वैराग्य).",
    example: "Learning to meditate. You will fail many times. But with daily habit (practice) and not getting upset when it fails (detachment), you eventually find peace.",
    reference: "Chapter 6, Verse 35"
  },
  {
    id: "4-7",
    theme: "Hope / Justice",
    emotions: ["unfair", "unjust", "corruption", "bad times"],
    shloka: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    meaning_en: "Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharata, I manifest Myself.",
    meaning_mr: "हे भारता, जेव्हा जेव्हा धर्माची हानी होते आणि अधर्माची वाढ होते, तेव्हा तेव्हा मी अवतार घेतो.",
    guidance_en: "When it feels like evil or unfairness is winning, remember that balance will always be restored. Maintain your integrity; the universe has its way of balancing the scales.",
    guidance_mr: "जेव्हा असे वाटते की अन्याय जिंकत आहे, तेव्हा लक्षात ठेवा की संतुलन नेहमी पुनर्संचयित केले जाईल. तुमची अखंडता राखा; विश्वाकडे स्वतःचे संतुलन राखण्याचे मार्ग आहेत.",
    example: "A whistle-blower facing pressure from a corrupt organization. It feels like they are losing, but history shows that truth eventually surfaces and justice prevails.",
    reference: "Chapter 4, Verse 7"
  },
  {
    id: "2-11",
    theme: "Perspective",
    emotions: ["grief", "death", "loss"],
    shloka: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिता:॥",
    meaning_en: "The Supreme Lord said: While you speak learned words, you are mourning for what is not worthy of grief. Those who are wise lament neither for the living nor for the dead.",
    meaning_mr: "श्रीभगवान म्हणाले: जे शोक करण्यास योग्य नाही, त्यांच्यासाठी तू शोक करत आहेस आणि पंडितांप्रमाणे बोलत आहेस. ज्ञानी लोक जिवंत किंवा मृत कोणासाठीही शोक करत नाहीत.",
    guidance_en: "Most of our worries are about things that don't truly matter in the long run. Seek a higher perspective. The 'Self' is immortal; only the situation changes.",
    guidance_mr: "आपल्या बहुतेक चिंता अशा गोष्टींबद्दल असतात ज्या दीर्घकाळात खरोखर महत्त्वाच्या नसतात. एक उच्च दृष्टीकोन स्वीकारा. 'आत्मा' अमर आहे; फक्त परिस्थिती बदलते.",
    example: "Crying over a broke toy or a minor loss. As adults, we see it as trivial. In the eyes of the universe, many of our big worries are similarly small.",
    reference: "Chapter 2, Verse 11"
  },
  {
    id: "4-18",
    theme: "Proactive Action",
    emotions: ["laziness", "stuck", "boredom"],
    shloka: "कर्मण्यकर्म य: पश्येदकर्मणि च कर्म य:।\nस बुद्धिमान्मनुष्येषु स युक्त: कृत्स्नकर्मकृत्॥",
    meaning_en: "One who sees inaction in action, and action in inaction, is intelligent among men, and he is in the transcendental position, although engaged in all sorts of activities.",
    meaning_mr: "जो कर्मात अकर्म पाहतो आणि अकर्मातही कर्म पाहतो, तो मनुष्यांमध्ये बुद्धिमान आहे आणि तो सर्व कर्मे करूनही योगीच आहे.",
    guidance_en: "True meditation isn't just sitting still; it's doing your work with a still mind. Avoid 'lazy busy-ness'—running around doing nothing meaningful.",
    guidance_mr: "खरे ध्यान म्हणजे फक्त शांत बसणे नव्हे; तर शांत मनाने आपले काम करणे होय. अर्थहीन धावपळ टाळा आणि अर्थपूर्ण कृती करा.",
    example: "A person who sits all day 'planning' but never executes (inaction in action). Vs a person calmly working on their craft without chaos (action in inaction).",
    reference: "Chapter 4, Verse 18"
  },
  {
    id: "13-8",
    theme: "Humility",
    emotions: ["ego", "arrogance", "superiority"],
    shloka: "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम्।\nआचार्योपासनं शौचं स्थैर्यमात्मविनिग्रह:॥",
    meaning_en: "Humility, pridelessness, nonviolence, tolerance, simplicity, service to the guru, cleanliness, steadiness, and self-control...",
    meaning_mr: "विनम्रता, अभिमानाचा अभाव, अहिंसा, क्षमाशीलता, सरळपणा, गुरूची सेवा, शुद्धता, स्थिरता आणि आत्मसंयम...",
    guidance_en: "True knowledge begins with the realization that you don't know everything. Humility is not thinking less of yourself, but thinking of yourself less.",
    guidance_mr: "खरे ज्ञान हे 'मला सर्वकाही माहित नाही' या जाणिवेने सुरू होते. नम्रता म्हणजे स्वतःला कमी लेखणे नव्हे, तर स्वतःबद्दल कमी विचार करणे होय.",
    example: "A great scientist who admits their theory was wrong. Their humility allows them to learn more, while an arrogant person gets stuck in an old error.",
    reference: "Chapter 13, Verse 8"
  },
  {
    id: "17-15",
    theme: "Mindful Speech",
    emotions: ["hurtful", "rude", "argumentative"],
    shloka: "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।\nस्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥",
    meaning_en: "Austerity of speech consists in speaking words that are truthful, pleasing, beneficial, and not agitating to others, and also in regularly reciting Vedic literature.",
    meaning_mr: "मनाला अस्वस्थ न करणारे, सत्य, प्रिय आणि हितकारक असे भाषण तसेच शास्त्रांचा अभ्यास, यालाच भाषेचे तप (तपस्या) म्हणतात.",
    guidance_en: "Before you speak, ask: Is it true? Is it kind? Is it necessary? Your words can heal or kill. Use them like a precision tool.",
    guidance_mr: "बोलण्यापूर्वी स्वतःला विचारा: हे सत्य आहे का? हे दयाळू आहे का? हे आवश्यक आहे का? तुमचे शब्द एखाद्याला बरे करू शकतात किंवा मारूही शकतात.",
    example: "Giving feedback to a colleague. Instead of shouting, choose words that are truthful but intended to help them improve, not to humiliate them.",
    reference: "Chapter 17, Verse 15"
  },
  {
    id: "18-78",
    theme: "Prosperity / Success",
    emotions: ["ambition", "leadership", "striving"],
    shloka: "यत्र योगेश्वर: कृष्णो यत्र पार्थो धनुर्धर:।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
    meaning_en: "Wherever there is Krishna, the Lord of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality.",
    meaning_mr: "जिथे योगेश्वर कृष्ण आहे आणि जिथे धनुर्धारी अर्जुन आहे, तिथेच वैभव, विजय, विभूती आणि अढळ नीती असते, असे माझे मत आहे.",
    guidance_en: "Success is a combination of two things: Vision (Krishna/Wisdom) and Execution (Arjuna/Hard work). One without the other is incomplete.",
    guidance_mr: "यश हे दोन गोष्टींचे संयोजन आहे: दृष्टी (कृष्ण/ज्ञान) आणि अंमलबजावणी (अर्जुन/कष्ट). एकाशिवाय दुसरे अपूर्ण आहे.",
    example: "A startup. The vision of the founder (Krishna) combined with the extreme hard work of the team (Arjuna) leads to a successful valuation and impact.",
    reference: "Chapter 18, Verse 78"
  },
  {
    id: "2-56",
    theme: "Equanimity",
    emotions: ["unstable", "moody", "reactive"],
    shloka: "दु:खेष्वनुद्विग्नमना: सुखेषु विगतस्पृह:।\nवीतरागभयक्रोध: स्थितधीर्मुनिरुच्यते॥",
    meaning_en: "One whose mind remains undisturbed amidst misery, who does not crave for pleasure, and who is free from attachment, fear, and anger, is called a sage of steady wisdom.",
    meaning_mr: "ज्याचे मन दु:खात अस्वस्थ होत नाही, ज्याला सुखाची लालसा नसते आणि जो आसक्ती, भीती आणि क्रोध यांपासून मुक्त आहे, त्याला स्थिरबुद्धी मुनी म्हणतात.",
    guidance_en: "Don't be a slave to your moods. True freedom is when your inner state is independent of your outer circumstances.",
    guidance_mr: "तुमच्या मनःस्थितीचे गुलाम बनू नका. खरी सुटका तेव्हाच होते जेव्हा तुमची आंतरिक स्थिती बाहेरील परिस्थितीवर अवलंबून नसते.",
    example: "A stock trader. If they get depressed when stocks go down and manic when they go up, they will make bad choices. A successful trader stays calm in both.",
    reference: "Chapter 2, Verse 56"
  },
  {
    id: "3-35",
    theme: "Authenticity / Path",
    emotions: ["comparison", "jealousy", "lost"],
    shloka: "श्रेयान्स्वधर्मो विगुण: परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेय: परधर्मो भयावह:॥",
    meaning_en: "It is far better to perform one’s own duty, even if with faults, than to perform another’s duty perfectly. Destruction in the course of performing one’s own duty is better than engaging in another’s duty, for to follow another’s path is dangerous.",
    meaning_mr: "दुसऱ्याचे कर्तव्य (धर्म) कितीही चांगल्या प्रकारे करण्यापेक्षा आपले स्वतःचे विहित कर्तव्य, जरी काही दोष असले तरी, करणे जास्त चांगले आहे. आपल्या कर्तव्यात मृत्यू येणेही श्रेयस्कर आहे, कारण दुसऱ्याचा मार्ग भयावह असतो.",
    guidance_en: "Stop comparing your life to others. Your path, however messy, is yours. Copying someone else's success path will lead to internal friction and failure.",
    guidance_mr: "तुमच्या जीवनाची तुलना इतरांशी करणे थांबवा. तुमचा मार्ग कितीही कठीण असला तरी तो तुमचा आहे. दुसऱ्याच्या यशाच्या मार्गाची नक्कल केल्याने अपयशच येईल.",
    example: "An artist trying to be an engineer just for money. They might do okay, but they will never be truly successful or happy because it's not their 'Svadharma'.",
    reference: "Chapter 3, Verse 35"
  },
  {
    id: "9-22",
    theme: "Security / Provision",
    emotions: ["scarcity", "lack of money", "vulnerable"],
    shloka: "अनन्याश्चिन्तयन्तो मां ये जना: पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    meaning_en: "For those who are always absorbed in thoughts of Me, and who worship Me with exclusive devotion, I personally manage their needs and protect what they have.",
    meaning_mr: "जे लोक अनन्यभावाने माझे चिंतन करत माझी उपासना करतात, अशा माझ्याशी नित्य जोडलेल्या भक्तांच्या गरजा मी स्वतः पूर्ण करतो आणि त्यांच्याजवळ असलेल्या गोष्टींचे रक्षण करतो.",
    guidance_en: "Do your duty with devotion and stop worrying about survival. When you align yourself with the higher purpose, the universe provides the resources you need.",
    guidance_mr: "तुमचे कर्तव्य निष्ठेने करा आणि उदरनिर्वाहाची चिंता थांबवा. जेव्हा तुम्ही स्वतःला उच्च ध्येयाशी जोडता, तेव्हा विश्व तुम्हाला आवश्यक ती साधने पुरवते.",
    example: "A social worker dedicated to a cause with no funding. Often, unexpected donations and help arrive just when needed because they are focused on the service, not the lack.",
    reference: "Chapter 9, Verse 22"
  },
  {
    id: "3-8",
    theme: "Action over Laziness",
    emotions: ["lazy", "procrastination", "avoidance"],
    shloka: "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मण:।\nशरीरयात्रापि च ते न प्रसिद्धयेदकर्मण:॥",
    meaning_en: "Perform your prescribed duties, for doing so is better than not working. Even the maintenance of your body would not be possible without work.",
    meaning_mr: "तू तुझे विहित कर्तव्य कर, कारण कर्म न करण्यापेक्षा कर्म करणे श्रेष्ठ आहे. तुझ्या शरीराचे पोषणही कर्म केल्याशिवाय शक्य नाही.",
    guidance_en: "Action is the engine of life. Even just moving your body helps clear the mind. Don't think, just start doing the smallest next step.",
    guidance_mr: "कृती हे जीवनाचे इंजिन आहे. फक्त शरीर हालचाल केल्यानेही मन मोकळे होते. विचार करण्याऐवजी, फक्त पुढचे छोटे पाऊल उचलायला सुरुवात करा.",
    example: "When you feel depressed and don't want to get out of bed. Just getting up and taking a shower (the smallest duty) starts the momentum towards healing.",
    reference: "Chapter 3, Verse 8"
  }
];
