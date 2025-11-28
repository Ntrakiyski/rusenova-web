section:Hero {
**Fraud Detection System**
An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%, deployed in <50ms

**System Performance Summary**
Key performance indicators for fraud detection
*   Fraud Detection Rate: 83.8%
*   False Positive Rate: 0.048%
*   Investigation Efficiency: 74.5%
}

section:What i build {
**What i build**
Fraud detection system to test feature performance across multiple algorithms and optimize for the highest fraud detection rate.

*   $2.7M Annual Savings
*   83.8% Fraud Caught
*   75.2% Alert Accuracy
}

section:Selecting a right aproach {
**Selecting a right aproach**
Instead of jumping straight to testing algorithms. I started by asking: "What makes a transaction suspicious?" This human-centered question shaped everything that followed.

*   **Understand the data:** Analyzed 284K transactions to uncover risk patterns
*   **Engineer high-impact features:** Created 21 custom features combining domain knowledge with statistical methods
*   **Optimise for business outcomes:** Compared 3 algorithms and selected XGBoost
*   **Translate to business value:** Calculated $2.7M annual value and performed segment analysis to translate model performance
}

section:Understand the Data {
**Understand the Data**
What i did

*   **Transaction analyses:** Analyzed 284K transactions over 2 days
*   **Outliers:** Discovered isolation forest outliers had 217x fraud concentration
*   **High risk:** Identified night transactions = 3x higher risk
}

section:Engineer High-Impact Features {
**Engineer High-Impact Features**
Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)

*   **Statistical:** pca magnitude, log amount, amount zscore, hour sin, hour cos, is night, Isolation Forest outlier scores
*   **Domain Specific:** amount percentile, is round_amount, V14 amount interaction
*   **Advanced:** distance to fraud, feature entropy, dominant feature value
}

section:Optimise for Business Outcomes {
**Optimise for Business Outcomes**
Compared 3 algorithms and selected XGBoost: 83.8% recall, 0.968 ROC-AUC, handling extreme class imbalance with scale_pos_weight=578

**Model Comparison Table:**
*   **Logistic Regression:** Recall 79.4%, Precision 63.2%, ROC-AUC 0.951, Status: Lower recall
*   **Random Forest:** Recall 81.7%, Precision 71.8%, ROC-AUC 0.963, Status: Slower inference
*   **XGBoost:** Recall 83.8%, Precision 75.2%, ROC-AUC 0.968, Status: Best balance
}

section:Key Results {
**Key Results**
Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)

**Dashboard Data:**
*   Total Transactions: 284,807
*   Fraud Detection Rate: 83.8%
*   Annual Value Add: $2,728,229.7
*   ROI: 16,115%
*   Fraud Cases: 492
*   Fraud Rate: 0.173%
*   Class Imbalance: 578:1
*   Fraud Amount Lost: $60,128
}

section:Technical Performance {
**Technical Performance**

*   **Recall: 83.8%**
    Catches 413 out of 492 frauds
    *Recall - Out of 492 fraudulent transactions, we catch 413—that's like spotting the one suspicious person in a crowd of 578*

*   **Precision: 75.2%**
    3 out of 4 alerts are real fraud

*   **ROC-AUC: 0.968**
    Near-perfect discrimination

*   **False Alarm Rate: 0.048%**
    Only 41 false positives per 85K transactions
    *False Alarm Rate - Only 41 customers out of 85,000 get a "false alarm"—that's your entire local grocery store seeing one incorrect alert per year*

*   **Latency: <50ms**
    Real-time capable
}

section:Cost-Benefit Breakdown {
**Cost-Benefit Breakdown**
How cathichng fraud impacts the business revenue and how much we can save?

*   **Research & Service Design:**
    *   Average fraud: $122 per transaction
    *   Cost to investigate a false alarm: $5
    *   Cost if a customer calls to complain: $10
    *   Dataset covers 2 days -> scaled to annual projections

*   **Without a system:**
    All 492 frauds succeed = -$3.3M lost per year

*   **With a system:**
    Fraud Prevented: 413 frauds -> *$2.77M saved
    Missed: 79 frauds -> $535K loss
}

section:Segment Analysis {
**Segment Analysis (Honest Assessment)**
Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds.

*   **Strengths:**
    *   High-value fraud (>$500): 94% recall - Excellent
    *   Medium transactions ($100-$500): 89% recall
    *   Night transactions: 91% recall
    *   Isolation Forest for feature creation: Outlier scores had 217x fraud concentration

*   **Weaknesses:**
    *   Micro-transactions (<$10): 78% recall - Needs improvement
    *   Very small frauds likely card testing patterns
}

section:Key learning {
**Key learning**
I expected the algorithm to be the hard part. It wasn't. The real challenge was understanding what "suspicious" means in 284,000 transactions and translating that intuition into mathematical features a computer could use.

Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds.
}

section:What Worked Well {
**What Worked Well**

*   **Feature engineering over algorithm choice:** Custom features delivered more value than model selection
*   **Business-driven threshold optimization:** Cost-benefit analysis over arbitrary metrics
*   **Segment analysis:** Identifying high-value transaction weakness led to actionable improvements
*   **Isolation Forest for feature creation:** Outlier scores had 217x fraud concentration
}

section:Technologies Used {
**Technologies Used**
How real-world deployment architecture designed for 10K transactions per second with sub-50ms latency would work?

*   **Machine Learning:** Python 3.13, XGBoost 3.1.0, scikit-learn, imbalanced-learn
*   **Data Processing:** pandas, numpy, scipy, Load balancer
*   **Deployment & Infrastructure:** Docker, plotly, SQLite, joblib
}

section:Production Deployment Architecture {
**Production Deployment Architecture**
This was an experimental project, so I focused on core functionality rather than production architecture details. However, I considered how the system would integrate with production tools and frameworks.

*   **Data & Features:**
    *   Kafka: Transaction streaming (10K TPS)
    *   Redis: Feature cache (sub-10ms)
    *   Feast: Feature store integration
    *   BigQuery: Offline training data

*   **Domain Specific:**
    *   FastAPI: Async endpoints (<50ms p99)
    *   Kubernetes: Auto-scaling (2-10 pods)
    *   MLflow: Model registry & versioning
    *   Load balancer with 3 replicas

*   **Monitoring:**
    *   Prometheus: Metrics collection
    *   Grafana: Real-time dashboards
    *   PagerDuty: Alert management
    *   ELK Stack: Centralized logging

*   **CI/CD Pipeline:**
    *   GitHub Actions: Automated testing
    *   Model validation: Performance gates
    *   Gradual rollout: 10% -> 100%
    *   A/B testing framework
}

section:Contact {
**Want to talk about your project?**
Message me on LinkedIn or send me an email
[Email] [LinkedIn]

**I'm currently seeking opportunities in:**
*   Machine Learning Engineering
*   Data Science
*   Product Design
}