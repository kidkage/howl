import "../01-directions/directions.js";

for (const actions of document.querySelectorAll(".post-actions")) {
  const likeCount = actions.querySelector("span:last-child");
  if (!likeCount?.textContent.startsWith("Like ")) continue;

  const count = document.createElement("span");
  count.textContent = likeCount.textContent.slice(5);

  const button = document.createElement("button");
  button.className = "post-like";
  button.type = "button";
  button.setAttribute("aria-label", "Like post");
  button.setAttribute("aria-pressed", "false");
  button.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.2 8.8c0 4.1-8.2 10-8.2 10s-8.2-5.9-8.2-10a4.2 4.2 0 0 1 7.7-2.3l.5.7.5-.7a4.2 4.2 0 0 1 7.7 2.3Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  button.append(count);

  button.addEventListener("click", () => {
    const liked = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(liked));
    button.setAttribute("aria-label", liked ? "Unlike post" : "Like post");
    count.textContent = String(Number(count.textContent) + (liked ? 1 : -1));
  });

  likeCount.replaceWith(button);
}
