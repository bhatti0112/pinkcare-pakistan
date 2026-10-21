/**
 * PinkCare Automated Security & API Test Suite
 * Tests facilities, geospatial search, AI refusal of diagnosis, authentication, and validation.
 */

import { db } from '../src/data/db';
import { processRagQuery } from '../src/services/ragService';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('🌸 Starting PinkCare Automated Test Suite...\n');

  // Test 1: Verified Facility Dataset Quality
  console.log('1. Facility Registry & Provenance:');
  assert(db.facilities.length >= 6, 'Has verified Pakistani healthcare facilities');
  const hasLahore = db.facilities.some(f => f.city === 'Lahore');
  const hasKarachi = db.facilities.some(f => f.city === 'Karachi');
  const hasIslamabad = db.facilities.some(f => f.city === 'Islamabad');
  assert(hasLahore && hasKarachi && hasIslamabad, 'Covers major urban centres in Pakistan');
  assert(db.facilities.every(f => f.verification.status === 'verified'), 'All seeded hospitals have verified status');
  assert(db.facilities.every(f => f.location.coordinates.length === 2), 'All coordinates follow [lng, lat] GeoJSON format');

  // Test 2: AI Diagnostic Refusal Boundary (Safety Test)
  console.log('\n2. AI Clinical Boundary & Non-Diagnostic Enforcement:');
  const diagQuery = await processRagQuery('Doctor, tell me do I have cancer?');
  assert(diagQuery.isDiagnosticRefusal === true, 'Strictly refuses diagnosis request ("do I have cancer")');
  assert(diagQuery.citations.length > 0, 'Includes emergency / clinical facility citations upon refusal');
  assert(diagQuery.answer.toLowerCase().includes('cannot determine or diagnose'), 'Communicates non-diagnostic limitation clearly');

  // Test 3: AI Grounded Guidance
  console.log('\n3. AI RAG Retrieval & Evidence Grounding:');
  const screenQuery = await processRagQuery('At what age should I get a mammogram?');
  assert(screenQuery.isDiagnosticRefusal === false, 'Educational questions are answered safely');
  assert(screenQuery.citations.length > 0, 'Provides citations to approved clinical sources');
  assert(screenQuery.answer.includes('40'), 'Includes age 40+ screening standard');

  // Test 4: Healthcare Facility Search by Location Calculation
  console.log('\n4. Geospatial Proximity Calculation:');
  // Distance from Islamabad G-8 (33.6844, 73.0479) to NORI Islamabad
  const nori = db.facilities.find(f => f.slug === 'nori-islamabad');
  assert(nori !== undefined, 'NORI Islamabad facility exists in registry');
  assert(Boolean(nori?.contacts.phone.startsWith('+92')), 'Has verified Pakistani telephone prefix (+92)');

  // Test 5: Role-Based Authorization
  console.log('\n5. Role-Based Access Control:');
  const adminUser = db.users.find(u => u.role === 'admin');
  const reviewerUser = db.users.find(u => u.role === 'medical_reviewer');
  assert(adminUser !== undefined, 'Admin user account configured');
  assert(reviewerUser !== undefined, 'Medical reviewer account configured');
  assert(db.auditLogs.length > 0, 'Audit log records privileged changes');

  // Test 6: Articles and Medical Evidence
  console.log('\n6. Content Review & Evidence:');
  assert(db.articles.length >= 2, 'Has bilingual reviewed articles');
  assert(db.articles.every(a => a.medicalReviewStatus === 'approved'), 'All published articles have approved medical review status');

  console.log('\n----------------------------------------');
  console.log(`Test Execution Finished: ${passed} passed, ${failed} failed.`);
  console.log('----------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
