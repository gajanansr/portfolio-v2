/* Rewind v3: DSA interview prep you say out loud, then hear again before you forget. Clean iOS 26. */
(() => {
  const PATTERNS = [
    { id: 'hash', name: 'Hash map', n: 6, m: 88 },
    { id: 'two', name: 'Two pointers', n: 5, m: 74 },
    { id: 'trees', name: 'Trees', n: 5, m: 70 },
    { id: 'bin', name: 'Binary search', n: 4, m: 66 },
    { id: 'slide', name: 'Sliding window', n: 4, m: 58 },
    { id: 'heap', name: 'Heap', n: 3, m: 52 },
    { id: 'graph', name: 'Graph BFS / DFS', n: 4, m: 47 },
    { id: 'int', name: 'Intervals', n: 3, m: 41 },
    { id: 'dp', name: '1-D dynamic programming', n: 4, m: 35 },
    { id: 'topo', name: 'Topological sort', n: 2, m: 30 },
    { id: 'back', name: 'Backtracking', n: 2, m: 25 },
    { id: 'trie', name: 'Tries', n: 1, m: 18 }
  ];
  const RATE = {
    Again: { days: 1, d: -4, label: 'Tomorrow' },
    Hard: { days: 3, d: 2, label: 'In 3 days' },
    Good: { days: 7, d: 6, label: 'In a week' },
    Easy: { days: 14, d: 9, label: 'In 2 weeks' }
  };
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const TODAY = new Date(2026, 9, 22);
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const fmtDay = d => `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  const mmss = t => { t = Math.max(0, Math.round(t)); return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };
  const msShort = t => { t = Math.max(0, Math.round(t)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };

  /* speech-like amplitudes: syllable bursts inside phrases, short breaths between */
  function speech(n, seed) {
    let x = seed || 7; const r = () => (x = (x * 16807) % 2147483647) / 2147483647;
    const out = []; let phrase = 0;
    for (let i = 0; i < n; i++) {
      if (phrase <= 0) phrase = r() < .16 ? -(2 + Math.floor(r() * 3)) : 6 + Math.floor(r() * 14);
      if (phrase < 0) { out.push(.05 + r() * .05); phrase++; if (phrase === 0) phrase = 0; continue; }
      const syll = .45 + .55 * Math.abs(Math.sin(i * 1.7 + r() * 2));
      out.push(Math.min(1, .18 + syll * (.5 + r() * .5)));
      phrase--;
    }
    return out;
  }
  const PROMPTS = [
    ['Restate it', 'Say the problem in your own words. What goes in, what comes out?'],
    ['Brute force first', 'What is the slowest answer that works? Say its cost.'],
    ['Why the window moves', 'When does the left edge jump, and why is it safe?'],
    ['Edge cases', 'Empty string, all one letter, every letter different.'],
    ['Time and space', 'Name both. Say what the map holds at its largest.']
  ];
  const promptAt = t => t < 18 ? 0 : t < 48 ? 1 : t < 100 ? 2 : t < 140 ? 3 : 4;
  const CHAPTERS = [[0, 'Restate'], [.12, 'Brute force'], [.33, 'The window'], [.68, 'Edge cases'], [.85, 'Complexity']];
  const LINES = [
    '"So we want the longest stretch of the string where no letter repeats…"',
    '"Brute force: check every substring, that\'s n squared of them, n cubed with the check."',
    '"Keep a window. When a letter repeats, jump left past where we last saw it."',
    '"Empty string gives zero. abba is the tricky one: left must never move back."',
    '"Linear time, one pass. Space is the size of the alphabet, at most 128 here."'
  ];

  /* one fitting problem per pattern; the problem screen, the tape label and the rating all follow s.prob */
  const PROBS = {
    slide: { t: 'Longest Substring Without Repeating Characters', short: 'Longest Substring', lc: 3, diff: 'Medium', co: 'Atlassian, Razorpay',
      st: 'Given a string <code>s</code>, find the length of the longest substring without repeating characters.',
      ex: [['s = "abcabcbb"', '→ 3, the answer is "abc"'], ['s = "pwwkew"', '→ 3, "wke" (a substring, not "pwke")']],
      kv: [['Constraints', '0 ≤ s.length ≤ 5·10⁴'], ['Characters', 'letters, digits, symbols, spaces']],
      code: 'def length_of_longest(s):\n    seen, left, best = {}, 0, 0\n    for right, ch in enumerate(s):\n        if seen.get(ch, -1) >= left:\n            left = seen[ch] + 1\n        seen[ch] = right\n        best = max(best, right - left + 1)\n    return best',
      tc: 'O(n)', sc: 'O(min(n, 128))', acc: '8 Oct, 2nd try', key: ['Why the window moves', 'When does the left edge jump, and why is it safe?'],
      takes: [['Take 2', '8 Oct', '4:12', 'Hard', 'Forgot why left never moves back'], ['Take 1', '1 Oct', '5:40', 'Again', 'Started coding before the brute force']],
      better: 'You explained why left never moves back ("abba"), the thing you skipped on 8 Oct. You also said the cost of brute force out loud.' },
    hash: { t: 'Two Sum', short: 'Two Sum', lc: 1, diff: 'Easy', co: 'Flipkart, Swiggy',
      st: 'Given an array <code>nums</code> and a <code>target</code>, return the indices of the two numbers that add up to the target.',
      ex: [['nums = [2, 7, 11, 15], target = 9', '→ [0, 1]'], ['nums = [3, 2, 4], target = 6', '→ [1, 2]']],
      kv: [['Constraints', '2 ≤ nums.length ≤ 10⁴'], ['Guarantee', 'exactly one answer']],
      code: 'def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        if target - x in seen:\n            return [seen[target - x], i]\n        seen[x] = i',
      tc: 'O(n)', sc: 'O(n)', acc: '2 Sep, 1st try', key: ['Why a map', 'What do you store, and what do you look up?'] },
    two: { t: 'Container With Most Water', short: 'Most Water', lc: 11, diff: 'Medium', co: 'Google, Zerodha',
      st: 'Given heights of vertical lines, pick two that, with the x-axis, hold the most water. Return that amount.',
      ex: [['height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', '→ 49'], ['height = [1, 1]', '→ 1']],
      kv: [['Constraints', '2 ≤ n ≤ 10⁵'], ['Heights', '0 ≤ h ≤ 10⁴']],
      code: 'def max_area(h):\n    l, r, best = 0, len(h) - 1, 0\n    while l < r:\n        best = max(best, (r - l) * min(h[l], h[r]))\n        if h[l] < h[r]:\n            l += 1\n        else:\n            r -= 1\n    return best',
      tc: 'O(n)', sc: 'O(1)', acc: '12 Sep, 1st try', key: ['Which pointer moves', 'Why is moving the shorter line always safe?'] },
    trees: { t: 'Binary Tree Level Order Traversal', short: 'Level Order', lc: 102, diff: 'Medium', co: 'Atlassian, Flipkart',
      st: 'Given the root of a binary tree, return its values level by level, left to right.',
      ex: [['root = [3, 9, 20, null, null, 15, 7]', '→ [[3], [9, 20], [15, 7]]'], ['root = []', '→ []']],
      kv: [['Constraints', '0 ≤ nodes ≤ 2000'], ['Values', '-1000 ≤ val ≤ 1000']],
      code: 'def level_order(root):\n    out, q = [], deque([root] if root else [])\n    while q:\n        level = [q.popleft() for _ in range(len(q))]\n        out.append([n.val for n in level])\n        q.extend(c for n in level for c in (n.left, n.right) if c)\n    return out',
      tc: 'O(n)', sc: 'O(width)', acc: '20 Sep, 1st try', key: ['Where a level ends', 'How do you know when one level is done?'] },
    bin: { t: 'Search in Rotated Sorted Array', short: 'Rotated Search', lc: 33, diff: 'Medium', co: 'Razorpay, Google',
      st: 'A sorted array was rotated at an unknown pivot. Find the index of <code>target</code> in O(log n), or return -1.',
      ex: [['nums = [4, 5, 6, 7, 0, 1, 2], target = 0', '→ 4'], ['nums = [1], target = 0', '→ -1']],
      kv: [['Constraints', '1 ≤ n ≤ 5000'], ['Values', 'all distinct']],
      code: 'def search(nums, t):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == t:\n            return mid\n        if nums[lo] <= nums[mid]:\n            lo, hi = (lo, mid - 1) if nums[lo] <= t < nums[mid] else (mid + 1, hi)\n        else:\n            lo, hi = (mid + 1, hi) if nums[mid] < t <= nums[hi] else (lo, mid - 1)\n    return -1',
      tc: 'O(log n)', sc: 'O(1)', acc: '27 Sep, 3rd try', key: ['Which half is sorted', 'How do you tell, and why does it decide the move?'] },
    heap: { t: 'Kth Largest Element in an Array', short: 'Kth Largest', lc: 215, diff: 'Medium', co: 'Swiggy, Flipkart',
      st: 'Return the kth largest element of <code>nums</code>, in sorted order, not the kth distinct one.',
      ex: [['nums = [3, 2, 1, 5, 6, 4], k = 2', '→ 5'], ['nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4', '→ 4']],
      kv: [['Constraints', '1 ≤ k ≤ n ≤ 10⁵'], ['Ask', 'can you beat sorting?']],
      code: 'def find_kth_largest(nums, k):\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return heap[0]',
      tc: 'O(n log k)', sc: 'O(k)', acc: '8 Oct, 1st try', key: ['Why a min-heap', 'Why the smallest of the k largest sits on top?'] },
    graph: { t: 'Number of Islands', short: 'Islands', lc: 200, diff: 'Medium', co: 'Atlassian, Google',
      st: 'Given a grid of "1" (land) and "0" (water), count the islands. Land connects up, down, left and right.',
      ex: [['grid = 4×5, one block of land', '→ 1'], ['grid = 4×5, three separate blocks', '→ 3']],
      kv: [['Constraints', '1 ≤ m, n ≤ 300'], ['Edges', 'all water outside the grid']],
      code: 'def num_islands(g):\n    def sink(r, c):\n        if 0 <= r < len(g) and 0 <= c < len(g[0]) and g[r][c] == "1":\n            g[r][c] = "0"\n            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n                sink(r + dr, c + dc)\n    count = 0\n    for r in range(len(g)):\n        for c in range(len(g[0])):\n            if g[r][c] == "1":\n                sink(r, c)\n                count += 1\n    return count',
      tc: 'O(m·n)', sc: 'O(m·n) stack', acc: '30 Sep, 2nd try', key: ['Why sink the land', 'What stops you counting one island twice?'] },
    int: { t: 'Merge Intervals', short: 'Merge Intervals', lc: 56, diff: 'Medium', co: 'Razorpay, Zerodha',
      st: 'Given a list of intervals, merge every overlapping pair and return the intervals that remain.',
      ex: [['[[1,3], [2,6], [8,10], [15,18]]', '→ [[1,6], [8,10], [15,18]]'], ['[[1,4], [4,5]]', '→ [[1,5]]']],
      kv: [['Constraints', '1 ≤ n ≤ 10⁴'], ['Touching', '[1,4] and [4,5] overlap']],
      code: 'def merge(iv):\n    iv.sort(key=lambda x: x[0])\n    out = [iv[0]]\n    for s, e in iv[1:]:\n        if s <= out[-1][1]:\n            out[-1][1] = max(out[-1][1], e)\n        else:\n            out.append([s, e])\n    return out',
      tc: 'O(n log n)', sc: 'O(n)', acc: '15 Oct, 1st try', key: ['Why sort first', 'What breaks if the intervals are not sorted?'] },
    dp: { t: 'House Robber', short: 'House Robber', lc: 198, diff: 'Medium', co: 'Flipkart, Swiggy',
      st: 'Each house holds some money; you cannot rob two neighbours. Return the most you can take.',
      ex: [['nums = [1, 2, 3, 1]', '→ 4 (houses 1 and 3)'], ['nums = [2, 7, 9, 3, 1]', '→ 12']],
      kv: [['Constraints', '1 ≤ n ≤ 100'], ['Values', '0 ≤ nums[i] ≤ 400']],
      code: 'def rob(nums):\n    take, skip = 0, 0\n    for x in nums:\n        take, skip = skip + x, max(take, skip)\n    return max(take, skip)',
      tc: 'O(n)', sc: 'O(1)', acc: '4 Oct, 2nd try', key: ['The recurrence', 'Say the choice at each house in one sentence.'] },
    topo: { t: 'Course Schedule', short: 'Course Schedule', lc: 207, diff: 'Medium', co: 'Atlassian, Google',
      st: 'There are <code>n</code> courses and prerequisite pairs. Return true if you can finish every course.',
      ex: [['n = 2, prerequisites = [[1, 0]]', '→ true'], ['n = 2, prerequisites = [[1, 0], [0, 1]]', '→ false (a cycle)']],
      kv: [['Constraints', '1 ≤ n ≤ 2000'], ['Pairs', 'up to 5000']],
      code: 'def can_finish(n, pre):\n    indeg, adj = [0] * n, [[] for _ in range(n)]\n    for a, b in pre:\n        adj[b].append(a)\n        indeg[a] += 1\n    q = deque(i for i in range(n) if indeg[i] == 0)\n    done = 0\n    while q:\n        u = q.popleft()\n        done += 1\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                q.append(v)\n    return done == n',
      tc: 'O(V + E)', sc: 'O(V + E)', acc: '19 Oct, 2nd try', key: ['What a cycle looks like', 'Why does a leftover course mean a cycle?'] },
    back: { t: 'Subsets', short: 'Subsets', lc: 78, diff: 'Medium', co: 'Google, Zerodha',
      st: 'Given distinct integers, return every possible subset, with no duplicates.',
      ex: [['nums = [1, 2, 3]', '→ [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]'], ['nums = [0]', '→ [[], [0]]']],
      kv: [['Constraints', '1 ≤ n ≤ 10'], ['Count', '2ⁿ subsets']],
      code: 'def subsets(nums):\n    out, path = [], []\n    def go(i):\n        if i == len(nums):\n            out.append(path[:])\n            return\n        path.append(nums[i]); go(i + 1)\n        path.pop(); go(i + 1)\n    go(0)\n    return out',
      tc: 'O(n · 2ⁿ)', sc: 'O(n) stack', acc: '10 Oct, 1st try', key: ['The two choices', 'At each number, what are the two branches?'] },
    trie: { t: 'Implement Trie (Prefix Tree)', short: 'Implement Trie', lc: 208, diff: 'Medium', co: 'Swiggy, Atlassian',
      st: 'Build a trie with <code>insert</code>, <code>search</code> and <code>startsWith</code> for lowercase words.',
      ex: [['insert("apple"); search("apple")', '→ true'], ['search("app"); startsWith("app")', '→ false, true']],
      kv: [['Constraints', '1 ≤ word.length ≤ 2000'], ['Calls', 'up to 3·10⁴']],
      code: 'class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, w):\n        node = self.root\n        for ch in w:\n            node = node.setdefault(ch, {})\n        node["$"] = True\n    def search(self, w, prefix=False):\n        node = self.root\n        for ch in w:\n            if ch not in node:\n                return False\n            node = node[ch]\n        return prefix or "$" in node',
      tc: 'O(L) per call', sc: 'O(total letters)', acc: 'Not yet', key: ['What a node holds', 'Why a map per node, and what marks a word?'], takes: [] }
  };
  const PAT_OF = Object.fromEntries(PATTERNS.map(p => [p.id, p]));
  const takesOf = id => { const P = PROBS[id]; if (P.takes) return P.takes; const m = PAT_OF[id].m; return [['Take 1', P.acc.split(',')[0], m >= 70 ? '3:05' : '4:20', m >= 70 ? 'Good' : m >= 40 ? 'Hard' : 'Again', m >= 70 ? 'Clear, named both costs' : 'Skipped the complexity']]; };
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const hl = code => esc(code).replace(/("[^"\n]*")|((?<=\b(?:def|class) )\w+)|\b(def|class|for|in|if|else|elif|while|return|lambda|not|and|or|True|False|None)\b|(?<![\w.])(\d+)(?!\w)/g,
    (m, str, fn, kw, num) => `<span class="${fn ? 'f' : kw ? 'k' : 'n'}">${m}</span>`);
  const lineFor = (s, ci) => {
    if (s.prob === 'slide') return LINES[ci];
    const P = PROBS[s.prob];
    return ['"Let me say it back first: what comes in, and what I return…"', '"Brute force first: try every option, and say what that costs."',
      `"${P.key[0]}: ${P.key[1].replace(/\?$/, '')}. Here is the reason…"`, '"Edge cases: empty input, a single element, everything the same."',
      `"Time is ${P.tc}, space is ${P.sc}."`][ci];
  };
  const mastery = s => PATTERNS.map(p => ({ ...p, m: p.id === s.savedPat ? p.m + RATE[s.savedRating].d : p.m }));
  const readiness = s => Math.round(mastery(s).reduce((a, p) => a + p.m, 0) / PATTERNS.length);
  const daysLeft = 53;

  const icon = {
    today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none"/></svg>',
    patterns: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/></svg>',
    report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5h16"/><path d="M5 15l4.5-4.5 3.5 3 6-6.5"/><path d="M15 7h4v4"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.8l10-6.8a1 1 0 0 0 0-1.6l-10-6.8c-.7-.5-1.6 0-1.6.8z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5L8 12l6.5 6.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8.5" y="2.5" width="7" height="12" rx="3.5" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19M16 3l3 3-3 3M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5M8 21l-3-3 3-3"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="14" rx="3.5"/><path d="M5 10h14M8.5 21l1.5-4M15.5 21L14 17"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c.6 3.2-1.6 4.9-3 6.6C7.6 10.8 6.5 12.5 6.5 15a5.5 5.5 0 0 0 11 0c0-2.2-1-3.7-2-5 .1 1.6-.5 2.8-1.6 3.3.4-3.4-.6-7.6-1.9-10.8z"/></svg>',
    wave: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2.5" y="10" width="2.4" height="4" rx="1.2"/><rect x="6.7" y="6.5" width="2.4" height="11" rx="1.2"/><rect x="10.9" y="3" width="2.4" height="18" rx="1.2"/><rect x="15.1" y="7.5" width="2.4" height="9" rx="1.2"/><rect x="19.3" y="10.5" width="2.4" height="3" rx="1.2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/></svg>',
    export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 13v5.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V13"/></svg>',
    disk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/></svg>',
    rew: '<svg viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 9.5A10 10 0 1 1 5 15"/><path d="M7.5 4.5v5h5"/></svg>',
    fwd: '<svg viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 9.5A10 10 0 1 0 25 15"/><path d="M22.5 4.5v5h-5"/></svg>'
  };

  /* a waveform as bars; viewBox scales to its box */
  const wave = (amps, cls, w = 3, gap = 2, h = 64) => {
    const W = amps.length * (w + gap) - gap;
    return `<svg class="rw-wave ${cls}" viewBox="0 0 ${W} ${h}" preserveAspectRatio="none" aria-hidden="true">${amps.map((v, i) => { const bh = Math.max(w, v * h); return `<rect x="${i * (w + gap)}" y="${((h - bh) / 2).toFixed(1)}" width="${w}" height="${bh.toFixed(1)}" rx="${w / 2}"/>`; }).join('')}</svg>`;
  };
  const tabbar = cur => `<div class="rw-edge" aria-hidden="true"></div><nav class="rw-tabs" aria-label="Rewind">
      ${[['today', 'Today'], ['patterns', 'Patterns'], ['report', 'Readiness'], ['settings', 'Settings']].map(([k, n]) =>
        `<button class="${k === cur ? 'on' : ''}" ${k === cur ? 'aria-current="page"' : `data-go="${k}" data-dir="fade"`}>${icon[k]}<span>${n}</span></button>`).join('')}
    </nav>`;
  const nav = (title, right = '') => `<header class="rw-nav"><button class="rw-circ" data-back aria-label="Back">${icon.back}</button><span class="ttl">${title}</span><span class="rw-navr">${right}</span></header>`;
  const lvl = m => m >= 70 ? 3 : m >= 40 ? 2 : 1;
  const barCls = m => m >= 70 ? '' : m >= 40 ? 'b' : 'w';

  const app = {
    id: 'rewind', name: 'Rewind', platform: 'ios', tone: 'dark',
    fonts: ['Inter:wght@300;400;500;600;700', 'JetBrains+Mono:wght@400;500'],
    screens: [
      { id: 'welcome', title: 'Welcome', caption: 'One promise and three steps, in the shape of an iOS welcome sheet.' },
      { id: 'goal', title: 'Your interview', caption: 'Role, companies, date and the minutes you really have. The plan updates as you choose.' },
      { id: 'today', title: 'Today', caption: 'How ready you are, how many days are left, and the three takes due today.' },
      { id: 'patterns', title: 'Patterns', caption: 'Mastery per pattern, grouped by level and shown in words, pips and bars, not colour alone.' },
      { id: 'problem', title: 'Problem', caption: 'The problem, your code and every take you have recorded on it, one segment apart.' },
      { id: 'record', title: 'Record', caption: 'The signature. Hold to talk; the waveform answers your voice and a prompt keeps you on track.' },
      { id: 'playback', title: 'Play back and rate', caption: 'Drag the waveform to rewind. Your rating moves the next revisit on the calendar.' },
      { id: 'scheduled', title: 'Scheduled', caption: 'The next date is set, and mastery and readiness move by exactly what the rating earned.' },
      { id: 'revision', title: 'Revision', caption: 'Hear your old explanation first, see what you missed, then say it again without it.' },
      { id: 'empty', title: 'All caught up', caption: 'An empty queue is a good day. It says when the next takes come back.' },
      { id: 'report', title: 'Readiness', caption: 'The trend, the projection to interview day and the three patterns to fix next.' },
      { id: 'settings', title: 'Settings', caption: 'Reminders that fit a Bengaluru day, and every take stays on the phone.' }
    ],
    signature: 'record',
    system: {
      summary: 'Apple-clean: system greys, Inter on the iOS type scale, one green for progress and every primary action, and red reserved for the moment you are recording.',
      palette: [
        { token: '--color-bg', name: 'Grouped grey', value: '#f3f3f6', role: 'Page background' },
        { token: '--color-surface', name: 'White', value: '#ffffff', role: 'Cards, lists, sheets' },
        { token: '--color-fill', name: 'Fill', value: '#e6e6ea', role: 'Segments, chips, tracks' },
        { token: '--color-text', name: 'Label', value: '#111116', role: 'Primary text' },
        { token: '--color-text-secondary', name: 'Secondary label', value: '#54545c', role: 'Supporting text' },
        { token: '--color-accent', name: 'Rewind green', value: '#067e3f', role: 'Progress, primary actions' },
        { token: '--color-accent-subtle', name: 'Green tint', value: '#e0f7e5', role: 'Icon tiles, chart area' },
        { token: '--color-record', name: 'Record red', value: '#ce2324', role: 'Only while recording' },
        { token: '--color-mastery-building', name: 'Amber', value: '#c8850f', role: 'Mastery: building' }
      ],
      type: [
        { role: 'Large title', family: 'Inter', sample: 'Today', spec: '34/41 · 700 · -2.5%' },
        { role: 'Timer', family: 'Inter', sample: '01:24', spec: '64/72 · 300 · tabular' },
        { role: 'Body', family: 'Inter', sample: 'Brute force first?', spec: '17/22 · 400–600' },
        { role: 'Code', family: 'JetBrains Mono', sample: 'seen[ch] = right', spec: '13/20 · 400, code only' }
      ],
      radius: '22 / 16 / 999',
      contrast: [
        { pair: 'Label on white', ratio: '18.8:1' },
        { pair: 'Secondary on grouped grey', ratio: '6.8:1' },
        { pair: 'Tertiary on white', ratio: '5.5:1' },
        { pair: 'White on green', ratio: '5.2:1' },
        { pair: 'Green text on grey', ratio: '5.8:1' },
        { pair: 'White on record red', ratio: '5.4:1' }
      ]
    },
    init() {
      return {
        role: 'SDE-2, backend', companies: new Set(['Atlassian', 'Razorpay']), minutes: 45,
        rec: { t: 0, on: false, buf: Array(64).fill(.03), hist: [] },
        pb: { pos: 61, playing: false, dur: 222, hist: [] },
        rating: 'Good', savedPat: null, savedRating: 'Good', prob: 'slide', tab: 'problem', remind1: true, remind2: false, iso: true
      };
    },
    render(id, s, ctx) { const R = this.views[id]; return R ? R(s, ctx) : '<div class="rw-scr"></div>'; },

    views: {
      welcome() {
        return `<div class="rw-scr white">
          <div class="rw-wel">
            <div class="rw-wel-hero"><div class="rw-appicon">${wave([.3, .55, .9, .6, 1, .45, .75, .35, .6], '', 4, 3, 44)}</div></div>
            <h2 class="t-large">Say it out loud.<br>Hear it again.</h2>
            <p class="lede">Interview prep that records how you think, then plays it back right before you would forget.</p>
            <ul class="rw-feats">
              <li><span class="rw-ico">${icon.mic}</span><span class="txt"><b>Record</b><span>Talk through each problem the way you would in the room.</span></span></li>
              <li><span class="rw-ico">${icon.star}</span><span class="txt"><b>Rate</b><span>Say how clear it sounded. That sets the next date.</span></span></li>
              <li><span class="rw-ico">${icon.repeat}</span><span class="txt"><b>Rewind</b><span>Hear it again, pattern by pattern, until interview day.</span></span></li>
            </ul>
          </div>
          <div class="rw-dock"><button class="rw-btn" data-go="goal">Get started</button><button class="rw-link" data-go="today" data-dir="reset">I already have an account</button></div>
        </div>`;
      },
      goal(s) {
        const roles = ['SDE-1', 'SDE-2, backend', 'SDE-2, full stack', 'Senior'];
        const cos = ['Atlassian', 'Razorpay', 'Flipkart', 'Google', 'Swiggy', 'Zerodha'];
        const takes = Math.max(1, Math.round(s.minutes / 15)), revs = Math.round(s.minutes / 11);
        return `<div class="rw-scr rw-goal">
          ${nav('')}
          <div class="rw-scroll" data-keep-scroll="goal">
            <h2 class="t-title1">What are you preparing for?</h2>
            <div class="rw-sh"><h3>Role</h3></div>
            <div class="rw-group">${roles.map(r => `<button class="rw-row" data-act="role" data-v="${r}" aria-pressed="${s.role === r}" style="min-height:48px"><span class="grow">${r}</span>${s.role === r ? `<span class="rw-check">${icon.check}</span>` : ''}</button>`).join('')}</div>
            <div class="rw-sh"><h3>Companies</h3><span>Pick any</span></div>
            <div class="rw-group"><div class="rw-chips">${cos.map(c => `<button class="rw-chip" data-act="co" data-v="${c}" aria-pressed="${s.companies.has(c)}">${s.companies.has(c) ? icon.check : ''}${c}</button>`).join('')}</div></div>
            <div class="rw-sh"><h3>Schedule</h3></div>
            <div class="rw-group">
              <div class="rw-row"><span class="grow">First interview</span><span class="rw-date">14 Dec 2026</span></div>
              <div class="rw-row" style="flex-direction:column;align-items:stretch;gap:10px"><span>Minutes a day</span>
                <div class="rw-seg">${[20, 30, 45, 60].map(m => `<button data-act="min" data-v="${m}" aria-pressed="${s.minutes === m}">${m}</button>`).join('')}</div></div>
            </div>
            <p class="rw-foot">${s.minutes} minutes is about ${takes} new take${takes > 1 ? 's' : ''} and ${revs} revisits a day: every pattern ${s.minutes >= 45 ? 'twice' : 'once'} in the ${daysLeft} days before 14 December.</p>
          </div>
          <div class="rw-dock"><button class="rw-btn" data-go="today" data-dir="reset">Build my plan</button></div>
        </div>`;
      },
      today(s) {
        const r = readiness(s);
        const due = [
          { p: 'Sliding window', n: 'Longest Substring Without Repeating Characters', last: 'Last take 8 Oct · rated Hard', act: 'data-act="open" data-v="slide"', done: s.savedPat === 'slide' },
          { p: 'Intervals', n: 'Merge Intervals', last: 'Last take 15 Oct · rated Hard', act: 'data-go="revision"' },
          { p: 'Topological sort', n: 'Course Schedule', last: 'Last take 19 Oct · rated Again', act: 'data-go="revision"' }
        ];
        const left = due.filter(d => !d.done).length;
        return `<div class="rw-scr">
          <div class="rw-scroll top tabs" data-keep-scroll="today">
            <div class="rw-lt"><span class="t-foot">Thursday 22 October</span><h2 class="t-large">Today</h2></div>
            <div class="rw-card rw-ready">
              <div class="rw-ready-top"><div class="l"><div class="rw-big">${r}<small>%</small></div><div class="t-sub sec">ready for SDE-2 interviews</div></div>
                <div class="rw-days"><b>${daysLeft}</b><span class="t-foot sec">days left</span></div></div>
              <div class="rw-bar" role="img" aria-label="${r}% now, on pace for 78% by 14 December"><i style="width:${r}%"></i><span class="mark" style="left:78%"></span></div>
              <div class="rw-legend"><span>Now ${r}%</span><span>On pace for 78% by 14 Dec</span></div>
            </div>
            <div class="rw-stats">
              <div><b>9</b><span>day streak</span></div>
              <div><b>12<span class="t-foot sec">/${s.minutes}</span></b><span>minutes today</span></div>
              <div><b>61</b><span>takes so far</span></div>
            </div>
            <div class="rw-sh"><h3>Due today</h3><span>${left} of 3 left</span></div>
            <div class="rw-group" style="--inset:72px">${due.map((d, i) => `
              <button class="rw-row" ${d.act} style="min-height:76px">
                <span class="rw-tile ${d.done ? 'done' : ''}">${d.done ? icon.check : wave(speech(9, 11 + i), '', 2, 1.6, 22)}</span>
                <span class="grow"><span class="rw-kicker">${d.p}</span><span class="t-headline clamp2">${d.n}</span><span class="t-foot sec">${d.done ? 'Re-recorded today · back Thu 29 Oct' : d.last}</span></span>
                <span class="chev">${icon.chev}</span>
              </button>`).join('')}</div>
            <div class="rw-sh"><h3>New this week</h3></div>
            <div class="rw-group"><button class="rw-row" data-act="open" data-v="trie" style="min-height:64px"><span class="rw-ico grey">${icon.patterns}</span><span class="grow"><span class="t-headline">Tries</span><span class="t-foot sec">Your weakest pattern, at 18%. Start with Implement Trie.</span></span><span class="chev">${icon.chev}</span></button></div>
          </div>
          ${tabbar('today')}
        </div>`;
      },
      patterns(s) {
        const ms = mastery(s), r = readiness(s);
        const groups = [['Strong', p => p.m >= 70, 3], ['Building', p => p.m >= 40 && p.m < 70, 2], ['Needs work', p => p.m < 40, 1]];
        const C = 2 * Math.PI * 32;
        return `<div class="rw-scr">
          <div class="rw-scroll top tabs" data-keep-scroll="pat">
            <div class="rw-lt"><span class="t-foot">43 problems in 12 patterns</span><h2 class="t-large">Patterns</h2></div>
            <div class="rw-card rw-sum">
              <svg class="rw-ring" viewBox="0 0 76 76" role="img" aria-label="${r}% readiness"><circle class="bg" cx="38" cy="38" r="32"/><circle class="fg" cx="38" cy="38" r="32" stroke-dasharray="${(C * r / 100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 38 38)"/><text x="38" y="44" text-anchor="middle">${r}%</text></svg>
              <p>Readiness is the average of your twelve patterns. Each one rises when you explain it well and fades a little every week you leave it.</p>
            </div>
            ${groups.map(([g, f, l]) => `<div class="rw-sh"><h3><span class="rw-lvl l${l}" aria-hidden="true"><i></i><i></i><i></i></span>${g}</h3><span>${ms.filter(f).length} patterns</span></div>
              <div class="rw-group">${ms.filter(f).map(p => `
                <button class="rw-row rw-pat" data-act="open" data-v="${p.id}" aria-label="${p.name}, ${g}, ${p.m}% mastery">
                  <span class="grow"><span class="t-headline clamp1">${p.name}</span><span class="t-foot sec">${p.n} problem${p.n > 1 ? 's' : ''}</span></span>
                  <span class="rw-bar thin"><i class="${barCls(p.m)}" style="width:${p.m}%"></i></span>
                  <span class="pct">${p.m}%</span>
                </button>`).join('')}</div>`).join('')}
          </div>
          ${tabbar('patterns')}
        </div>`;
      },
      problem(s) {
        const tab = s.tab, P = PROBS[s.prob], pat = PAT_OF[s.prob], takes = takesOf(s.prob);
        const body = tab === 'code'
          ? `<pre class="rw-code" aria-label="Your Python solution"><code>${hl(P.code)}</code></pre>
             <div class="rw-kv"><span>Time</span><b>${P.tc}</b><span>Space</span><b>${P.sc}</b><span>Accepted</span><b>${P.acc}</b></div>`
          : tab === 'takes'
            ? (takes.length ? `<div class="rw-group rw-takes" style="--inset:68px">${takes.map(([n, d, l, r, note], i) => `
                <button class="rw-row" data-go="playback" style="min-height:72px"><span class="rw-playmini">${icon.play}</span>
                  <span class="grow"><span class="t-headline">${n} · ${d}</span><span class="t-foot sec clamp1">${l} · rated ${r} · ${note}</span></span>
                  <span class="rw-takewave">${wave(speech(12, 30 + i), '', 2, 2, 24)}</span></button>`).join('')}</div>`
              : `<div class="rw-card" style="margin-top:16px"><span class="t-headline">No takes yet</span><p class="t-sub sec" style="margin:4px 0 0">Explain it once, out loud. Rewind brings it back tomorrow.</p></div>`)
            : `<div class="rw-prob"><p>${P.st}</p>
               ${P.ex.map(([a, b]) => `<div class="rw-ex"><span class="lab">Example</span><code>${esc(a)}</code><code>${esc(b)}</code></div>`).join('')}
               <div class="rw-kv">${P.kv.map(([a, b]) => `<span>${a}</span><b>${b}</b>`).join('')}</div></div>`;
        return `<div class="rw-scr">
          ${nav(pat.name, `<span class="rw-pill ${P.diff === 'Easy' ? 'easy' : ''}">${P.diff}</span>`)}
          <div class="rw-scroll" data-keep-scroll="prob">
            <h2 class="t-title1 rw-probtitle clamp2">${P.t}</h2>
            <div class="rw-meta"><span>LeetCode ${P.lc}</span><span>Asked at ${P.co}</span><span>${pat.m}% mastery</span></div>
            <div class="rw-seg">${[['problem', 'Problem'], ['code', 'My code'], ['takes', 'Takes' + (takes.length ? ' ' + takes.length : '')]].map(([k, n]) => `<button data-act="tab" data-v="${k}" aria-pressed="${tab === k}">${n}</button>`).join('')}</div>
            ${body}
          </div>
          <div class="rw-dock"><button class="rw-btn" data-go="record" data-dir="up">${icon.mic}${takes.length ? 'Record take ' + (takes.length + 1) : 'Record your first take'}</button></div>
        </div>`;
      },
      record(s, ctx) {
        const demo = ctx.static;
        const t = demo ? 84 : s.rec.t, on = demo ? true : s.rec.on;
        const buf = demo ? speech(64, 5) : s.rec.buf;
        const P = PROBS[s.prob], tn = takesOf(s.prob).length + 1;
        const prompts = PROMPTS.map((p, i) => i === 2 ? P.key : p);
        const pi = promptAt(t);
        return `<div class="rw-scr white rw-record ${on ? 'is-on' : ''}">
          <header class="rw-rechead">
            <button class="rw-circ l" data-back aria-label="Cancel" style="background:var(--color-fill);box-shadow:none">${icon.close}</button>
            <span class="rw-state"><span class="rw-dot"></span><span data-rw="state">${on ? 'Recording' : t > 0 ? 'Paused' : 'Ready'}</span></span>
            <button class="rw-textbtn r" data-act="finish" ${t < 1 && !demo ? 'disabled' : ''}>Done</button>
          </header>
          <div class="rw-recbody">
            <div class="rw-rectitle"><span class="t-foot sec">${PAT_OF[s.prob].name} · take ${tn}</span><span class="t-headline clamp2">${P.t}</span></div>
            <div class="rw-timer" data-rw="timer">${mmss(t)}</div>
            <div class="rw-live">${wave(buf, on ? 'rec' : '', 3, 2.2, 140)}</div>
            <div class="rw-prompt" data-rw="prompt" aria-live="polite">
              <div class="top"><span class="t-headline" data-rw="pt">${prompts[pi][0]}</span><span class="rw-pips" aria-label="Prompt ${pi + 1} of 5">${prompts.map((_, i) => `<i class="${i === pi ? 'on' : i < pi ? 'past' : ''}"></i>`).join('')}</span></div>
              <span class="t-sub" data-rw="pd">${prompts[pi][1]}</span>
            </div>
            <div class="rw-holdwrap">
              <button class="rw-hold" data-rw="hold" aria-pressed="${on}" aria-label="Hold to record. Space bar also toggles."><span class="ring" data-rw="ring"></span><span class="core">${icon.mic}</span></button>
              <span class="rw-holdhint" data-rw="hint">${on ? 'Release to pause' : t > 0 ? 'Hold to keep talking' : 'Hold to talk'}</span>
            </div>
          </div>
        </div>`;
      },
      playback(s) {
        const dur = s.pb.dur, pos = s.pb.pos;
        const amps = s.pb.hist.length >= 12 ? downsample(s.pb.hist, 64) : speech(64, 21);
        const P = PROBS[s.prob], tn = takesOf(s.prob).length + 1;
        const ci = chapterAt(pos / dur);
        const nd = addDays(TODAY, RATE[s.rating].days);
        return `<div class="rw-scr">
          ${nav(`Take ${tn} · ${msShort(dur)}`)}
          <div class="rw-scroll" data-keep-scroll="pb">
            <div class="rw-card">
              <span class="t-foot sec">${PAT_OF[s.prob].name}</span>
              <div class="t-headline clamp1">${P.t}</div>
              <div class="rw-scrub" data-rw="scrub" role="slider" tabindex="0" aria-label="Position in your recording" aria-valuemin="0" aria-valuemax="${Math.round(dur)}" aria-valuenow="${Math.round(pos)}" aria-valuetext="${msShort(pos)}">
                ${wave(amps, '', 3, 1.8, 72)}
                <div class="played" data-rw="played" style="clip-path:inset(0 ${(100 - pos / dur * 100).toFixed(2)}% 0 0)">${wave(amps, 'acc', 3, 1.8, 72)}</div>
                <div class="rw-head" data-rw="head" style="left:${(pos / dur * 100).toFixed(2)}%"></div>
              </div>
              <div class="rw-times"><span data-rw="pos">${msShort(pos)}</span><span class="ch" data-rw="chap">${CHAPTERS[ci][1]}</span><span>${msShort(dur)}</span></div>
              <div class="rw-ctrls">
                <button class="rw-ctrl" data-rw="seek" data-v="-15" aria-label="Back 15 seconds">${icon.rew}<span>15</span></button>
                <button class="rw-play" data-rw="playbtn" aria-label="Play">${icon.play}</button>
                <button class="rw-ctrl" data-rw="seek" data-v="15" aria-label="Forward 15 seconds">${icon.fwd}<span>15</span></button>
              </div>
              <p class="rw-quote" data-rw="line">${lineFor(s, ci)}</p>
            </div>
            <div class="rw-sh"><h3>How clear was that?</h3></div>
            <div class="rw-rates">${Object.keys(RATE).map(k => `<button class="rw-rate" data-act="rate" data-v="${k}" aria-pressed="${s.rating === k}"><b>${k}</b><span>${RATE[k].label}</span></button>`).join('')}</div>
            <div class="rw-card" style="margin-top:12px">${calendar(nd)}</div>
          </div>
          <div class="rw-dock"><button class="rw-btn" data-act="save">Save · back ${fmtDay(nd)}</button></div>
        </div>`;
      },
      scheduled(s) {
        const k = s.rating, nd = addDays(TODAY, RATE[k].days);
        const P = PROBS[s.prob], pat = PAT_OF[s.prob], tn = takesOf(s.prob).length + 1;
        const before = pat.m, after = Math.min(100, pat.m + RATE[k].d);
        const sum = PATTERNS.reduce((a, p) => a + p.m, 0);
        const rb = Math.round(sum / 12), ra = Math.round((sum + after - before) / 12);
        return `<div class="rw-scr">
          <div class="rw-scroll top" data-keep-scroll="sch">
            <div class="rw-done">
              <div class="rw-caltile" aria-hidden="true"><span>${DOW[nd.getDay()]}</span><b>${nd.getDate()}</b><em>${MON[nd.getMonth()]}</em></div>
              <h2 class="t-title1">Back ${RATE[k].label.toLowerCase()}</h2>
              <p>You rated take ${tn} <b>${k}</b>. ${P.short} returns on ${fmtDay(nd)}, just before you would start to forget it.</p>
            </div>
            <div class="rw-card" style="margin-top:24px">
              <div class="rw-delta"><div class="top"><span class="t-headline">${pat.name}</span><span><s>${before}%</s><b>${after}%</b></span></div><div class="rw-bar thin"><i class="${barCls(after)}" style="width:${after}%"></i></div></div>
              <div class="rw-delta"><div class="top"><span class="t-headline">Readiness</span><span><s>${rb}%</s><b>${ra}%</b></span></div><div class="rw-bar thin"><i style="width:${ra}%"></i></div></div>
            </div>
            <div class="rw-note good"><b>${tn > 1 ? 'Better than take ' + (tn - 1) : 'First take saved'}</b>${P.better || (tn > 1 ? `You answered "${P.key[0].toLowerCase()}" out loud this time, and named the cost: ${P.tc} time, ${P.sc} space.` : 'Rewind plays it back tomorrow. Next time, open with the brute force and its cost.')}</div>
          </div>
          <div class="rw-dock two"><button class="rw-btn plain" data-go="today" data-dir="reset">Done</button><button class="rw-btn" data-go="revision">Next revision</button></div>
        </div>`;
      },
      revision() {
        return `<div class="rw-scr">
          ${nav('Revision 2 of 3')}
          <div class="rw-scroll" data-keep-scroll="rev">
            <span class="rw-kicker">Intervals</span>
            <h2 class="t-title1" style="margin:2px 0 6px">Merge Intervals</h2>
            <p class="t-sub sec" style="margin:0 0 18px">Last explained 15 Oct in 3:48, rated Hard. Listen first, then say it again without it.</p>
            <div class="rw-card"><div class="rw-step"><span class="rw-stepn ok">${icon.check}</span><div class="rw-stepb">
              <span class="t-headline">Listen to take 1</span>
              <div class="rw-player"><button class="rw-playmini" data-act="noop" aria-label="Play take 1">${icon.play}</button>${wave(speech(40, 51), '', 2, 2, 28)}<span class="t-foot sec num">3:48</span></div>
              <ul class="rw-bul"><li>Sort by start time</li><li>Merge while start ≤ the last end</li><li>O(n log n), for the sort</li></ul>
              <div class="rw-note" style="margin-top:0"><b>What you missed</b>Why sorting is needed at all. Say what breaks without it.</div>
            </div></div></div>
            <div class="rw-card"><div class="rw-step"><span class="rw-stepn">2</span><div class="rw-stepb">
              <span class="t-headline">Explain it again</span>
              <span class="t-sub sec">Two minutes is enough. Start from the input.</span>
              <button class="rw-btn sm" data-act="recfor" data-v="int">${icon.mic}Record take 2</button>
            </div></div></div>
          </div>
          <div class="rw-dock two"><button class="rw-btn plain" data-go="today" data-dir="reset">Later</button><button class="rw-btn" data-go="empty" data-dir="fade">Mark revised</button></div>
        </div>`;
      },
      empty() {
        const back = [['Kth Largest Element in an Array', 'Heap'], ['Course Schedule', 'Topological sort'], ['Binary Tree Level Order Traversal', 'Trees'], ['Search in Rotated Sorted Array', 'Binary search']];
        return `<div class="rw-scr">
          <div class="rw-scroll top" data-keep-scroll="emp">
            <div class="rw-empty-hero"><div class="rw-bigcheck">${icon.check}</div>
              <h2 class="t-title1">Nothing to rewind today</h2>
              <p>All three revisions are done and your streak is now 10 days. Four takes come back tomorrow.</p></div>
            <div class="rw-sh"><h3>Back tomorrow</h3><span>Fri 23 Oct</span></div>
            <div class="rw-group">${back.map(([n, p]) => `<div class="rw-row" style="min-height:60px"><span class="grow"><span class="t-headline clamp1">${n}</span><span class="t-foot sec">${p}</span></span></div>`).join('')}</div>
          </div>
          <div class="rw-dock two"><button class="rw-btn plain" data-go="report" data-dir="fade">Readiness</button><button class="rw-btn" data-act="open" data-v="trie">Start Tries</button></div>
        </div>`;
      },
      report(s) {
        const r = readiness(s);
        const pts = [[0, 22, '1 Sep'], [1, 31, '15 Sep'], [2, 39, '1 Oct'], [3, 46, '15 Oct'], [3.47, r, 'Today']];
        const X = i => 30 + i * 40, Y = v => 140 - v * 1.4;
        const path = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' ');
        return `<div class="rw-scr">
          <div class="rw-scroll top tabs" data-keep-scroll="rep">
            <div class="rw-lt"><span class="t-foot">Week of 19 October</span><h2 class="t-large">Readiness</h2></div>
            <div class="rw-card">
              <div class="rw-big">${r}<small>%</small></div>
              <div class="t-sub sec">ready today, on pace for 78% by Mon 14 Dec</div>
              <div class="rw-chart"><svg viewBox="0 0 320 168" role="img" aria-label="Readiness rose from 22% on 1 September to ${r}% today, projected 78% on 14 December">
                ${[25, 50, 75].map(v => `<line x1="30" x2="316" y1="${Y(v)}" y2="${Y(v)}" class="grid"/><text x="0" y="${Y(v) + 4}" class="axis">${v}%</text>`).join('')}
                <path d="${path} L${X(3.47)} 140 L30 140Z" class="area"/>
                <path d="${path}" class="line"/>
                <path d="M${X(3.47)} ${Y(r)} L${X(7)} ${Y(78)}" class="proj"/>
                <circle cx="${X(3.47)}" cy="${Y(r)}" r="6" class="dot"/><circle cx="${X(7)}" cy="${Y(78)}" r="5" class="dotp"/>
                <text x="${X(7)}" y="${Y(78) - 12}" class="axis" text-anchor="end">78% · 14 Dec</text>
                ${[pts[0], pts[2], pts[3]].map(p => `<text x="${X(p[0])}" y="162" class="axis" text-anchor="${p[0] ? 'middle' : 'start'}">${p[2]}</text>`).join('')}
                <text x="${X(3.47) + 8}" y="162" class="axis">Today</text>
              </svg></div>
            </div>
            <div class="rw-sh"><h3>Fix these next</h3><span>Lowest mastery</span></div>
            <div class="rw-group" style="--inset:80px">${[['Tries', 18, 'Not explained yet. Start with Implement Trie.', 'trie'], ['Backtracking', 25, 'You code it fine but skip the pruning reason.', 'back'], ['Topological sort', 30, 'Course Schedule rated Again twice.', 'topo']].map(([n, m, t, id]) => `
              <button class="rw-row" data-act="open" data-v="${id}" style="min-height:68px"><span class="rw-fixpct">${m}%</span><span class="grow"><span class="t-headline">${n}</span><span class="t-foot sec">${t}</span></span><span class="chev">${icon.chev}</span></button>`).join('')}</div>
            <div class="rw-sh"><h3>How you explain</h3></div>
            <div class="rw-grid2">
              <div><b>3:48</b><span>average take</span></div>
              <div><b>71%</b><span>of takes name the complexity</span></div>
              <div><b>3 h 52 m</b><span>talked across 61 takes</span></div>
              <div><b>43</b><span>problems recorded</span></div>
            </div>
          </div>
          ${tabbar('report')}
        </div>`;
      },
      settings(s) {
        const tog = (k, label) => `<button class="rw-tog" role="switch" aria-checked="${!!s[k]}" aria-label="${label}" data-act="tog" data-v="${k}"></button>`;
        return `<div class="rw-scr">
          <div class="rw-scroll top tabs" data-keep-scroll="set">
            <div class="rw-lt"><h2 class="t-large">Settings</h2></div>
            <div class="rw-group"><div class="rw-row" style="min-height:76px"><span class="rw-avatar">GR</span><span class="grow"><span class="t-headline">Gajanan Rathod</span><span class="t-foot sec">SDE-2, backend · 14 Dec 2026</span></span></div></div>
            <div class="rw-sh"><h3>Reminders</h3></div>
            <div class="rw-group" style="--inset:60px">
              <div class="rw-row"><span class="rw-ico">${icon.bell}</span><span class="grow"><span>Evening session</span><span class="t-foot sec">8:30 pm, after the ORR traffic</span></span>${tog('remind1', 'Evening session reminder')}</div>
              <div class="rw-row"><span class="rw-ico">${icon.train}</span><span class="grow"><span>Listen on the Metro</span><span class="t-foot sec">8:10 am, playback only</span></span>${tog('remind2', 'Morning Metro reminder')}</div>
            </div>
            <div class="rw-sh"><h3>Plan</h3></div>
            <div class="rw-group">
              <button class="rw-row" data-go="goal"><span class="grow">Interview date</span><span class="val">14 Dec</span><span class="chev">${icon.chev}</span></button>
              <button class="rw-row" data-go="goal"><span class="grow">Daily goal</span><span class="val">${s.minutes} min</span><span class="chev">${icon.chev}</span></button>
              <button class="rw-row" data-go="goal"><span class="grow">Role</span><span class="val">SDE-2</span><span class="chev">${icon.chev}</span></button>
            </div>
            <div class="rw-sh"><h3>Recording</h3></div>
            <div class="rw-group" style="--inset:60px">
              <div class="rw-row"><span class="rw-ico grey">${icon.wave}</span><span class="grow"><span>Voice isolation</span><span class="t-foot sec">Removes fan and traffic noise</span></span>${tog('iso', 'Voice isolation')}</div>
              <div class="rw-row"><span class="rw-ico grey">${icon.disk}</span><span class="grow"><span>Storage</span><span class="t-foot sec">61 takes · 212 MB on this iPhone</span></span></div>
              <button class="rw-row" data-act="export"><span class="rw-ico grey">${icon.export}</span><span class="grow"><span>Export all takes</span><span class="t-foot sec">As .m4a with a transcript each</span></span><span class="chev">${icon.chev}</span></button>
            </div>
            <p class="rw-foot">Takes never leave your phone unless you export them.</p>
          </div>
          ${tabbar('settings')}
        </div>`;
      }
    },

    action(name, v, s, ctx) {
      switch (name) {
        case 'role': s.role = v; break;
        case 'co': s.companies.has(v) ? s.companies.delete(v) : s.companies.add(v); break;
        case 'min': s.minutes = +v; break;
        case 'tab': s.tab = v; break;
        case 'open': s.prob = v; s.tab = 'problem'; ctx.go('problem'); return false;
        case 'recfor': s.prob = v; ctx.go('record', 'up'); return false;
        case 'rate': s.rating = v; break;
        case 'save': s.savedPat = s.prob; s.savedRating = s.rating; s.pb.playing = false; ctx.go('scheduled'); return false;
        case 'finish': {
          s.rec.on = false; s.pb.playing = false;
          if (s.rec.t >= 1) { s.pb.dur = Math.max(5, s.rec.t); s.pb.pos = 0; s.pb.hist = s.rec.hist.slice(); }
          s.rec = { t: 0, on: false, buf: Array(64).fill(.03), hist: [] };
          ctx.go('playback'); return false;
        }
        case 'tog': s[v] = !s[v]; break;
        case 'export': ctx.toast('61 takes ready to share'); return false;
        case 'noop': ctx.toast('Playing take 1'); return false;
      }
    },

    mount(root, s, ctx, id) {
      if (id === 'record') return mountRecord(root, s, ctx);
      if (id === 'playback') return mountPlayback(root, s, ctx);
    }
  };

  function chapterAt(f) { let i = 0; CHAPTERS.forEach((c, k) => { if (f >= c[0]) i = k; }); return i; }
  function downsample(a, n) { const out = []; const k = a.length / n; for (let i = 0; i < n; i++) { let m = 0; for (let j = Math.floor(i * k); j < Math.max(Math.floor(i * k) + 1, Math.floor((i + 1) * k)); j++) m = Math.max(m, a[j] || 0); out.push(m); } return out; }
  function calendar(nd) {
    const start = new Date(2026, 9, 19);
    const due = { 23: 1, 25: 1, 27: 1, 30: 1, 2: 1, 5: 1, 6: 1 };
    let cells = '';
    for (let i = 0; i < 21; i++) {
      const d = addDays(start, i), key = d.getDate();
      const isT = +d === +TODAY, isN = +d === +nd, past = d < TODAY;
      const dot = !past && !isN && due[key];
      cells += `<div class="rw-cd ${isT ? 'today' : ''} ${isN ? 'next' : ''} ${past ? 'past' : ''}"><span>${key}</span>${dot ? '<i></i>' : ''}</div>`;
    }
    return `<div class="rw-cal" aria-label="Next revisit ${fmtDay(nd)}">
      <div class="rw-calhead"><span class="t-headline">Oct – Nov</span><span class="t-foot sec">Dots are other takes due</span></div>
      <div class="rw-calgrid">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<div class="h">${x}</div>`).join('')}${cells}</div></div>`;
  }

  function mountRecord(root, s) {
    const q = k => root.querySelector(`[data-rw="${k}"]`);
    const hold = q('hold'), timer = q('timer'), hint = q('hint'), stateEl = q('state'), ring = q('ring'), pt = q('pt'), pd = q('pd');
    const scr = root.querySelector('.rw-record');
    const svg = root.querySelector('.rw-live svg');
    const rects = [...svg.querySelectorAll('rect')];
    const pips = [...root.querySelectorAll('.rw-pips i')];
    const done = root.querySelector('[data-act="finish"]');
    const P = PROBS[s.prob];
    const prompts = PROMPTS.map((p, i) => i === 2 ? P.key : p);
    const H = 140;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf, last = performance.now(), acc = 0, amp = 0, phase = 0, breath = 0, seed = 97, lastPrompt = promptAt(s.rec.t);
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const setOn = on => {
      if (s.rec.on === on) return;
      s.rec.on = on;
      scr.classList.toggle('is-on', on);
      svg.classList.toggle('rec', on);
      hold.setAttribute('aria-pressed', on);
      stateEl.textContent = on ? 'Recording' : s.rec.t > 0 ? 'Paused' : 'Ready';
      hint.textContent = on ? 'Release to pause' : 'Hold to keep talking';
      if (done) done.disabled = !(s.rec.t >= 1 || on);
      if (navigator.vibrate) try { navigator.vibrate(on ? 12 : 6); } catch (e) {}
    };
    const down = e => { e.preventDefault(); try { hold.setPointerCapture(e.pointerId); } catch (_) {} setOn(true); };
    const up = () => setOn(false);
    hold.addEventListener('pointerdown', down);
    hold.addEventListener('pointerup', up);
    hold.addEventListener('pointercancel', up);
    hold.addEventListener('lostpointercapture', up);
    hold.addEventListener('contextmenu', e => e.preventDefault());
    hold.addEventListener('keydown', e => { if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); setOn(!s.rec.on); } });
    const loop = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (s.rec.on) {
        s.rec.t += dt; phase += dt * (9 + rnd() * 4);
        if (breath > 0) { breath -= dt; amp += (.04 - amp) * .3; }
        else { if (rnd() < dt * .45) breath = .25 + rnd() * .45; const target = .25 + .75 * Math.abs(Math.sin(phase)) * (.55 + rnd() * .45); amp += (target - amp) * .45; }
      } else amp += (0 - amp) * .2;
      acc += dt;
      if (acc > .07) {
        acc = 0;
        const v = s.rec.on ? amp : .03;
        if (s.rec.on || s.rec.buf[s.rec.buf.length - 1] > .031) { s.rec.buf.push(v); s.rec.buf.shift(); }
        if (s.rec.on) s.rec.hist.push(v);
        rects.forEach((r, i) => { const bh = Math.max(3, s.rec.buf[i] * H); r.setAttribute('height', bh.toFixed(1)); r.setAttribute('y', ((H - bh) / 2).toFixed(1)); });
        timer.textContent = mmss(s.rec.t);
        const pi = promptAt(s.rec.t);
        if (pi !== lastPrompt) { lastPrompt = pi; pt.textContent = prompts[pi][0]; pd.textContent = prompts[pi][1]; pips.forEach((p, i) => { p.className = i === pi ? 'on' : i < pi ? 'past' : ''; }); }
      }
      ring.style.transform = `scale(${(1 + amp * (reduce ? .04 : .28)).toFixed(3)})`;
      ring.style.opacity = s.rec.on ? (.12 + amp * .3).toFixed(2) : 0;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); s.rec.on = false; };
  }

  function mountPlayback(root, s) {
    const q = k => root.querySelector(`[data-rw="${k}"]`);
    const scrub = q('scrub'), played = q('played'), head = q('head'), posEl = q('pos'), chap = q('chap'), line = q('line'), btn = q('playbtn');
    const dur = s.pb.dur;
    let raf, last = performance.now(), dragging = false, lastCi = -1;
    const paint = () => {
      const f = s.pb.pos / dur;
      played.style.clipPath = `inset(0 ${(100 - f * 100).toFixed(2)}% 0 0)`; head.style.left = (f * 100).toFixed(2) + '%';
      posEl.textContent = msShort(s.pb.pos);
      scrub.setAttribute('aria-valuenow', Math.round(s.pb.pos)); scrub.setAttribute('aria-valuetext', msShort(s.pb.pos));
      const ci = chapterAt(f);
      if (ci !== lastCi) { lastCi = ci; chap.textContent = CHAPTERS[ci][1]; line.textContent = lineFor(s, ci); }
    };
    const setPlay = p => { s.pb.playing = p; btn.innerHTML = p ? icon.pause : icon.play; btn.setAttribute('aria-label', p ? 'Pause' : 'Play'); };
    setPlay(s.pb.playing);
    root.querySelectorAll('[data-rw="seek"]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); s.pb.pos = Math.min(dur, Math.max(0, s.pb.pos + (+b.dataset.v))); paint(); }));
    btn.addEventListener('click', e => { e.stopPropagation(); if (s.pb.pos >= dur) s.pb.pos = 0; setPlay(!s.pb.playing); });
    const toPos = x => { const r = scrub.getBoundingClientRect(); return Math.min(1, Math.max(0, (x - r.left) / r.width)) * dur; };
    const move = e => { if (!dragging) return; s.pb.pos = toPos(e.clientX); paint(); };
    const down = e => { dragging = true; try { scrub.setPointerCapture(e.pointerId); } catch (_) {} move(e); };
    const up = () => { dragging = false; };
    scrub.addEventListener('pointerdown', down);
    scrub.addEventListener('pointermove', move);
    scrub.addEventListener('pointerup', up);
    scrub.addEventListener('pointercancel', up);
    scrub.addEventListener('keydown', e => {
      const k = { ArrowLeft: -5, ArrowRight: 5, Home: -1e9, End: 1e9 }[e.key];
      if (k == null) return; e.preventDefault();
      s.pb.pos = Math.min(dur, Math.max(0, s.pb.pos + k)); paint();
    });
    const loop = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (s.pb.playing && !dragging) { s.pb.pos = Math.min(dur, s.pb.pos + dt); if (s.pb.pos >= dur) setPlay(false); paint(); }
      raf = requestAnimationFrame(loop);
    };
    paint();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }

  (window.APPS = window.APPS || {})[app.id] = app;
})();
