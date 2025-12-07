/**
 * Audit Data Generator
 * Replicates Python numpy-based mock data generation with exact business rules
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface AuditRecord {
  // Beneficiary Profile
  ageGroup: "Youth (21-40)" | "Middle-Aged (41+)";
  gender: "Female" | "Male";
  employment: "Self-Employed" | "Government" | "Private Sector" | "Other";
  incomeLevel: "Low Income" | "Middle Income";

  // Execution & Location
  region: "Greater Cairo" | "Giza" | "Delta/Lower Egypt" | "Upper Egypt";
  status: "Delivered" | "Under Construction" | "Planned";
  deliveryTimeDays: number;

  // Financial Engine
  unitCost: number;
  stateSubsidy: number;
  downPayment: number;
  bankMortgage: number;

  // Sustainability
  greenCertified: "Yes (GPRS Certified)" | "No (Standard)";
  co2SavingsTons: number;
}

// ============================================================================
// WEIGHTED RANDOM HELPER FUNCTION
// ============================================================================

/**
 * Selects a random item from an array based on weighted probabilities
 * @param items Array of items to choose from
 * @param weights Array of weights (probabilities) corresponding to each item
 * @returns A randomly selected item based on the weighted distribution
 */
function weightedRandom<T>(items: T[], weights: number[], rnd: () => number = Math.random): T {
  if (items.length !== weights.length) {
    throw new Error("Items and weights arrays must have the same length");
  }

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = rnd() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }

  // Fallback (should not reach here)
  return items[items.length - 1];
}

// ============================================================================
// NORMAL DISTRIBUTION HELPER FUNCTION
// ============================================================================

/**
 * Generates a random number from a normal (Gaussian) distribution
 * Uses the Box-Muller transform to generate normally distributed values
 * @param mean The mean (μ) of the distribution
 * @param stdDev The standard deviation (σ) of the distribution
 * @returns A value sampled from N(mean, stdDev²)
 */
function normalDistribution(mean: number, stdDev: number, rnd: () => number = Math.random): number {
  // Box-Muller transform: generates two independent normal random variables
  const u1 = rnd();
  const u2 = rnd();

  // Avoid log(0)
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

  return mean + z0 * stdDev;
}

// ============================================================================
// MAIN DATA GENERATOR FUNCTION
// ============================================================================

/**
 * Generates an array of audit records with the specified count
 * All probabilities and distributions follow the exact business rules
 * @param count Number of audit records to generate
 * @returns Array of AuditRecord objects
 */
// Simple seeded PRNG (Mulberry32) to produce deterministic random numbers when a seed is provided.
function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateAuditData(count: number, seed?: number): AuditRecord[] {
  const records: AuditRecord[] = [];
  const rnd = seed !== undefined ? mulberry32(seed) : Math.random;

  for (let i = 0; i < count; i++) {
    // ========================================================================
    // BENEFICIARY PROFILE
    // ========================================================================

    // Age Group: 71% Youth, 29% Middle-Aged
    const ageGroup = weightedRandom(
      ["Youth (21-40)", "Middle-Aged (41+)"] as const,
      [71, 29],
      rnd
    );

    // Gender: 24% Female, 76% Male
    const gender = weightedRandom(["Female", "Male"] as const, [24, 76], rnd);

    // Employment: 40% Self-Employed, 29% Government, 22% Private, 9% Other
    const employment = weightedRandom(
      [
        "Self-Employed",
        "Government",
        "Private Sector",
        "Other",
      ] as const,
      [40, 29, 22, 9]
    , rnd);

    // Income Level: 66% Low Income, 34% Middle Income
    const incomeLevel = weightedRandom(
      ["Low Income", "Middle Income"] as const,
      [66, 34],
      rnd
    );

    // ========================================================================
    // EXECUTION & LOCATION
    // ========================================================================

    // Region: 45% Greater Cairo, 25% Giza, 15% Delta, 15% Upper Egypt
    const region = weightedRandom(
      [
        "Greater Cairo",
        "Giza",
        "Delta/Lower Egypt",
        "Upper Egypt",
      ] as const,
      [45, 25, 15, 15]
    , rnd);

    // Status: 68% Delivered, 25% Under Construction, 7% Planned
    const status = weightedRandom(
      ["Delivered", "Under Construction", "Planned"] as const,
      [68, 25, 7],
      rnd
    );

    // Delivery Time: Random integer between 180 and 730 days (inclusive)
    const deliveryTimeDays = Math.floor(rnd() * (730 - 180 + 1)) + 180;

    // ========================================================================
    // FINANCIAL ENGINE (THE WATERFALL)
    // ========================================================================

    const unitCost = 185000;

    // State Subsidy: Gaussian distribution (Mean: 16,600, SD: 2,000)
    const stateSubsidy = normalDistribution(16600, 2000, rnd);

    // Down Payment: Gaussian distribution (Mean: 43,000, SD: 5,000)
    const downPayment = normalDistribution(43000, 5000, rnd);

    // Bank Mortgage: Calculated as Unit Cost - Subsidy - Down Payment
    const bankMortgage = unitCost - stateSubsidy - downPayment;

    // ========================================================================
    // SUSTAINABILITY (GREEN UNITS)
    // ========================================================================

    // Green Certified: 2.4% "Yes", 97.6% "No"
    const greenCertified = weightedRandom(
      ["Yes (GPRS Certified)", "No (Standard)"] as const,
      [2.4, 97.6],
      rnd
    );

    // CO2 Savings: 3.2 tons if Green = Yes, 0 if No
    const co2SavingsTons = greenCertified === "Yes (GPRS Certified)" ? 3.2 : 0;

    // ========================================================================
    // CREATE RECORD
    // ========================================================================

    records.push({
      ageGroup,
      gender,
      employment,
      incomeLevel,
      region,
      status,
      deliveryTimeDays,
      unitCost,
      stateSubsidy,
      downPayment,
      bankMortgage,
      greenCertified,
      co2SavingsTons,
    });
  }

  return records;
}
