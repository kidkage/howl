const posts = [
  {
    name: "Maya R.",
    handle: "@mayar",
    place: "The Brickyard",
    time: "2m",
    text: "Someone brought a tiny dog to the Brickyard and it has completely improved my Tuesday.",
    replies: 12,
    reposts: 4,
  },
  {
    name: "Jordan L.",
    handle: "@jordanl",
    place: "Hunt Library",
    time: "8m",
    text: "Found a quiet spot on the fourth floor and accidentally got three hours of studying done. A campus miracle.",
    replies: 8,
    reposts: 2,
  },
  {
    name: "Chris W.",
    handle: "@chrisw",
    place: "Talley Student Union",
    time: "16m",
    text: "The line at Talley was moving so slowly I finished an entire podcast episode before ordering lunch.",
    replies: 5,
    reposts: 1,
  },
  {
    name: "Avery T.",
    handle: "@averyt",
    place: "Carter-Finley Stadium",
    time: "24m",
    text: "Game day tip: bring a water bottle and agree on a meetup spot before the crowd gets loud. Go Pack!",
    replies: 21,
    reposts: 9,
  },
  {
    name: "Sam P.",
    handle: "@samp",
    place: "Court of North Carolina",
    time: "31m",
    text: "Taking the long way across campus because the trees look especially nice this morning.",
    replies: 3,
    reposts: 1,
  },
  {
    name: "Leah B.",
    handle: "@leahb",
    place: "Witherspoon Student Center",
    time: "39m",
    text: "Made it through my presentation without saying 'um' nearly as many times as I expected.",
    replies: 14,
    reposts: 3,
  },
  {
    name: "Noah G.",
    handle: "@noahg",
    place: "Wolfline, Route 30",
    time: "45m",
    text: "Shoutout to the bus driver who waited while I sprinted across the lot. You saved my 8:30.",
    replies: 6,
    reposts: 2,
  },
  {
    name: "Taylor C.",
    handle: "@taylorc",
    place: "DH Hill Jr. Library",
    time: "52m",
    text: "The book I needed was actually on the shelf, exactly where the catalog said it would be. Small wins.",
    replies: 4,
    reposts: 1,
  },
  {
    name: "Morgan D.",
    handle: "@morgand",
    place: "Pullen Park",
    time: "1h",
    text: "Walked over to Pullen after class and saw the ducks having what looked like a very important meeting.",
    replies: 11,
    reposts: 2,
  },
  {
    name: "Eli F.",
    handle: "@elif",
    place: "The Brickyard",
    time: "1h",
    text: "Free stickers on the Brickyard table today. I took one and now my laptop has a new personality.",
    replies: 7,
    reposts: 3,
  },
  {
    name: "Riley K.",
    handle: "@rileyk",
    place: "Carmichael Gym",
    time: "1h",
    text: "Went to Carmichael between classes and there was actually an open treadmill. Keeping this energy all week.",
    replies: 2,
    reposts: 0,
  },
  {
    name: "Casey M.",
    handle: "@caseym",
    place: "Talley Student Union",
    time: "2h",
    text: "I came to Talley for a quick coffee and ran into three people from three different classes. This campus is a small world.",
    replies: 16,
    reposts: 5,
  },
  {
    name: "Devon S.",
    handle: "@devons",
    place: "Carter-Finley Stadium",
    time: "2h",
    text: "The walk toward Carter-Finley with everyone in red and white is one of my favorite parts of game day. We left early enough to take the long route with our friends, grabbed snacks before heading in, and found our seats just as the band started playing. Even when the score gets stressful, the whole stadium feels like one big group cheering together. I always forget how loud it gets until the first big play, then suddenly I'm hoarse before halftime. If you're going this weekend, check the weather, bring layers, and pick a place to meet after the game in case your group gets separated. Hope to see a sea of red in the stands—go Pack!",
    replies: 38,
    reposts: 12,
  },
  {
    name: "Jamie N.",
    handle: "@jamien",
    place: "Hunt Library",
    time: "3h",
    text: "The bookBot is still the coolest thing on campus. I checked out a novel and a textbook in one trip.",
    replies: 9,
    reposts: 4,
  },
  {
    name: "Alex P.",
    handle: "@alexp",
    place: "",
    time: "3h",
    text: "Finally submitted the assignment I've been thinking about all week. Going outside for a bit to celebrate.",
    replies: 17,
    reposts: 6,
  },
];

const directions = {
  a: {
    letter: "A",
    name: "Rally Call",
    headline: "A little loud. A lot of us.",
    note: "A quick, open feed with small bright story circles and one punchy wordmark; the white canvas keeps the campus chatter easy to scan.",
    tabs: ["For you", "Following", "Game day"],
    rightTitle: "Around campus",
    rightText: "The Brickyard · Hunt Library · Talley",
  },
  b: {
    letter: "B",
    name: "Open Mic",
    headline: "Say what happened.",
    note: "A generous white reading column sits inside a quiet slate desktop shell, keeping the focus on student voices and small interactions.",
    tabs: ["For you", "Following", "Nearby"],
    rightTitle: "Your campus, today",
    rightText: "A place for the little moments between classes.",
  },
  c: {
    letter: "C",
    name: "Night Shift",
    headline: "The day, in real time.",
    note: "A compact black feed gives every update a fast rhythm, with subdued handles and a narrow center column that stays readable.",
    tabs: ["Live", "Following", "Game day"],
    rightTitle: "On the feed",
    rightText: "Quick notes from all over NC State.",
  },
};

const activeDirection = document.documentElement.dataset.direction;
const direction = directions[activeDirection];
const app = document.querySelector("#app");

function makeAvatar(name, index) {
  const avatar = document.createElement("span");
  avatar.className = `avatar avatar-${(index % 5) + 1}`;
  avatar.setAttribute("aria-label", `${name} avatar`);
  avatar.textContent = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return avatar;
}

function makePost(post, index) {
  const article = document.createElement("article");
  article.className = "post";
  article.append(makeAvatar(post.name, index));

  const content = document.createElement("div");
  content.className = "post-content";

  const meta = document.createElement("p");
  meta.className = "post-meta";

  const author = document.createElement("strong");
  author.textContent = post.name;
  const handle = document.createElement("span");
  handle.textContent = post.handle;
  const time = document.createElement("span");
  time.textContent = post.time;
  meta.append(author, handle, time);

  const message = document.createElement("p");
  message.className = "post-text";
  message.textContent = post.text;

  const details = document.createElement("p");
  details.className = "post-place";
  details.textContent = post.place ? `At ${post.place}` : "Campus life";

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.setAttribute("aria-label", "Post activity");
  for (const [label, value] of [
    ["Reply", post.replies],
    ["Repost", post.reposts],
    ["Like", index * 7 + 4],
  ]) {
    const action = document.createElement("span");
    action.textContent = `${label} ${value}`;
    actions.append(action);
  }

  content.append(meta, message, details, actions);
  article.append(content);
  return article;
}

function makeRail() {
  const rail = document.createElement("aside");
  rail.className = "left-rail";
  const brand = document.createElement("a");
  brand.className = "brand";
  brand.href = "./overview.html";
  brand.textContent = "Howl";
  brand.setAttribute("aria-label", "Howl explorations overview");

  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Main navigation");
  for (const item of ["Home", "Search", "Notifications", "Messages", "Profile"]) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = item;
    nav.append(link);
  }
  rail.append(brand, nav);
  return rail;
}

function renderDirection() {
  document.body.className = `theme-${activeDirection}`;

  const shell = document.createElement("div");
  shell.className = "app-shell";
  const rail = makeRail();

  const main = document.createElement("main");
  main.className = "feed-column";
  main.id = "main";

  const top = document.createElement("header");
  top.className = "feed-top";
  const title = document.createElement("h1");
  title.innerHTML = `<span>Howl</span><small>${direction.letter} / ${direction.name}</small>`;
  const compose = document.createElement("button");
  compose.className = "compose-button";
  compose.type = "button";
  compose.textContent = "Write a post";
  top.append(title, compose);

  const intro = document.createElement("p");
  intro.className = "feed-intro";
  intro.textContent = direction.headline;

  const tabList = document.createElement("nav");
  tabList.className = "feed-tabs";
  tabList.setAttribute("aria-label", "Feed");
  for (const [index, tab] of direction.tabs.entries()) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = tab;
    if (index === 0) link.setAttribute("aria-current", "page");
    tabList.append(link);
  }

  const storyList = document.createElement("div");
  storyList.className = "story-list";
  storyList.setAttribute("aria-label", "People to catch up with");
  for (const [index, post] of posts.slice(0, 5).entries()) {
    const story = document.createElement("div");
    story.className = "story";
    story.append(makeAvatar(post.name, index));
    const name = document.createElement("span");
    name.textContent = post.name.split(" ")[0];
    story.append(name);
    storyList.append(story);
  }

  const feed = document.createElement("section");
  feed.className = "post-list";
  feed.setAttribute("aria-label", "Campus posts");
  for (const [index, post] of posts.entries()) {
    feed.append(makePost(post, index));
  }
  top.append(title, compose);
  main.append(top, intro, tabList, storyList, feed);

  const right = document.createElement("aside");
  right.className = "right-rail";
  const rightTitle = document.createElement("h2");
  rightTitle.textContent = direction.rightTitle;
  const rightText = document.createElement("p");
  rightText.textContent = direction.rightText;
  const directionLink = document.createElement("a");
  directionLink.href = "./overview.html";
  directionLink.textContent = "Compare directions";
  right.append(rightTitle, rightText, directionLink);

  const mobileBar = document.createElement("nav");
  mobileBar.className = "mobile-nav";
  mobileBar.setAttribute("aria-label", "Mobile navigation");
  for (const item of ["Home", "Search", "Write", "Activity", "Profile"]) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = item;
    mobileBar.append(link);
  }

  shell.append(rail, main, right, mobileBar);
  app.append(shell);
}

function renderOverview() {
  document.body.className = "theme-overview";
  const main = document.createElement("main");
  main.className = "overview";
  main.innerHTML = `
    <header class="overview-header">
      <a class="brand" href="../../">Howl</a>
      <p>Round 01 · Three ways into the feed</p>
      <h1>Same campus. Three different rhythms.</h1>
    </header>
    <section class="plan-list" aria-label="Direction plans">
      <article><h2>A · Rally Call</h2><p>Instagram phone + Threads phone · White, black, and #c014ff · Impact</p><p>A little loud. A lot of us.</p></article>
      <article><h2>B · Open Mic</h2><p>Threads desktop + Bluesky desktop · Slate, white, and #c014ff · Georgia</p><p>Say what happened.</p></article>
      <article><h2>C · Night Shift</h2><p>X phone + Tumblr desktop · Black, white, and #c014ff · Trebuchet MS</p><p>The day, in real time.</p></article>
    </section>
    <section class="preview-list" aria-label="Phone and laptop previews"></section>
    <p class="review-note">Explorations only. The Howl app stays untouched.</p>
  `;
  const previewList = main.querySelector(".preview-list");
  for (const [key, item] of Object.entries(directions)) {
    const row = document.createElement("article");
    row.className = `preview-row preview-${key}`;
    const summary = document.createElement("div");
    summary.className = "preview-summary";
    const heading = document.createElement("h2");
    heading.textContent = `${item.letter} · ${item.name}`;
    const note = document.createElement("p");
    note.textContent = item.note;
    const links = document.createElement("p");
    links.className = "preview-links";
    links.innerHTML = `<a href="./${key}.html">Open ${item.letter} page</a>`;
    summary.append(heading, note, links);

    const previews = document.createElement("div");
    previews.className = "previews";
    for (const [label, width, height, scale] of [
      ["Phone", 390, 844, 0.34],
      ["Laptop", 1440, 900, 0.27],
    ]) {
      const frame = document.createElement("div");
      frame.className = `preview-frame preview-frame-${label.toLowerCase()}`;
      const caption = document.createElement("span");
      caption.className = "preview-caption";
      caption.textContent = label;
      const viewport = document.createElement("div");
      viewport.className = "preview-viewport";
      viewport.style.width = `${width * scale}px`;
      viewport.style.height = `${height * scale}px`;
      const iframe = document.createElement("iframe");
      iframe.title = `${item.name} at ${label.toLowerCase()} size`;
      iframe.src = `./${key}.html`;
      iframe.width = width;
      iframe.height = height;
      iframe.loading = "lazy";
      iframe.style.transform = `scale(${scale})`;
      viewport.append(iframe);
      frame.append(caption, viewport);
      previews.append(frame);
    }
    row.append(summary, previews);
    previewList.append(row);
  }
  app.append(main);
}

if (activeDirection === "overview") {
  renderOverview();
} else if (direction) {
  renderDirection();
}
