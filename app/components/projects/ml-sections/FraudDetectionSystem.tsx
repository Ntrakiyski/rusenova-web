'use client';

import React from 'react';
import { Project, ApproachSection, GenericSection, TechStackSection } from '@/types/project';
import MLHero from './MLHero';
import MLWhatIBuild from './MLWhatIBuild';
import MLApproach from './MLApproach';
import MLSectionWithCards from './MLSectionWithCards';
import MLSectionWithCardsAndBullets from './MLSectionWithCardsAndBullets';
import MLSectionWithTable from './MLSectionWithTable';
import MLKeyResultsOnly from './MLKeyResultsOnly';
import MLTechnicalPerformance from './MLTechnicalPerformance';
import MLCostBenefit from './MLCostBenefit';
import MLSegmentAnalysis from './MLSegmentAnalysis';
import MLKeyLearning from './MLKeyLearning';
import MLProductionDeployment from './MLProductionDeployment';
import MLTechStack from './MLTechStack';

interface FraudDetectionSystemProps {
  projectData: Project;
}

export default function FraudDetectionSystem({ projectData }: FraudDetectionSystemProps) {
  return (
    <div className="bg-white w-full min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <MLHero
        title="Fraud Detection System"
        subtitle="An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%, deployed in <50ms"
        heroImage={projectData.heroImage}
        gradientColors={projectData.gradientColors}
      />

      {/* What I Build Section */}
      <MLWhatIBuild
        description="Fraud detection system to test feature performance across multiple algorithms and optimize for the highest fraud detection rate."
        metrics={[
          { value: "$2.7M", label: "Annual Savings" },
          { value: "83.8%", label: "Fraud Caught" },
          { value: "75.2%", label: "Alert Accuracy" }
        ]}
      />

      {/* Approach Section */}
      <MLApproach
        title="Selecting a right aproach"
        description="Instead of jumping straight to testing algorithms. I started by asking: 'What makes a transaction suspicious?' This human-centered question shaped everything that followed."
        cards={[
          { title: "Understand the data", description: "Analyzed 284K transactions to uncover risk patterns" },
          { title: "Engineer high-impact features", description: "Created 21 custom features combining domain knowledge with statistical methods" },
          { title: "Optimise for business outcomes", description: "Compared 3 algorithms and selected XGBoost" },
          { title: "Translate to business value", description: "Calculated $2.7M annual value and performed segment analysis to translate model performance" }
        ]}
      />

      {/* Understand the Data Section */}
      <MLSectionWithCards
        title="Understand the Data"
        description="What i did"
        cards={[
          { title: "Transaction analyses", description: "Analyzed 284K transactions over 2 days" },
          { title: "Outliers", description: "Discovered isolation forest outliers had 217x fraud concentration" },
          { title: "High risk", description: "Identified night transactions = 3x higher risk" }
        ]}
      />

      {/* Engineer High-Impact Features Section */}
      <MLSectionWithCardsAndBullets
        title="Engineer High-Impact Features"
        description="Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)"
        cards={[
          {
            title: "Statistical",
            items: ["pca magnitude", "log amount", "amount zscore", "hour sin", "hour cos", "is night", "Isolation Forest outlier scores"]
          },
          {
            title: "Domain Specific",
            items: ["amount percentile", "is round_amount", "V14 amount interaction"]
          },
          {
            title: "Advanced",
            items: ["distance to fraud", "feature entropy", "dominant feature value"]
          }
        ]}
      />

      {/* Optimise for Business Outcomes Section */}
      <MLSectionWithTable
        title="Optimise for Business Outcomes"
        description="Compared 3 algorithms and selected XGBoost: 83.8% recall, 0.968 ROC-AUC, handling extreme class imbalance with scale_pos_weight=578"
        columns={["Algorithm", "Recall", "Precision", "ROC-AUC", "Status"]}
        rows={[
          { "Algorithm": "Logistic Regression", "Recall": "79.4%", "Precision": "63.2%", "ROC-AUC": "0.951", "Status": "Lower recall" },
          { "Algorithm": "Random Forest", "Recall": "81.7%", "Precision": "71.8%", "ROC-AUC": "0.963", "Status": "Slower inference" },
          { "Algorithm": "XGBoost", "Recall": "83.8%", "Precision": "75.2%", "ROC-AUC": "0.968", "Status": "Best balance" }
        ]}
      />

      {/* Key Results Section */}
      <MLKeyResultsOnly
        title="Key Results"
        description="Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)"
        results={[
          "Total Transactions: 284,807",
          "Fraud Detection Rate: 83.8%",
          "Annual Value Add: $2,728,229.7",
          "ROI: 16,115%",
          "Fraud Cases: 492",
          "Fraud Rate: 0.173%",
          "Class Imbalance: 578:1",
          "Fraud Amount Lost: $60,128"
        ]}
      />

      {/* Technical Performance Section */}
      <MLTechnicalPerformance
        title="Technical Performance"
        metrics={[
          { name: "Recall", value: "83.8%", description: "Catches 413 out of 492 frauds", details: "Recall - Out of 492 fraudulent transactions, we catch 413—that's like spotting the one suspicious person in a crowd of 578" },
          { name: "Precision", value: "75.2%", description: "3 out of 4 alerts are real fraud" },
          { name: "ROC-AUC", value: "0.968", description: "Near-perfect discrimination" },
          { name: "False Alarm Rate", value: "0.048%", description: "Only 41 false positives per 85K transactions", details: "False Alarm Rate - Only 41 customers out of 85,000 get a 'false alarm'—that's your entire local grocery store seeing one incorrect alert per year" },
          { name: "Latency", value: "<50ms", description: "Real-time capable" }
        ]}
      />

      {/* Cost-Benefit Breakdown Section */}
      <MLCostBenefit
        title="Cost-Benefit Breakdown"
        description="How cathichng fraud impacts the business revenue and how much we can save?"
        items={[
          { description: "Research & Service Design", cost: "Average fraud: $122 per transaction\nCost to investigate a false alarm: $5\nCost if a customer calls to complain: $10\nDataset covers 2 days -> scaled to annual projections", benefit: "" },
          { description: "Without a system", cost: "All 492 frauds succeed = -$3.3M lost per year", benefit: "" },
          { description: "With a system", cost: "Fraud Prevented: 413 frauds -> $2.77M saved\nMissed: 79 frauds -> $535K loss", benefit: "" }
        ]}
      />

      {/* Segment Analysis Section */}
      <MLSegmentAnalysis
        title="Segment Analysis (Honest Assessment)"
        description="Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds."
        segments={[
          {
            name: "Strengths",
            metrics: [
              { name: "High-value fraud (>$500)", value: "94% recall - Excellent" },
              { name: "Medium transactions ($100-$500)", value: "89% recall" },
              { name: "Night transactions", value: "91% recall" },
              { name: "Isolation Forest for feature creation", value: "Outlier scores had 217x fraud concentration" }
            ]
          },
          {
            name: "Weaknesses",
            metrics: [
              { name: "Micro-transactions (<$10)", value: "78% recall - Needs improvement" },
              { name: "Very small frauds likely card testing patterns", value: "" }
            ]
          }
        ]}
      />

      {/* Key Learning Section */}
      <MLKeyLearning
        title="Key learning"
        description="I expected the algorithm to be the hard part. It wasn't. The real challenge was understanding what 'suspicious' means in 284,000 transactions and translating that intuition into mathematical features a computer could use."
        learnings={[
          { title: "Balancing recall vs precision", description: "Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds." },
          { title: "Feature engineering over algorithm choice", description: "Custom features delivered more value than model selection" },
          { title: "Business-driven threshold optimization", description: "Cost-benefit analysis over arbitrary metrics" },
          { title: "Segment analysis", description: "Identifying high-value transaction weakness led to actionable improvements" },
          { title: "Isolation Forest for feature creation", description: "Outlier scores had 217x fraud concentration" }
        ]}
      />

      {/* Production Deployment Section */}
      <MLProductionDeployment
        title="Production Deployment Architecture"
        description="This was an experimental project, so I focused on core functionality rather than production architecture details. However, I considered how the system would integrate with production tools and frameworks."
        steps={[
          {
            title: "Data & Features",
            description: "Kafka: Transaction streaming (10K TPS), Redis: Feature cache (sub-10ms), Feast: Feature store integration, BigQuery: Offline training data",
            status: "completed"
          },
          {
            title: "Domain Specific",
            description: "FastAPI: Async endpoints (<50ms p99), Kubernetes: Auto-scaling (2-10 pods), MLflow: Model registry & versioning, Load balancer with 3 replicas",
            status: "completed"
          },
          {
            title: "Monitoring",
            description: "Prometheus: Metrics collection, Grafana: Real-time dashboards, PagerDuty: Alert management, ELK Stack: Centralized logging",
            status: "completed"
          },
          {
            title: "CI/CD Pipeline",
            description: "GitHub Actions: Automated testing, Model validation: Performance gates, Gradual rollout: 10% -> 100%, A/B testing framework",
            status: "completed"
          }
        ]}
      />

      {/* Tech Stack Section */}
      <MLTechStack
        title="Technologies Used"
        description="How real-world deployment architecture designed for 10K transactions per second with sub-50ms latency would work?"
        technologies={[
          "Machine Learning: Python 3.13, XGBoost 3.1.0, scikit-learn, imbalanced-learn",
          "Data Processing: pandas, numpy, scipy, Load balancer",
          "Deployment & Infrastructure: Docker, plotly, SQLite, joblib"
        ]}
      />
    </div>
  );
}