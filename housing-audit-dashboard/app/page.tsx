'use client';

import { useState } from 'react';
import { generateAuditData, type AuditRecord } from '@/lib/audit-data';
import {
  Tabs,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, Briefcase, Building2, Banknote, User, UserCheck, Baby, Wallet, TrendingDown, ArrowLeft } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { EgyptHousingHero } from '@/components/dashboard/egypt-hero';
import { LiquidTabs } from '@/components/ui/liquid-tabs';
import { PremiumChart } from '@/components/ui/premium-chart';
import { PipelineChart, FundingMixChart, PaymentComparisonChart, RiskAnalysisChart } from "@/components/ui/premium-charts-bundle";
import { GaugeChart } from '@/components/ui/gauge-chart';

// Note: @21st-extension/toolbar disabled - not needed for this dashboard

export default function DashboardPage() {
  const [auditData] = useState<AuditRecord[]>(() => generateAuditData(1000, 42));
  const [focusedMetric, setFocusedMetric] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('context');

  // KPI Data
  return (
    <div className="min-h-screen bg-transparent" suppressHydrationWarning>
      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-8" suppressHydrationWarning>
        {/* Header Section */}
        <div className="mb-12" suppressHydrationWarning>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            🇪🇬 Housing for All Egyptians: Program Audit
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Theme: From Social Crisis to Sustainable Asset
          </p>
        </div>

        {/* Egypt Housing Hero Section */}
        <div className="mb-12" suppressHydrationWarning>
          <EgyptHousingHero />
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" suppressHydrationWarning>
          <div className="mb-8 flex justify-center" suppressHydrationWarning>
            <LiquidTabs
              options={["context", "target", "engine", "execution", "future"]}
              selected={activeTab}
              setSelected={setActiveTab}
            />
          </div>

          {/* Tab 1: Context */}
          <TabsContent value="context" className="space-y-6" suppressHydrationWarning>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" suppressHydrationWarning>
              <StatCard title="Beneficiaries" value="2.2 M" sub="+12% YoY" icon={Users} chartColor="#2563eb" trend="up" />
              <StatCard title="Total Investment" value="66.3 B" sub="EGP Funding" icon={Banknote} chartColor="#16a34a" trend="up" />
              <StatCard title="Units Delivered" value="684 k" sub="98% of Goal" icon={Building2} chartColor="#ea580c" trend="up" />
              <StatCard title="Jobs Created" value="4.2 M" sub="Direct/Indirect" icon={Briefcase} chartColor="#9333ea" trend="up" />
            </div>

            {/* Data Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Data Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" suppressHydrationWarning>
                  <div suppressHydrationWarning>
                    <p className="text-slate-500 dark:text-slate-400">
                      Total Records
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {auditData.length}
                    </p>
                  </div>
                  <div suppressHydrationWarning>
                    <p className="text-slate-500 dark:text-slate-400">
                      Green Units
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {auditData.filter((r: AuditRecord) => r.greenCertified === 'Yes (GPRS Certified)').length}
                    </p>
                  </div>
                  <div suppressHydrationWarning>
                    <p className="text-slate-500 dark:text-slate-400">
                      Delivered
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {auditData.filter((r: AuditRecord) => r.status === 'Delivered').length}
                    </p>
                  </div>
                  <div suppressHydrationWarning>
                    <p className="text-slate-500 dark:text-slate-400">
                      Avg Subsidy
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(
                        auditData.reduce((sum: number, r: AuditRecord) => sum + r.stateSubsidy, 0) /
                        auditData.length
                      ).toFixed(0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Target */}
          <TabsContent value="target" suppressHydrationWarning>
            <TargetTabContent focusedMetric={focusedMetric} setFocusedMetric={setFocusedMetric} />
          </TabsContent>

          {/* Tab 3: Engine */}
          <TabsContent value="engine" className="space-y-6" suppressHydrationWarning>
            {(() => {
              return (
                <>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" suppressHydrationWarning>
                    <StatCard title="Portfolio Default" value="8.9%" sub="Neutral" icon={TrendingDown} chartColor="#3b82f6" trend="neutral" />
                    <StatCard title="Loan Disbursement" value="52.1 B" sub="EGP 91.2% Deployed" icon={Banknote} chartColor="#16a34a" trend="up" />
                    <StatCard title="Average Interest" value="12.5%" sub="YoY +2.1%" icon={Wallet} chartColor="#ea580c" trend="up" />
                    <StatCard title="Active Developers" value="2,847" sub="Portfolio Surge" icon={Building2} chartColor="#2563eb" trend="up" />
                  </div>

                  {/* Charts: Funding Mix & Payment Comparison */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" suppressHydrationWarning>
                    <FundingMixChart />
                    <PaymentComparisonChart />
                  </div>

                  {/* Chart: Risk Analysis - Premium */}
                  <RiskAnalysisChart />
                </>
              );
            })()}
          </TabsContent>

          {/* Tab 4: Execution */}
          <TabsContent value="execution" className="space-y-6" suppressHydrationWarning>
            {(() => {
              return (
                <>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" suppressHydrationWarning>
                    <StatCard title="Execution Sites" value="283" sub="Cities Nationwide" icon={User} chartColor="#ef4444" trend="up" />
                    <StatCard title="Regional Reach" value="27" sub="Governorates" icon={Building2} chartColor="#3b82f6" trend="up" />
                    <StatCard title="Safety Record" value="99.2%" sub="Compliance Rate" icon={UserCheck} chartColor="#eab308" trend="up" />
                    <StatCard title="Quality Checks" value="15.2 k" sub="Inspections Passed" icon={Baby} chartColor="#22c55e" trend="up" />
                  </div>

                  {/* Charts: Regional Distribution & Pipeline Status */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" suppressHydrationWarning>
                    <PremiumChart />
                    <PipelineChart />
                  </div>
                </>
              );
            })()}
          </TabsContent>

          {/* Tab 5: Future */}
          <TabsContent value="future" className="space-y-6" suppressHydrationWarning>
            {(() => {
              const greenCount = auditData.filter((r: AuditRecord) => r.greenCertified === 'Yes (GPRS Certified)').length;
              const greenPercentage = (greenCount / auditData.length) * 100;
              const totalCO2 = auditData.reduce((sum: number, r: AuditRecord) => sum + r.co2SavingsTons, 0);

              return (
                <>
                  {/* Green Certification Progress */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" suppressHydrationWarning>
                    <div className="p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" suppressHydrationWarning>
                      <h3 className="text-lg font-semibold mb-4 text-center">Certification Progress</h3>

                      {/* The Half-Circle Gauge */}
                      <GaugeChart 
                        value={greenPercentage}
                        max={10}
                        label="GPRS Certified"
                        color="#16a34a"
                      />
                    </div>

                    <div className="space-y-6" suppressHydrationWarning>
                      <StatCard 
                        title="CO2 Reduction" 
                        value={`${(totalCO2 / 1000).toFixed(1)}k`}
                        sub="Tons / Year" 
                        icon={Baby}
                        chartColor="#16a34a" 
                        trend="up"
                      />
                      <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-200 text-sm">
                        🌱 <strong>Target:</strong> The strategic goal is to reach 7.6% green certification by 2026.
                      </div>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental Impact Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg p-6">
                          <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
                            Total CO2 Savings
                          </p>
                          <p className="text-4xl font-bold text-emerald-600">
                            {totalCO2.toLocaleString('en-EG', { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                            metric tons reduced
                          </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6">
                          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                            Average Delivery Time
                          </p>
                          <p className="text-4xl font-bold text-blue-600">
                            {(
                              auditData.reduce((sum: number, r: AuditRecord) => sum + r.deliveryTimeDays, 0) /
                              auditData.length
                            ).toFixed(0)}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            days
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Target Tab Content Component with Grid-to-Detail View
function TargetTabContent({ 
  focusedMetric, 
  setFocusedMetric 
}: { 
  focusedMetric: number | null; 
  setFocusedMetric: (id: number | null) => void;
}) {
  const targetMetrics = [
    { id: 0, title: "Youth Focus", value: "71%", sub: "Aged 21-40", icon: User, color: "bg-blue-50", textColor: "text-blue-600" },
    { id: 1, title: "Female Ownership", value: "24%", sub: "Heads of Household", icon: UserCheck, color: "bg-pink-50", textColor: "text-pink-600" },
    { id: 2, title: "Family Status", value: "57%", sub: "With Young Children", icon: Baby, color: "bg-yellow-50", textColor: "text-yellow-600" },
    { id: 3, title: "Financial Inclusion", value: "65%", sub: "First-Time Banking", icon: Wallet, color: "bg-emerald-50", textColor: "text-emerald-600" },
    { id: 4, title: "Poverty Line", value: "66%", sub: "Below Avg Income", icon: TrendingDown, color: "bg-orange-50", textColor: "text-orange-600" }
  ];

  const selectedMetric = focusedMetric !== null ? targetMetrics[focusedMetric] : null;

  return (
    <AnimatePresence mode="wait">
      {focusedMetric === null ? (
        // Grid View
        <motion.div
          key="grid-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-5 gap-4">
            {targetMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    onClick={() => setFocusedMetric(metric.id)}
                    className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <CardHeader className={`${metric.color} rounded-t-lg`}>
                      <CardTitle className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${metric.textColor}`} />
                        {metric.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 flex flex-col h-full">
                      <div className="flex-1 space-y-2">
                        <p className={`text-2xl font-bold ${metric.textColor}`}>
                          {metric.value}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {metric.sub}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Strategic Insight Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-2 border-green-500 bg-green-50 dark:bg-green-950 rounded-lg p-6"
          >
            <p className="text-sm text-green-900 dark:text-green-100 font-medium">
              ✨ <strong>Strategic Insight:</strong> In conclusion, these numbers show that the program helps young people, women, families, and poorer households.
            </p>
          </motion.div>
        </motion.div>
      ) : (
        // Detail View
        <motion.div
          key="detail-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <Button
              onClick={() => setFocusedMetric(null)}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ⬅️ Back to Overview
            </Button>
          </motion.div>

          {selectedMetric && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-md mx-auto"
            >
              <Card className={`${selectedMetric.color} border-2 shadow-lg`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {(() => {
                      const Icon = selectedMetric.icon;
                      return <Icon className={`w-8 h-8 ${selectedMetric.textColor}`} />;
                    })()}
                    <CardTitle className="text-xl">{selectedMetric.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className={`text-4xl font-bold ${selectedMetric.textColor} mb-2`}>
                      {selectedMetric.value}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedMetric.sub}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Conditional Info Boxes */}
          <div className="max-w-md mx-auto space-y-4">
            {selectedMetric?.id === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-950 rounded-lg p-4"
              >
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  ℹ️ <strong>Detail:</strong> This represents families who previously lived in rental or informal housing.
                </p>
              </motion.div>
            )}

            {selectedMetric?.id === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-950 rounded-lg p-4"
              >
                <p className="text-sm text-emerald-900 dark:text-emerald-100">
                  ℹ️ <strong>Detail:</strong> This metric proves the success of the new Community Verification system.
                </p>
              </motion.div>
            )}
          </div>

          {/* Strategic Insight Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-green-500 bg-green-50 dark:bg-green-950 rounded-lg p-6"
          >
            <p className="text-sm text-green-900 dark:text-green-100 font-medium">
              ✨ <strong>Strategic Insight:</strong> In conclusion, these numbers show that the program helps young people, women, families, and poorer households.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
