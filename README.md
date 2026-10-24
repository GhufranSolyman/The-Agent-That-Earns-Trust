# Trustline

Trustline is a dependency-free prototype of a trust layer for autonomous agents. It turns an agent's identity, signed claims, history, and scoped authority into an explainable policy decision.

## Run locally

Open [`index.html`](./index.html) directly in a browser, or serve the folder with any static server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Demo flow

1. The default policy evaluation allows Nova to negotiate a $2,500 renewal because its procurement credential and $5,000 spend limit are valid.
2. Click **Simulate spoofed agent** to replace the request with a payment-routing task.
3. The policy engine blocks it: the presented identity is not bound to the key and has no payment-routing authority.
4. Click **Restore legitimate agent** or **Run trust check** to return to the allow state.

## Architecture snapshot

**Identity → claims → verification → policy**

- **Identity:** a portable DID-like identifier (`did:tl:...`) identifies the agent and the key that signs an action.
- **Claims:** credentials describe capabilities, spending limits, issuer, expiry, and attestations.
- **Verification:** the relying party checks signatures, issuer trust, expiry, key binding, and revocation status.
- **Policy:** task-specific rules compare verified claims to the requested action and produce an allow/block decision with reasons.

The UI uses representative data for the interaction. A production implementation would replace the in-browser fixture with a signed credential registry and Web Crypto verification.

## Product thesis (two years)

In two years, agent identity will be less like a login and more like a credit file: portable, contextual, and continuously updated. A useful reputation layer cannot be a single score. It will be a graph of signed claims, completed work, failures, disputes, and the principals willing to vouch for an agent. The winning standard will separate identity from authority: an agent can remain the same entity while its permission to spend, negotiate, or access data changes minute by minute.

Trust will therefore become a runtime primitive. Before an agent acts, a policy engine will collect credentials, check their provenance and freshness, compare them to the task, and produce an explainable decision. Humans will grant narrow capabilities, counterparties will contribute attestations, and agents will learn to refuse interactions that cannot prove enough context. Reputation will be portable across marketplaces, but scoped enough to prevent one successful domain from becoming a blanket permit in another. The result is not “trust the AI”; it is a shared protocol for deciding when an action is safe enough to authorize.

## Notes

- AI tools used: Copilot SDK in VS Code.
- Key decision: keep the demo static and dependency-free so a clean clone runs without a build step.
- Out of scope: production key management, a real credential issuer, persistent revocation, and a hosted deployment.
