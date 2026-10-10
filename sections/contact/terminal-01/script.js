(function () {

  const screen = document.getElementById("screen");
  const statusLabel = document.getElementById("status-label");

  let promptRow = null;
  let typedSpan = null;
  let hiddenInput = null;

  let buffer = "";


  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }


  function addLine(text = "", className = "") {

    const line = document.createElement("span");

    line.className =
      "line" +
      (className ? ` ${className}` : "");

    line.textContent = text;

    screen.appendChild(line);

    return line;
  }


  /* =========================================================
     TYPEWRITER ENGINE
     ========================================================= */

  function typeInto(element, text, speed = 20) {

    return new Promise(resolve => {

      let index = 0;

      function step() {

        element.textContent =
          text.slice(0, index);

        index++;

        if (index <= text.length) {

          setTimeout(step, speed);

        } else {

          resolve();

        }
      }

      step();
    });
  }


  async function typeLine(
    text,
    className = "",
    speed = 20
  ) {

    const line =
      addLine("", className);

    await typeInto(
      line,
      text,
      speed
    );

    return line;
  }


  /* =========================================================
     PROGRESS BAR
     ========================================================= */

  async function progressBar() {

    const line =
      addLine("", "system");

    const width = 24;

    for (
      let percent = 0;
      percent <= 100;
      percent += 5
    ) {

      const filled =
        Math.round(
          (percent / 100) * width
        );

      const empty =
        width - filled;

      line.textContent =
        "█".repeat(filled) +
        "░".repeat(empty) +
        `  ${percent}%`;

      await wait(35);
    }
  }


  /* =========================================================
     BOOT SEQUENCE
     ========================================================= */

  async function boot() {

    await wait(350);

    await typeLine(
      "$ ./contact",
      "",
      28
    );

    await wait(180);

    await typeLine(
      "booting system...",
      "dim",
      17
    );

    await typeLine(
      "  └── modules loaded",
      "dim",
      17
    );

    await typeLine(
      "loading profile...",
      "dim",
      17
    );

    await typeLine(
      "establishing connection...",
      "dim",
      17
    );

    await wait(180);

    await progressBar();

    await wait(200);

    await typeLine(
      "CONNECTION ESTABLISHED.",
      "highlight",
      20
    );

    statusLabel.textContent = "ONLINE";

    await wait(250);

    showInformation();

    await wait(400);

    showPrompt();
  }


  /* =========================================================
     INFORMATION
     ========================================================= */

  function showInformation() {

    const block =
      document.createElement("div");

    block.className =
      "info-block";

    block.innerHTML = `

      <div class="line">
        AVAILABLE FOR:
      </div>

      <div class="line dim">
        &gt; FRONTEND DEVELOPMENT
      </div>

      <div class="line dim">
        &gt; CREATIVE DEVELOPMENT
      </div>

      <div class="line dim">
        &gt; EXPERIMENTAL DESIGN
      </div>

      <br>

      <div class="info-row">
        <span class="info-label">
          LOCATION
        </span>

        <span>
          REMOTE / GLOBAL
        </span>
      </div>

      <div class="info-row">
        <span class="info-label">
          STATUS
        </span>

        <span class="line highlight">
          ONLINE
        </span>
      </div>

      <br>

      <div class="line dim">
        type 'help' for a list of commands
      </div>

    `;

    screen.appendChild(block);

    requestAnimationFrame(() => {
      block.classList.add("show");
    });
  }


  /* =========================================================
     COMMAND SYSTEM
     ========================================================= */

  const commands = {

    help: () => [

      "AVAILABLE COMMANDS:",

      "  contact   — open a communication channel",

      "  status    — check current availability",

      "  whoami    — about this system",

      "  clear     — clear the screen"

    ],


    contact: () => [

      "> opening communication channel...",

      "EMAIL: hello@example.com",

      "Response time: within 24 hours"

    ],


    status: () => [

      "STATUS: ONLINE",

      "ACCEPTING NEW PROJECTS: YES"

    ],


    whoami: () => [

      "FORM_SYSTEM v1.0",

      "a small interface, built to say hello."

    ]

  };


  /* =========================================================
     PROMPT
     ========================================================= */

  function showPrompt() {

    promptRow =
      document.createElement("div");

    promptRow.className =
      "prompt-row";


    promptRow.innerHTML = `

      <span class="prompt-symbol">
        $&nbsp;
      </span>

      <span id="typed-input"></span>

      <span class="caret"></span>

    `;


    screen.appendChild(promptRow);


    typedSpan =
      promptRow.querySelector(
        "#typed-input"
      );


    /*
      Real input exists only to capture keyboard input.
      The visitor never sees it.
    */

    hiddenInput =
      document.createElement("input");

    hiddenInput.className =
      "hidden-input";

    hiddenInput.setAttribute(
      "autocomplete",
      "off"
    );

    hiddenInput.setAttribute(
      "autocapitalize",
      "none"
    );

    document.body.appendChild(
      hiddenInput
    );


    focusTerminal();


    /* Click anywhere in the terminal */

    screen.addEventListener(
      "click",
      focusTerminal
    );


    /* Capture typing */

    hiddenInput.addEventListener(
      "input",
      () => {

        buffer =
          hiddenInput.value;

        typedSpan.textContent =
          buffer;

      }
    );


    /* Enter */

    hiddenInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          const command =
            buffer.trim();

          buffer = "";

          hiddenInput.value = "";

          typedSpan.textContent = "";

          handleCommand(command);
        }
      }
    );
  }


  function focusTerminal() {

    if (hiddenInput) {
      hiddenInput.focus();
    }
  }


  /* =========================================================
     COMMAND HANDLER
     ========================================================= */

  async function handleCommand(command) {

    if (!command) {
      return;
    }


    /* Preserve entered command */

    addLine(
      "$ " + command,
      "prompt-echo"
    );


    promptRow.remove();


    await wait(150);


    const normalized =
      command.toLowerCase();


    /* Clear */

    if (normalized === "clear") {

      screen.innerHTML = "";

      showPrompt();

      return;
    }


    /* Known command */

    if (commands[normalized]) {

      const lines =
        commands[normalized]();


      for (const line of lines) {

        await typeLine(
          line,
          "dim",
          14
        );

      }

    }


    /* Unknown command */

    else {

      await typeLine(
        `command not found: ${command}`,
        "dim",
        14
      );

      await typeLine(
        "type 'help' for a list of commands",
        "dim",
        14
      );
    }


    screen.appendChild(
      promptRow
    );

    focusTerminal();

    screen.scrollTop =
      screen.scrollHeight;
  }


  /* =========================================================
     START
     ========================================================= */

  boot();

})();