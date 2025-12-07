/**
 * Test file for audit-data generator
 * Demonstrates usage and validates distribution accuracy
 */

import { generateAuditData, AuditRecord } from "./audit-data";

// ============================================================================
// GENERATE SAMPLE DATA
// ============================================================================

const sampleData = generateAuditData(10);

console.log("=== SAMPLE AUDIT RECORDS (10) ===\n");
sampleData.forEach((record, index) => {
  console.log(`Record ${index + 1}:`);
  console.log(
    `  Beneficiary: ${record.gender}, ${record.ageGroup}, ${record.employment}`
  );
  console.log(`  Income: ${record.incomeLevel}`);
  console.log(`  Location: ${record.region}`);
  console.log(`  Status: ${record.status} (${record.deliveryTimeDays} days)`);
  console.log(
    `  Financials: Unit=${record.unitCost.toFixed(0)}, Subsidy=${record.stateSubsidy.toFixed(2)}, DownPayment=${record.downPayment.toFixed(2)}, Mortgage=${record.bankMortgage.toFixed(2)}`
  );
  console.log(
    `  Green: ${record.greenCertified}, CO2=${record.co2SavingsTons} tons`
  );
  console.log();
});

// ============================================================================
// DISTRIBUTION VALIDATION (Large Sample)
// ============================================================================

const largeDataset = generateAuditData(10000);

// Calculate distribution percentages
const ageGroupDistribution = largeDataset.reduce(
  (acc, r) => {
    acc[r.ageGroup] = (acc[r.ageGroup] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const genderDistribution = largeDataset.reduce(
  (acc, r) => {
    acc[r.gender] = (acc[r.gender] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const employmentDistribution = largeDataset.reduce(
  (acc, r) => {
    acc[r.employment] = (acc[r.employment] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const regionDistribution = largeDataset.reduce(
  (acc, r) => {
    acc[r.region] = (acc[r.region] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const greenDistribution = largeDataset.reduce(
  (acc, r) => {
    acc[r.greenCertified] = (acc[r.greenCertified] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

console.log("=== DISTRIBUTION ANALYSIS (10,000 samples) ===\n");

console.log("Age Group Distribution (Expected: Youth 71%, Middle-Aged 29%):");
Object.entries(ageGroupDistribution).forEach(([key, count]) => {
  const percentage = ((count / largeDataset.length) * 100).toFixed(1);
  console.log(`  ${key}: ${percentage}%`);
});

console.log("\nGender Distribution (Expected: Female 24%, Male 76%):");
Object.entries(genderDistribution).forEach(([key, count]) => {
  const percentage = ((count / largeDataset.length) * 100).toFixed(1);
  console.log(`  ${key}: ${percentage}%`);
});

console.log(
  "\nEmployment Distribution (Expected: Self-40%, Gov-29%, Private-22%, Other-9%):"
);
Object.entries(employmentDistribution).forEach(([key, count]) => {
  const percentage = ((count / largeDataset.length) * 100).toFixed(1);
  console.log(`  ${key}: ${percentage}%`);
});

console.log(
  "\nRegion Distribution (Expected: Cairo-45%, Giza-25%, Delta-15%, Upper-15%):"
);
Object.entries(regionDistribution).forEach(([key, count]) => {
  const percentage = ((count / largeDataset.length) * 100).toFixed(1);
  console.log(`  ${key}: ${percentage}%`);
});

console.log(
  "\nGreen Certification (Expected: Yes-2.4%, No-97.6%):"
);
Object.entries(greenDistribution).forEach(([key, count]) => {
  const percentage = ((count / largeDataset.length) * 100).toFixed(2);
  console.log(`  ${key}: ${percentage}%`);
});

// ============================================================================
// FINANCIAL STATISTICS
// ============================================================================

const subsidies = largeDataset.map((r) => r.stateSubsidy);
const downPayments = largeDataset.map((r) => r.downPayment);
const mortgages = largeDataset.map((r) => r.bankMortgage);

const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
const stdDev = (arr: number[]) => {
  const m = mean(arr);
  const variance =
    arr.reduce((sum, val) => sum + Math.pow(val - m, 2), 0) / arr.length;
  return Math.sqrt(variance);
};

console.log("\n=== FINANCIAL DISTRIBUTIONS (10,000 samples) ===\n");

console.log(
  "State Subsidy (Expected: Mean=16,600, SD=2,000):"
);
console.log(`  Mean: ${mean(subsidies).toFixed(2)}`);
console.log(`  Std Dev: ${stdDev(subsidies).toFixed(2)}`);

console.log(
  "\nDown Payment (Expected: Mean=43,000, SD=5,000):"
);
console.log(`  Mean: ${mean(downPayments).toFixed(2)}`);
console.log(`  Std Dev: ${stdDev(downPayments).toFixed(2)}`);

console.log(
  "\nBank Mortgage (Calculated: Unit Cost - Subsidy - Down Payment):"
);
console.log(`  Mean: ${mean(mortgages).toFixed(2)}`);
console.log(`  Std Dev: ${stdDev(mortgages).toFixed(2)}`);
console.log(`  Min: ${Math.min(...mortgages).toFixed(2)}`);
console.log(`  Max: ${Math.max(...mortgages).toFixed(2)}`);

// ============================================================================
// DELIVERY TIME STATISTICS
// ============================================================================

const deliveryTimes = largeDataset.map((r) => r.deliveryTimeDays);

console.log(
  "\nDelivery Time Distribution (Expected: Range 180-730 days):"
);
console.log(`  Min: ${Math.min(...deliveryTimes)}`);
console.log(`  Max: ${Math.max(...deliveryTimes)}`);
console.log(`  Mean: ${mean(deliveryTimes).toFixed(2)}`);
console.log(`  Median: ${deliveryTimes.sort((a, b) => a - b)[Math.floor(deliveryTimes.length / 2)]}`);
