/* The words for each case study. The screens, palettes and type come from the apps themselves (window.APPS). */
window.CASES = {
  claimo: {
    colors: { bg: '#f6f2ea', ink: '#1b1915', soft: '#54514a', accent: '#2247d1', on: '#ffffff', panel: '#ece6da', band: '#1836b4' },
    line: 'Every Uber and Rapido ride you take for work, turned into the PDF your finance team accepts, without typing a single fare.',
    facts: [['Platform', 'iOS, 14 screens'], ['Role', 'Product design and engineering'], ['Shipped', '<a href="https://claimo.fun">claimo.fun</a>, a Next.js web app'], ['Code', '<a href="https://github.com/gajanansr/claimo">gajanansr/claimo</a>'], ['This design', '2026 redesign; the live app looks different']],
    hint: 'This phone works. Drag the receipt right for work, left for personal.',
    problem: 'At month end, forty ride emails turn into a spreadsheet nobody wants to make.',
    approach: 'Claimo reads the receipts from Gmail with read-only access. The design problem was what comes after: sorting work from personal fast enough that it never becomes a chore.',
    sig: ['deck', 'The claim deck', 'Each unsorted ride is a card with its route and fare. Swipe right and it joins the report while the claim total counts up. Swipe left and it stays personal. A month of rides takes about a minute.'],
    decisions: [
      ['connect', 'Say what is never read.', 'Gmail access scares people. The connect screen puts what Claimo reads and what it never touches side by side, before Google\'s own prompt.'],
      ['fix', 'An error asks for one number.', 'When Uber changes its receipt layout, Claimo keeps everything it could read and asks only for the fare, with a keypad already open.'],
      ['places', 'Rules sort most rides for you.', 'Home, office and a client site are saved places. Any ride between them is sorted before you see it.'],
      ['ready', 'See every page before finance does.', 'The report is previewed page by page, then goes to the approver in one tap.']
    ],
    photo: ['assets/traffic.jpg', 'A green BMTC bus and an autorickshaw in evening traffic in Bengaluru', 'Evening traffic in Bengaluru, where a month of commuting adds up.']
  },
  slates: {
    colors: { bg: '#100e0c', ink: '#f4ebe4', soft: '#bfb5ad', accent: '#fead4c', on: '#100e0c', panel: '#201b18', band: '#6b4513' },
    line: 'A pocket notebook for people who make films on their phones: save the reel that inspired you, then turn it into a shot, a script page and a voice note.',
    facts: [['Platform', 'iOS, 12 screens'], ['Role', 'Product design and engineering'], ['Shipped', 'React Native with Expo'], ['Code', '<a href="https://github.com/gajanansr/slates">gajanansr/slates</a>'], ['This design', '2026 redesign of the shipped app']],
    hint: 'This phone works. Swipe the reels in the inbox: right to keep, left to skip.',
    problem: 'Creators save hundreds of reels a month and use almost none of them.',
    approach: 'The redesign follows a short film, Last Metro to Whitefield, from the reel that inspired it to the ninth shot on the storyboard.',
    sig: ['stack', 'Sort the inbox like dailies', 'Saved reels arrive as a deck of cards. Drag one right and it becomes a shot on the storyboard; drag left and it goes. A Keep or Skip label fades in as you drag, and the next card rises underneath.'],
    decisions: [
      ['share', 'Capture lives in the share sheet.', 'Ideas arrive inside Instagram, not inside Slates. One tap from the system share sheet saves the reel with its title, cover and length.'],
      ['newslate', 'A new film is three fields.', 'Title, type and shoot day. The reel you were saving becomes the cover and the first inspiration, so a new slate is never empty.'],
      ['board', 'The storyboard is a timeline.', 'Shots are sized by their length, so the film\'s rhythm is visible. Hold a shot and drag it to reorder.'],
      ['script', 'A script that looks like a script.', 'Real screenplay format in Courier Prime, saved as you type, with scene, action and dialogue one tap away.']
    ],
    photo: ['assets/metro.jpg', 'A Namma Metro train at the platform at Baiyappanahalli station', 'Baiyappanahalli station on the Purple Line, where the film in this case study begins.']
  },
  quire: {
    colors: { bg: '#fcf8f4', ink: '#191713', soft: '#4c4740', accent: '#8e2a2f', on: '#fcf8f4', panel: '#f5f0ea', band: '#471617' },
    line: 'A quiet place to read on Android. Your books never leave the phone, because the app has no permission to use the internet at all.',
    facts: [['Platform', 'Android, 12 screens'], ['Role', 'Product design and engineering'], ['Shipped', 'Kotlin and Jetpack Compose, <a href="https://gajanansr.github.io/quire/">site</a>'], ['Code', '<a href="https://github.com/gajanansr/quire">gajanansr/quire</a>, MIT'], ['This design', '2026 redesign of the shipped app']],
    hint: 'This phone works. Drag the page from its right edge to turn it, or long-press a word.',
    problem: 'Most reading apps want an account, a store and a feed. Reading needs a file and quiet.',
    approach: 'The redesign is plain Material 3: quiet surfaces, one deep red accent, and a real book face only where the book itself is shown.',
    sig: ['reader', 'A page you turn with your finger', 'Drag from the edge and the page folds under your finger, casting a shadow. Let go past halfway and it turns; let go early and it springs back flat. Change the theme and the new ink spreads from the swatch you touched.'],
    decisions: [
      ['welcome', 'Promises the system enforces.', 'The first screen makes two promises, no internet and no account, and both are guaranteed by Android rather than by a privacy policy.'],
      ['type', 'Five themes, tuned for long reading.', 'Paper, Sepia, E-ink, Night and Black, each between 10:1 and 15:1 contrast. E-ink has exactly zero chroma, as the screens it is made for do.'],
      ['habit', 'A streak that pauses.', 'Missing a day pauses the streak instead of resetting it. A reading habit should not feel like a punishment.'],
      ['scan', 'Scans are labelled honestly.', 'A scanned PDF is shown as pages and labelled as having no text, rather than run through OCR that would invent words.']
    ],
    photo: ['assets/cubbon-postcard.jpg', 'Old postcard of the public offices in Cubbon Park, Bangalore', 'Cubbon Park, Bangalore, on an early postcard. The city\'s quietest place to read.']
  },
  rewind: {
    colors: { bg: '#0c0f12', ink: '#edf0f4', soft: '#aeb3ba', accent: '#6fe581', on: '#0c0f12', panel: '#1d2125', band: '#1d4f2a' },
    line: 'Interview prep that makes you say your approach out loud, then plays it back to you right before you would have forgotten it.',
    facts: [['Platform', 'iOS, 12 screens'], ['Role', 'Product design and engineering'], ['Shipped', '<a href="https://rewind-dsa.vercel.app">rewind-dsa.vercel.app</a>, a React PWA'], ['Code', '<a href="https://github.com/gajanansr/rewind">gajanansr/rewind</a>'], ['This design', '2026 redesign of the shipped app']],
    hint: 'This phone works. Hold the record button to talk, then drag the tape to rewind.',
    problem: 'Interviews judge how clearly you explain your thinking. Most people practise in silence.',
    approach: 'Rewind is built around one habit: record yourself explaining a problem, rate how clear you sounded, and hear it again on the day spaced repetition says you would start to forget.',
    sig: ['record', 'Recording your thinking', 'Hold to talk. The waveform answers your voice, a ring breathes with it, and prompts appear as the minutes pass: brute force first, then why it works, then time and space. On playback, drag the waveform to scrub back to any moment.'],
    decisions: [
      ['playback', 'Your rating moves the calendar.', 'Again, Hard, Good or Easy each move the next revisit on a calendar you can see, before you commit.'],
      ['patterns', 'Patterns, not problem numbers.', 'Interviews test sliding windows and heaps, not problem 3. Mastery is tracked per pattern, shown in words and pips as well as colour.'],
      ['revision', 'Listen first, then say it again.', 'A revision plays your old take, shows what you missed, then asks for a new take without notes.'],
      ['empty', 'An empty queue is a good day.', 'When nothing is due, the app says so, says when the next tapes come back, and lets you go.']
    ],
    photo: ['assets/metro-coach.jpg', 'Inside a Namma Metro coach, steel poles and a blue floor', 'A Namma Metro coach, where a lot of Bengaluru\'s interview prep actually happens.']
  }
};
