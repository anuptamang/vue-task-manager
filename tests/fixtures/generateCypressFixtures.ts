/**
 * Script to generate Cypress fixtures from centralized test data
 *
 * Run this script to update cypress/fixtures/tasks.json from tests/fixtures/testTasks.ts
 * This ensures Cypress fixtures stay in sync with the centralized test data.
 *
 * Usage: npx ts-node tests/fixtures/generateCypressFixtures.ts
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { baseTestTasks, testTasksToJson } from './testTasks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cypressFixturesDir = join(__dirname, '../../cypress/fixtures');
const outputFile = join(cypressFixturesDir, 'tasks.json');

// Convert TypeScript test data to JSON format
const jsonData = testTasksToJson(baseTestTasks);

// Write to Cypress fixtures file
writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));

console.log(`✅ Generated ${outputFile} from centralized test data`);
console.log(`   Generated ${jsonData.length} tasks`);
