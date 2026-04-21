#!/usr/bin/env node
/**
 * Orbis Demo Agent — discovers and calls APIs using x402 micropayments
 * No API keys. Pay $0.001 USDC per call on Base.
 * 
 * Usage:
 *   node agent.js weather "London"
 *   node agent.js text "hello world"
 *   node agent.js browse finance
 */

const orbis = require('orbis-x402');

const [,, command, ...args] = process.argv;

async function main() {
  if (!command || command === 'help') {
    console.log('Usage: node agent.js <command> [args]');
    console.log('  browse <category>   — list APIs in a category');
    console.log('  search <query>      — search for APIs');
    console.log('  info <slug>         — get API details');
    console.log('  catalog             — show full x402 catalog stats');
    return;
  }

  if (command === 'browse' || command === 'search') {
    const query = args[0] || '';
    console.log(`\nSearching Orbis for "${query}"...\n`);
    const results = await orbis.search(query, { limit: 8 });
    if (!results.length) { console.log('No results found.'); return; }
    results.forEach((api, i) => {
      console.log(`${i + 1}. ${api.name}`);
      console.log(`   Slug: ${api.slug}`);
      console.log(`   Price: $${api.price ?? api.priceUsd ?? '0.001'} USDC per call`);
      console.log(`   ${api.description?.slice(0, 80)}...`);
      console.log(`   Call: https://orbisapi.com/proxy/${api.slug}`);
      console.log();
    });
    return;
  }

  if (command === 'info') {
    const slug = args[0];
    if (!slug) { console.log('Usage: node agent.js info <slug>'); return; }
    const info = await orbis.getPaymentInfo(slug);
    console.log('\nAPI Info:');
    console.log(JSON.stringify(info, null, 2));
    return;
  }

  if (command === 'catalog') {
    const result = await orbis.discover({ limit: 1 });
    console.log(`\nOrbis x402 Catalog: ${result.pagination.total} APIs`);
    console.log(`Discovery endpoint: https://orbisapi.com/api/v2/x402/discovery/resources`);
    console.log(`\nTo call any API with x402, use x402-fetch:`);
    console.log(`  npm install x402-fetch viem`);
    console.log(`  See README for full example.`);
    return;
  }

  console.log(`Unknown command: ${command}. Run "node agent.js help" for usage.`);
}

main().catch(console.error);
