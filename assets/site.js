document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  const pageKey = body.getAttribute("data-page");
  document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
    if (link.getAttribute("data-nav") === pageKey) {
      link.classList.add("active");
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const tigerButton = document.querySelector(".tiger-button");
  const quickPanel = document.querySelector(".quick-panel");

  if (tigerButton && quickPanel) {
    tigerButton.addEventListener("click", () => {
      const isOpen = quickPanel.classList.toggle("open");
      tigerButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        quickPanel.classList.remove("open");
        tigerButton.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!quickPanel.contains(target) && !tigerButton.contains(target)) {
        quickPanel.classList.remove("open");
        tigerButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(value || "");
        const original = button.textContent;
        button.textContent = "已复制";
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch (error) {
        const fallback = document.createElement("textarea");
        fallback.value = value || "";
        document.body.appendChild(fallback);
        fallback.select();
        try { document.execCommand("copy"); } catch (e) {}
        fallback.remove();
      }
    });
  });

  const topic = document.getElementById("topic");
  const guestName = document.getElementById("guestName");
  const message = document.getElementById("message");
  const sendMailBtn = document.getElementById("sendMailBtn");
  const copyMessageBtn = document.getElementById("copyMessageBtn");

  const buildEmailBody = () => {
    if (!topic || !guestName || !message) return null;
    const selectedTopic = topic.value.trim();
    const name = guestName.value.trim();
    const body = message.value.trim();
    if (!selectedTopic || !name || !body) {
      window.alert("请先填写主题、名字和留言内容。 ");
      return null;
    }
    return { selectedTopic, name, body };
  };

  if (sendMailBtn) {
    sendMailBtn.addEventListener("click", () => {
      const data = buildEmailBody();
      if (!data) return;
      const subject = encodeURIComponent(`【小站留言】${data.selectedTopic} · ${data.name}`);
      const mailBody = encodeURIComponent(`称呼：${data.name}\n想聊：${data.selectedTopic}\n\n${data.body}\n\n——来自何北的工作小站`);
      window.location.href = `mailto:hebei717@126.com?subject=${subject}&body=${mailBody}`;
    });
  }

  if (copyMessageBtn) {
    copyMessageBtn.addEventListener("click", async () => {
      const data = buildEmailBody();
      if (!data) return;
      const text = `称呼：${data.name}\n想聊：${data.selectedTopic}\n内容：${data.body}`;
      try {
        await navigator.clipboard.writeText(text);
        copyMessageBtn.textContent = "已复制";
        setTimeout(() => { copyMessageBtn.textContent = "复制留言"; }, 1200);
      } catch (error) {
        const fallback = document.createElement("textarea");
        fallback.value = text;
        document.body.appendChild(fallback);
        fallback.select();
        try { document.execCommand("copy"); } catch (e) {}
        fallback.remove();
      }
    });
  }
});
