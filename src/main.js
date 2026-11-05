import "./style.css";

const posts = [
  {
    author: "Maya R.",
    location: "The Brickyard",
    text: "Someone brought a tiny dog to the Brickyard and it has completely improved my Tuesday.",
  },
  {
    author: "Jordan L.",
    location: "Hunt Library",
    text: "Found a quiet spot on the fourth floor and accidentally got three hours of studying done. A campus miracle.",
  },
  {
    author: "Chris W.",
    location: "Talley Student Union",
    text: "The line at Talley was moving so slowly I finished an entire podcast episode before ordering lunch.",
  },
  {
    author: "Avery T.",
    location: "Carter-Finley Stadium",
    text: "Game day tip: bring a water bottle and agree on a meetup spot before the crowd gets loud. Go Pack!",
  },
  {
    author: "Sam P.",
    location: "Court of North Carolina",
    text: "Taking the long way across campus because the trees look especially nice this morning.",
  },
  {
    author: "Leah B.",
    location: "Witherspoon Student Center",
    text: "Made it through my presentation without saying 'um' nearly as many times as I expected.",
  },
  {
    author: "Noah G.",
    location: "Wolfline, Route 30",
    text: "Shoutout to the bus driver who waited while I sprinted across the lot. You saved my 8:30.",
  },
  {
    author: "Taylor C.",
    location: "DH Hill Jr. Library",
    text: "The book I needed was actually on the shelf, exactly where the catalog said it would be. Small wins.",
  },
  {
    author: "Morgan D.",
    location: "Pullen Park",
    text: "Walked over to Pullen after class and saw the ducks having what looked like a very important meeting.",
  },
  {
    author: "Eli F.",
    location: "The Brickyard",
    text: "Free stickers on the Brickyard table today. I took one and now my laptop has a new personality.",
  },
  {
    author: "Riley K.",
    location: "Carmichael Gym",
    text: "Went to Carmichael between classes and there was actually an open treadmill. Keeping this energy all week.",
  },
  {
    author: "Casey M.",
    location: "Talley Student Union",
    text: "I came to Talley for a quick coffee and ran into three people from three different classes. This campus is a small world.",
  },
  {
    author: "Devon S.",
    location: "Carter-Finley Stadium",
    text: "The walk toward Carter-Finley with everyone in red and white is one of my favorite parts of game day. We left early enough to take the long route with our friends, grabbed snacks before heading in, and found our seats just as the band started playing. Even when the score gets stressful, the whole stadium feels like one big group cheering together. I always forget how loud it gets until the first big play, then suddenly I'm hoarse before halftime. If you're going this weekend, check the weather, bring layers, and pick a place to meet after the game in case your group gets separated. Hope to see a sea of red in the stands—go Pack!",
  },
  {
    author: "Jamie N.",
    location: "Hunt Library",
    text: "The bookBot is still the coolest thing on campus. I checked out a novel and a textbook in one trip.",
  },
  {
    author: "Alex P.",
    text: "Finally submitted the assignment I've been thinking about all week. Going outside for a bit to celebrate.",
  },
];

const app = document.querySelector("#app");
const heading = document.createElement("h1");
heading.textContent = "Howl";
app.append(heading);

for (const post of posts) {
  const article = document.createElement("article");
  const author = document.createElement("p");
  const message = document.createElement("p");

  author.textContent = post.location
    ? `${post.author} · ${post.location}`
    : post.author;
  message.textContent = post.text;
  article.append(author, message);
  app.append(article);
}
