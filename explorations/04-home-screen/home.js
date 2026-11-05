const posts = [
  {
    author: "Maya R.",
    location: "The Brickyard",
    initials: "MR",
    avatar: "lilac",
    text: "Someone brought a tiny dog to the Brickyard and it has completely improved my Tuesday.",
  },
  {
    author: "Jordan L.",
    location: "Hunt Library",
    initials: "JL",
    avatar: "blue",
    text: "Found a quiet spot on the fourth floor and accidentally got three hours of studying done. A campus miracle.",
  },
  {
    author: "Chris W.",
    location: "Talley Student Union",
    initials: "CW",
    avatar: "peach",
    text: "The line at Talley was moving so slowly I finished an entire podcast episode before ordering lunch.",
  },
  {
    author: "Avery T.",
    location: "Carter-Finley Stadium",
    initials: "AT",
    avatar: "mint",
    text: "Game day tip: bring a water bottle and agree on a meetup spot before the crowd gets loud. Go Pack!",
  },
  {
    author: "Sam P.",
    location: "Court of North Carolina",
    initials: "SP",
    avatar: "rose",
    text: "Taking the long way across campus because the trees look especially nice this morning.",
  },
];

const icons = {
  comment: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6a7.5 7.5 0 1 1 17-3.5Z"/></svg>',
  share: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 15V3m0 0L7 8m5-5 5 5"/><path d="M5 13v7h14v-7"/></svg>',
};

function makeAction(icon, label, accessibleName) {
  const button = document.createElement("button");
  button.className = "post-action";
  button.type = "button";
  button.setAttribute("aria-label", accessibleName);
  button.innerHTML = `${icons[icon]}<span>${label}</span>`;
  return button;
}

function makePost(post) {
  const article = document.createElement("article");
  article.className = "post-card";
  const header = document.createElement("header");
  header.className = "post-header";
  const avatar = document.createElement("span");
  avatar.className = `profile-picture avatar-${post.avatar}`;
  avatar.setAttribute("aria-label", `${post.author} profile picture`);
  avatar.textContent = post.initials;

  const authorBlock = document.createElement("div");
  const author = document.createElement("p");
  author.className = "post-author";
  author.textContent = post.author;
  const meta = document.createElement("p");
  meta.className = "post-meta";
  meta.textContent = post.location;
  authorBlock.append(author, meta);
  header.append(avatar, authorBlock);

  const copy = document.createElement("p");
  copy.className = "post-copy";
  copy.textContent = post.text;
  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.append(
    makeAction("comment", "Comment", `Comment on ${post.author}'s post`),
    makeAction("share", "Share", `Share ${post.author}'s post`),
  );
  article.append(header, copy, actions);
  return article;
}

const list = document.querySelector("#post-list");
const emptyState = document.querySelector("#empty-state");
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applySystemColorScheme() {
  document.documentElement.dataset.theme = colorScheme.matches ? "dark" : "light";
}

applySystemColorScheme();
colorScheme.addEventListener("change", applySystemColorScheme);

export function renderPosts(postItems) {
  list.replaceChildren();
  for (const post of postItems) list.append(makePost(post));
  emptyState.hidden = postItems.length > 0;
}

renderPosts(posts);
