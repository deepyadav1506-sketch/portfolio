// console.log("Hello World");
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Switch to light mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "Switch to dark mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
});

const weatherContent = document.getElementById("weather-content");
const weatherApiKey = "de65893db7ea9bac674a77bb3b328dd7";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=26.9124&lon=75.7873&units=metric&appid=${weatherApiKey}`;

async function loadWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`Weather request failed (${response.status})`);
        }

        const weather = await response.json();
        const condition = weather.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}.png`;

        weatherContent.innerHTML = `
            <div class="weather-current">
                <img src="${iconUrl}" alt="${condition.description}">
                <p class="weather-temperature">${Math.round(weather.main.temp)}°C</p>
            </div>
            <p class="weather-description">${condition.description}</p>
        `;
    } catch (error) {
        weatherContent.innerHTML = '<p class="weather-status">Weather is currently unavailable.</p>';
        console.error("Unable to load Jaipur weather:", error);
    }
}

loadWeather();

const chatToggle = document.getElementById("chat-toggle");
const chatPanel = document.getElementById("chat-panel");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function addChatMessage(text, sender) {
    const message = document.createElement("p");
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatAnswer(question) {
    const text = question.toLowerCase();

    if (/\b(hi|hello|hey)\b/.test(text)) {
        return "Hi! You can ask me about Deepak's studies, skills, or projects.";
    }
    if (/\b(skill|know|learn|technology|language)\b/.test(text)) {
        return "Deepak lists Python, C, C++, Cursor, and Artificial Intelligence & Data Science among his skills and areas of study.";
    }
    if (/\b(cursor)\b/.test(text)) {
        return "Deepak is exploring Cursor to improve his development workflow. The project link is in the Projects section.";
    }
    if (/\b(hmates|hostel)\b/.test(text)) {
        return "HMates is a smart hostel booking platform designed to make finding and booking hostels easier for students.";
    }
    if (/\b(kisan|dhristy|agriculture|farmer)\b/.test(text)) {
        return "Kisan Dhristy focuses on a technology-based solution for the agricultural community.";
    }
    if (/\b(project|built|work)\b/.test(text)) {
        return "The portfolio features three projects: exploring Cursor, HMates (a student hostel booking platform), and Kisan Dhristy (a technology project for agriculture). Each has a project link on the page.";
    }
    if (/\b(study|studying|college|university|jecrc|degree|course|major)\b/.test(text)) {
        return "Deepak is pursuing a B.Tech in Computer Science Engineering with Artificial Intelligence and Data Science at JECRC.";
    }
    if (/\b(from|live|location|city|jaipur|rajasthan)\b/.test(text)) {
        return "Deepak is from Jaipur, Rajasthan.";
    }
    if (/\b(who|about|yourself|deepak)\b/.test(text)) {
        return "Deepak Yadav is a B.Tech student at JECRC, studying Computer Science Engineering with Artificial Intelligence and Data Science. He is from Jaipur, Rajasthan, and enjoys learning technology and building useful projects.";
    }

    return "I can answer questions about Deepak's studies, skills, location, and the projects listed on this portfolio. Try asking about HMates, Kisan Dhristy, or Cursor.";
}

function askChat(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    addChatMessage(trimmedQuestion, "user");
    addChatMessage(getChatAnswer(trimmedQuestion), "assistant");
}

addChatMessage("Hi! Ask me about Deepak's studies, skills, or projects.", "assistant");

chatToggle.addEventListener("click", () => {
    chatPanel.hidden = !chatPanel.hidden;
    chatToggle.setAttribute("aria-expanded", String(!chatPanel.hidden));
    if (!chatPanel.hidden) chatInput.focus();
});

chatClose.addEventListener("click", () => {
    chatPanel.hidden = true;
    chatToggle.setAttribute("aria-expanded", "false");
    chatToggle.focus();
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    askChat(chatInput.value);
    chatInput.value = "";
    chatInput.focus();
});

document.querySelectorAll(".chat-prompts button").forEach((button) => {
    button.addEventListener("click", () => askChat(button.dataset.question));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !chatPanel.hidden) {
        chatPanel.hidden = true;
        chatToggle.setAttribute("aria-expanded", "false");
        chatToggle.focus();
    }
});


// let url ="https://catfact.ninja/fact";
// async function getFact() {
//     let res = await fetch(url);
//     let data = await res.json();
//     console.log(data);
    
// }