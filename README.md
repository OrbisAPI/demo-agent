# Orbis Demo Agent

A working AI agent that discovers and calls APIs from [Orbis](https://orbisapi.com) using x402 micropayments on Base. No API keys. No subscriptions. Pay $0.001 per call in USDC.

## Setup

```bash
git clone https://github.com/OrbisAPI/demo-agent
cd demo-agent
npm install
```

Set your wallet private key:
```bash
export PRIVATE_KEY=0x...   # Base wallet with some USDC
```

## Run

```bash
# Search and call a weather API
node agent.js weather "London"

# Search and call a text utility
node agent.js text "summarize this is a long sentence that needs to be shortened"

# Browse available APIs
node agent.js browse finance
```

## How it works

1. Agent searches Orbis marketplace for the right API
2. Fetches proxy URL and price ($0.001 USDC typical)
3. Uses x402 to pay per call — no API keys, just USDC on Base
4. Returns the result

## x402 Protocol

x402 is an open standard for HTTP micropayments. Instead of API keys, agents attach a USDC payment to each request header. The server verifies on-chain and responds.

- [x402 spec](https://github.com/coinbase/x402)
- [Orbis x402 discovery](https://orbisapi.com/api/v2/x402/discovery/resources)

## Add to your agent

```bash
npx skills add OrbisAPI/agent-skills
```

Or install the client:
```bash
npm install orbis-x402
```

## Links
- [orbisapi.com](https://orbisapi.com)
- [Agent Skills](https://github.com/OrbisAPI/agent-skills)
- [npm: orbis-x402](https://npmjs.com/package/orbis-x402)
