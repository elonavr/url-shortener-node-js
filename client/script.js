document
  .getElementById("shorten-button")
  .addEventListener("click", async () => {
    const longUrl = document.getElementById("long-url-input").value;
    const outputElement = document.getElementById("short-url-output");

    if (!longUrl) {
      outputElement.textContent = "please enter valid address";
      return;
    }

    outputElement.textContent = "Shortening URL...";
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longURL: longUrl }),
      });
      const data = await response.json();

      if (response.ok) {
        const shortUrl = `${window.location.origin}/${data.shortCode}`;
        outputElement.innerHTML = `Your link: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
      } else {
        outputElement.textContent = `Error: ${
          data.message || "Could not shorten the URL."
        }`;
      }
    } catch (error) {
      console.error("Network or parsing error during request:", error);
      outputElement.textContent =
        "An error occurred while connecting to the server.";
    }
  });
