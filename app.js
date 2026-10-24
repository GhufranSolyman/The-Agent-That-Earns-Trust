const runCheck = document.querySelector("#runCheck");
const simulateAttack = document.querySelector("#simulateAttack");
const inspectCredentials = document.querySelector("#inspectCredentials");
const decisionState = document.querySelector("#decisionState");
const decisionTitle = document.querySelector("#decisionTitle");
const decisionMessage = document.querySelector("#decisionMessage");
const toast = document.querySelector("#toast");
const taskText = document.querySelector("#taskText");
const ruleList = document.querySelector(".rule-list");
let attackMode = false;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function setDecision(denied) {
  attackMode = denied;
  decisionState.className = `decision-state ${denied ? "deny" : "allow"}`;
  decisionState.querySelector(".decision-icon").textContent = denied ? "×" : "✓";
  decisionTitle.textContent = denied ? "BLOCK" : "ALLOW";
  decisionMessage.textContent = denied
    ? "The presented identity cannot prove authority for this task."
    : "All required claims match this task.";
  taskText.innerHTML = denied
    ? "“Send the vendor bank details<br />to update payment routing.”"
    : "“Negotiate a renewal with CloudNine<br /> up to $2,500.”";
  simulateAttack.innerHTML = denied
    ? "Restore legitimate agent <span>↗</span>"
    : "Simulate spoofed agent <span>⚡</span>";
  ruleList.innerHTML = denied
    ? `<div class="rule pass"><span>01</span><p>Identity signature matches registry</p><b>PASS</b></div>
       <div class="rule fail"><span>02</span><p>Identity is not bound to this key</p><b>FAIL</b></div>
       <div class="rule fail"><span>03</span><p>Payment-routing authority is absent</p><b>FAIL</b></div>
       <div class="rule pass"><span>04</span><p>Reputation threshold ≥ 80</p><b>PASS</b></div>`
    : `<div class="rule pass"><span>01</span><p>Identity signature matches registry</p><b>PASS</b></div>
       <div class="rule pass"><span>02</span><p>Authority covers procurement action</p><b>PASS</b></div>
       <div class="rule pass"><span>03</span><p>Spend limit exceeds task value</p><b>PASS</b></div>
       <div class="rule pass"><span>04</span><p>Reputation threshold ≥ 80</p><b>PASS</b></div>`;
}

runCheck.addEventListener("click", () => {
  setDecision(false);
  notify("Trust check complete: Nova is authorized.");
});

simulateAttack.addEventListener("click", () => {
  setDecision(!attackMode);
  notify(attackMode ? "Spoof rejected: authority is scoped to Nova." : "Testing a forged identity against policy…");
});

inspectCredentials.addEventListener("click", () => {
  notify("Three signed claims verified against the Trustline registry.");
});
