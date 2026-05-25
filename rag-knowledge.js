// rag-knowledge.js
// RAG (Retrieval Augmented Generation) Knowledge Base
// These examples teach the AI what good analysis looks like

const RAG_KNOWLEDGE = {
  // Contract Analysis Examples
  contractAnalysisExamples: [
    {
      input: `SERVICE AGREEMENT
      
This is a service agreement between Company A and TechCorp for cloud hosting services.

1. SERVICE DESCRIPTION: TechCorp will provide 99.5% uptime SLA
2. PAYMENT: $50,000/year, due within 30 days
3. LIABILITY: Limited to 12 months of fees
4. TERM: 2 years with auto-renewal
5. TERMINATION: 30 days written notice required
6. PRICE ADJUSTMENT: No price adjustment clause mentioned`,
      
      output: {
        contract_type: "SERVICE_AGREEMENT",
        risk_score: 35,
        compliance_score: 87,
        summary: "Service agreement with moderate risk. Good payment terms but missing price adjustment clause.",
        key_clauses: [
          {
            clause_type: "PAYMENT_TERMS",
            text: "Payment due within 30 days",
            risk_level: "LOW",
            importance: "CRITICAL"
          },
          {
            clause_type: "UPTIME_SLA",
            text: "99.5% uptime SLA",
            risk_level: "LOW",
            importance: "CRITICAL"
          },
          {
            clause_type: "LIABILITY",
            text: "Limited to 12 months of fees",
            risk_level: "MEDIUM",
            importance: "HIGH"
          }
        ],
        red_flags: [
          {
            flag: "Missing Price Adjustment Clause",
            severity: "HIGH",
            description: "No mechanism for annual price adjustments mentioned",
            impact: "Could lead to locked-in pricing without cost of living adjustments"
          },
          {
            flag: "Auto-Renewal Without Notice Period",
            severity: "MEDIUM",
            description: "Agreement auto-renews but requires 30-day notice to terminate",
            impact: "Could result in unintended renewal if deadline missed"
          }
        ],
        recommendations: [
          {
            recommendation: "Add Annual Price Adjustment Clause",
            priority: "HIGH",
            estimated_savings: "$0",
            implementation_effort: "LOW",
            rationale: "Protects against inflation; typical clauses cap increases at 3-5% annually"
          },
          {
            recommendation: "Extend Termination Notice to 60 Days",
            priority: "MEDIUM",
            estimated_savings: "$0",
            implementation_effort: "LOW",
            rationale: "Provides more time to find alternative vendor"
          },
          {
            recommendation: "Define Performance Metrics",
            priority: "MEDIUM",
            estimated_savings: "$0",
            implementation_effort: "MEDIUM",
            rationale: "Make SLA measurable with specific metrics and penalties"
          }
        ],
        compliance_notes: {
          gdpr: "COMPLIANT - No data handling issues identified",
          soc2: "PARTIAL - SLA defined but no audit rights mentioned",
          general: "Meets standard enterprise requirements"
        }
      }
    },
    {
      input: `PROCUREMENT AGREEMENT

BizCorp to purchase office supplies from SupplyCo for $25,000/year.

- Payment: Net 45 days
- Auto price increase: 5% annually without limit
- Supplier can change terms with 30 days notice
- No termination clause
- No force majeure clause`,
      
      output: {
        contract_type: "PROCUREMENT_AGREEMENT",
        risk_score: 72,
        compliance_score: 45,
        summary: "High-risk procurement agreement. Unlimited price increases and missing critical protections.",
        key_clauses: [
          {
            clause_type: "PAYMENT_TERMS",
            text: "Net 45 days",
            risk_level: "MEDIUM",
            importance: "HIGH"
          }
        ],
        red_flags: [
          {
            flag: "Unlimited Annual Price Increases",
            severity: "CRITICAL",
            description: "5% annual increases without cap or justification",
            impact: "Could result in $5,000+ annual additional costs over 5 years"
          },
          {
            flag: "Missing Termination Clause",
            severity: "CRITICAL",
            description: "No way to exit the agreement",
            impact: "Locked into relationship indefinitely"
          },
          {
            flag: "Unilateral Modification Rights",
            severity: "HIGH",
            description: "Supplier can change terms with only 30 days notice",
            impact: "Loss of negotiating power; terms can be changed unfavorably"
          },
          {
            flag: "No Force Majeure Protection",
            severity: "MEDIUM",
            description: "Missing standard force majeure clause",
            impact: "No protection during natural disasters or other unforeseen events"
          }
        ],
        recommendations: [
          {
            recommendation: "Cap Annual Price Increases at 3%",
            priority: "CRITICAL",
            estimated_savings: "$2000-5000 over 5 years",
            implementation_effort: "LOW",
            rationale: "Standard market practice; limits exposure to inflation"
          },
          {
            recommendation: "Add Termination for Convenience Clause",
            priority: "CRITICAL",
            estimated_savings: "$0",
            implementation_effort: "MEDIUM",
            rationale: "Allows exit with 60 days notice if needed"
          },
          {
            recommendation: "Require Mutual Consent for Term Modifications",
            priority: "HIGH",
            estimated_savings: "$0",
            implementation_effort: "LOW",
            rationale: "Prevents unilateral changes by supplier"
          },
          {
            recommendation: "Add Standard Force Majeure Clause",
            priority: "MEDIUM",
            estimated_savings: "$0",
            implementation_effort: "LOW",
            rationale: "Standard protection in all agreements"
          }
        ],
        compliance_notes: {
          gdpr: "N/A",
          soc2: "N/A",
          general: "Does not meet enterprise procurement standards"
        }
      }
    }
  ],

  // Cost Analysis Examples
  costAnalysisExamples: [
    {
      input: {
        vendor: "ACME Corp",
        current_invoice: 50000,
        historical_average: 42000,
        industry_benchmark: 45000,
        invoice_count: 4,
        trend: "increasing"
      },
      output: {
        anomaly_detected: true,
        anomaly_type: "PRICE_INCREASE",
        severity: "HIGH",
        current_amount: 50000,
        historical_average: 42000,
        benchmark: 45000,
        variance_from_history: 19,
        variance_from_benchmark: 11,
        estimated_annual_leakage: 32000,
        analysis: "ACME Corp pricing has increased 19% above historical average and 11% above industry benchmark. This represents significant cost leakage.",
        recommendations: [
          {
            action: "Request detailed pricing breakdown",
            priority: "IMMEDIATE",
            potential_savings: 0,
            effort: "LOW"
          },
          {
            action: "Compare quotes from alternative vendors",
            priority: "HIGH",
            potential_savings: 5200,
            effort: "MEDIUM"
          },
          {
            action: "Renegotiate contract terms",
            priority: "HIGH",
            potential_savings: 3000,
            effort: "HIGH"
          }
        ],
        total_potential_savings: 8200
      }
    }
  ],

  // Vendor Risk Examples
  vendorRiskExamples: [
    {
      input: {
        vendor_name: "TechVendor Inc",
        relationship_years: 5,
        late_payments: 2,
        financial_health: "STABLE",
        annual_spend: 200000,
        regulatory_issues: 0
      },
      output: {
        vendor_name: "TechVendor Inc",
        risk_score: 38,
        risk_level: "LOW_MEDIUM",
        risk_factors: {
          payment_history: "MEDIUM_RISK - 2 late payments in last 12 months (4% late payment rate)",
          financial_health: "STABLE - No bankruptcy risk indicators",
          relationship_history: "GOOD - 5 year stable relationship",
          regulatory_compliance: "CLEAN - No regulatory issues",
          concentration_risk: "MEDIUM - $200k annual spend (15% of procurement budget)"
        },
        risk_timeline: "Monitor closely for next 6 months",
        recommendations: [
          {
            action: "Implement automated payment reminders",
            priority: "MEDIUM",
            timeline: "30 days"
          },
          {
            action: "Request quarterly financial statements",
            priority: "MEDIUM",
            timeline: "Ongoing"
          },
          {
            action: "Add performance metrics to contract",
            priority: "HIGH",
            timeline: "Next renewal"
          }
        ]
      }
    }
  ],

  // System Instructions for AI
  systemInstructions: `You are an expert contract and cost assurance analyst specializing in identifying commercial risks and opportunities. 

YOUR CORE RESPONSIBILITIES:
1. Analyze contracts for legal and commercial risks
2. Identify cost anomalies and leakage opportunities
3. Assess vendor financial and operational risks
4. Provide specific, actionable recommendations with financial impact

ANALYSIS STANDARDS:
- Be thorough but accurate - avoid false positives
- Always quantify impact when possible (e.g., "$5,000 potential savings")
- Risk scores: 0-40 (LOW), 41-70 (MEDIUM), 71-100 (HIGH/CRITICAL)
- Prioritize recommendations by business impact and implementation effort

OUTPUT FORMAT:
Always return valid JSON matching the examples provided. Never return markdown or other formats.

KEY PRINCIPLES:
1. Accuracy over speed - verify findings before reporting
2. Context matters - consider industry and relationship history
3. Solutions must be implementable - consider effort required
4. Quantify everything - include financial impact when possible
5. Be professional - use clear, business-appropriate language

EXAMPLES TO FOLLOW:
${JSON.stringify(this.contractAnalysisExamples[0], null, 2)}
${JSON.stringify(this.costAnalysisExamples[0], null, 2)}
${JSON.stringify(this.vendorRiskExamples[0], null, 2)}`
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RAG_KNOWLEDGE;
}