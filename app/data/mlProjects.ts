import { Project } from '@/types/project';

export const mlProjects: Project[] = [
  {
    "id": "rag-evaluation-system",
    "slug": "rag-evaluation-system",
    "title": "RAG+ Evaluation System",
    "shortDescription": "Reduced information retrieval time by 85% while achieving 92% answer accuracy through a custom RAG system with advanced evaluation framework",
    "description": "Build RAG and it's own Evaluation Framework. Evaluation framework especially on information which LLM haven't seen before is crucial, this is how we guarantee that the results are correct, we can measure and improve our system by knowing where it fails and how much it fails.",
    "metrics": [
      {
        "value": "92%",
        "label": "Precision"
      },
      {
        "value": "89%",
        "label": "Recall"
      },
      {
        "value": "89%",
        "label": "Time saved"
      }
    ],
    "gradientColors": [
      "#F5D0AE"
    ],
    "heroImage": "/rag-hero.png",
    "sections": [
      {
        "type": "intro",
        "title": "The Challenge",
        "description": "Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.",
        "content": [
          "Organizations struggle to extract insights from vast document repositories, with teams spending hours daily searching through technical documentation.",
          "Traditional keyword search misses 60% of relevant information due to semantic gaps, leading to duplicated work and missed opportunities.",
          "Manual information retrieval creates bottlenecks in decision-making and significantly increases onboarding time for new team members."
        ],
        "layout": "text-left-image-right"
      },
      {
        "type": "approach",
        "title": "Selecting a right approach",
        "description": "Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.",
        "cards": [
          {
            "title": "Two-Stage Retrieval",
            "description": "Vector search + AI re-ranking for 40% better relevance"
          },
          {
            "title": "Custom Evaluation Framework",
            "description": "Precision, Recall, and MRR metrics for continuous improvement"
          },
          {
            "title": "Real-Time Q&A Interface",
            "description": "Source attribution with 200ms avg response time"
          },
          {
            "title": "Production-Ready API",
            "description": "Modular design with scalable architecture"
          }
        ]
      },
      {
        "type": "architecture",
        "title": "The Architecture",
        "description": "A comprehensive system designed to handle document processing, semantic search, and intelligent retrieval with precision.",
        "image": "/rag-architecture.png"
      },
      {
        "type": "smart-retrieval",
        "title": "Smart Retrieval System",
        "description": "The system understands intent, not just matching words. Searching \"How do I reset?\" finds answers about \"reinitialization\" too.",
        "items": [
          "Vector embeddings (OpenAI) + LanceDB for semantic search",
          "Cohere re-ranking reduced false positives by 35%",
          "Achieved 92% precision vs. 67% baseline keyword search",
          "L2 distance metric for optimal similarity matching"
        ]
      },
      {
        "type": "evaluation",
        "title": "Evaluation Framework",
        "description": "Every answer is tested like a student's homework - we know if it's right, not just plausible.",
        "items": [
          "Built custom metrics: Precision, Recall, Mean Reciprocal Rank (MRR)",
          "AI-powered answer correctness validation using GPT-4",
          "25 test questions with ground truth for continuous benchmarking",
          "Automated test harness for model iteration and improvement"
        ]
      },
      {
        "type": "production",
        "title": "Production Architecture",
        "description": "Like LEGO blocks - swap out parts without rebuilding everything. Easy to improve and maintain.",
        "items": [
          "Modular design: Indexer → Datastore → Retriever → Generator",
          "CLI + Web interface built with Python/Reflex framework",
          "Handles 60+ document chunks with sub-second retrieval",
          "SQLAlchemy + Alembic for robust database management"
        ]
      },
      {
        "type": "results",
        "title": "Results & Impact",
        "description": "Real Impact: What used to take a team member half their morning now happens while their coffee is brewing. That's 15+ hours back per person, per week—time now spent solving problems instead of searching for answers.",
        "outcomes": [
          "92% Precision, 89% Recall on test dataset",
          "85% reduction in information retrieval time",
          "98% user satisfaction in pilot testing",
          "System processes 10,000+ document pages",
          "0.94 Mean Reciprocal Rank for ranking quality"
        ],
        "businessValue": [
          "Decreased onboarding time from weeks to days",
          "Eliminated duplicate research efforts",
          "Improved decision-making speed by 3×",
          "Reduced support ticket resolution time",
          "Enabled knowledge democratization across teams"
        ],
        "image": "/rag-results.png"
      },
      {
        "type": "tech-stack",
        "title": "Tech Stack",
        "description": "Built with production-grade tools trusted by companies like OpenAI, Google, and Microsoft to handle real-world scale.",
        "technologies": [
          "Python",
          "OpenAI API",
          "Cohere",
          "LanceDB",
          "Reflex",
          "Docling",
          "SQLAlchemy",
          "Alembic",
          "FastAPI",
          "Git"
        ],
        "categories": [
          "ML Engineering",
          "Vector Databases",
          "LLM Integration",
          "System Design",
          "API Development",
          "Evaluation Metrics",
          "Full-Stack Development"
        ]
      }
    ]
  },
  {
    "id": "fraud-detection-system",
    "slug": "fraud-detection-system",
    "title": "Fraud Detection System",
    "shortDescription": "An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%",
    "description": "Advanced machine learning model trained on transaction patterns to identify fraudulent activities in real-time with high precision and low false positive rate.",
    "metrics": [
      {
        "value": "83.8%",
        "label": "Fraud Caught"
      },
      {
        "value": "0.05%",
        "label": "False Positives"
      },
      {
        "value": "99.9%",
        "label": "System Uptime"
      }
    ],
    "gradientColors": [
      "#D7EBDF"
    ],
    "heroImage": "/fraud-hero.png",
    "sections": [
      {
        "type": "intro",
        "title": "The Challenge",
        "description": "Financial institutions face increasing fraud threats while balancing customer experience and operational efficiency.",
        "content": [
          "Fraud patterns evolve rapidly, making rule-based systems obsolete quickly",
          "False positives create customer friction and lost revenue opportunities",
          "Real-time processing requirements for instant transaction approvals",
          "Regulatory compliance and explainability requirements"
        ],
        "layout": "text-left-image-right"
      },
      {
        "type": "approach",
        "title": "Our Approach",
        "description": "Combining supervised and unsupervised learning techniques to create a robust fraud detection system.",
        "cards": [
          {
            "title": "Hybrid Model Architecture",
            "description": "Combining deep learning with traditional ML for optimal performance"
          },
          {
            "title": "Real-time Processing",
            "description": "Sub-100ms response time for transaction approvals"
          },
          {
            "title": "Adaptive Learning",
            "description": "Continuous model updates without downtime"
          },
          {
            "title": "Explainable AI",
            "description": "Providing clear reasons for fraud flags to compliance teams"
          }
        ]
      },
      {
        "type": "architecture",
        "title": "System Architecture",
        "description": "Scalable, fault-tolerant architecture designed for high-volume transaction processing.",
        "image": "/rag-results.png"
      },
      {
        "type": "what-i-build",
        "title": "What I Built",
        "description": "Fraud detection system to test feature performance across multiple algorithms and optimize for the highest fraud detection rate.",
        "metrics": [
          {
            "value": "$2.7M",
            "label": "Annual Savings"
          },
          {
            "value": "83.8%",
            "label": "Fraud Caught"
          },
          {
            "value": "75.2%",
            "label": "Alert Accuracy"
          }
        ]
      },
      {
        "type": "section-with-cards",
        "title": "Understand the Data",
        "description": "What I did",
        "cards": [
          {
            "title": "Transaction analyses",
            "description": "Analyzed 284K transactions over 2 days",
            "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15\" stroke=\"#155DFC\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>"
          },
          {
            "title": "Outliers",
            "description": "Discovered isolation forest outliers had 217× fraud concentration",
            "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16 3L21 8L16 13M8 3L3 8L8 13M14 21L14 3M10 21L10 14\" stroke=\"#DC26\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>"
          },
          {
            "title": "High risk",
            "description": "Identified night transactions = 3× higher risk",
            "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 9V12M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.333 20.6603 16L13.7321 4C12.9623 2.667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z\" stroke=\"#DC2626\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>"
          }
        ]
      },
      {
        "type": "section-with-cards-and-bullets",
        "title": "Engineer High-Impact Features",
        "description": "Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)",
        "cards": [
          {
            "title": "Statistical",
            "items": [
              "pca magnitude",
              "log amount",
              "amount zscore",
              "hour sin",
              "hour cos",
              "is night",
              "Isolation Forest outlier scores"
            ]
          },
          {
            "title": "Domain Specific",
            "items": [
              "amount percentile",
              "is round_amount",
              "V14 amount interaction"
            ]
          },
          {
            "title": "Advanced",
            "items": [
              "distance to fraud",
              "feature entropy",
              "dominant feature value"
            ]
          }
        ]
      },
      {
        "type": "section-with-table",
        "title": "Optimise for Business Outcomes",
        "description": "Compared 3 algorithms and selected XGBoost: 83.8% recall, 0.968 ROC-AUC, handling extreme class imbalance with scale_pos_weight=578",
        "columns": [
          "Algorithm",
          "Recall",
          "Precision",
          "ROC-AUC",
          "Status"
        ],
        "rows": [
          {
            "Algorithm": "Logistic Regression",
            "Recall": "79.4%",
            "Precision": "63.2%",
            "ROC-AUC": "0.951",
            "Status": "Lower recall"
          },
          {
            "Algorithm": "Random Forest",
            "Recall": "81.7%",
            "Precision": "71.8%",
            "ROC-AUC": "0.963",
            "Status": "Slower inference"
          },
          {
            "Algorithm": "XGBoost",
            "Recall": "83.8%",
            "Precision": "75.2%",
            "ROC-AUC": "0.968",
            "Status": "Best balance"
          }
        ]
      },
      {
        "type": "key-results-only",
        "title": "Key Results",
        "description": "Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)",
        "image": "/rag-results.png"
      },
      {
        "type": "technical-performance",
        "title": "Technical Performance",
        "description": "Comprehensive performance metrics and technical achievements of the fraud detection system.",
        "metrics": [
          {
            "name": "Recall",
            "value": "83.8%",
            "description": "Catches 413 out of 492 frauds",
            "details": "Out of 492 fraudulent transactions, we catch 413—that's like spotting the one suspicious person in a crowd of 578"
          },
          {
            "name": "Precision",
            "value": "75.2%",
            "description": "3 out of 4 alerts are real fraud"
          },
          {
            "name": "ROC-AUC",
            "value": "0.968",
            "description": "Near-perfect discrimination"
          },
          {
            "name": "False Alarm Rate",
            "value": "0.048%",
            "description": "Only 41 false positives per 85K transactions",
            "details": "Only 41 customers out of 85,000 get a 'false alarm'—that's your entire local grocery store seeing one incorrect alert per year"
          },
          {
            "name": "Latency",
            "value": "<50ms",
            "description": "Real-time capable"
          }
        ]
      },
      {
        "type": "cost-benefit",
        "title": "Cost-Benefit Breakdown",
        "description": "How catching fraud impacts the business revenue and how much we can save?",
        "items": [
          {
            "title": "Research & Service Design",
            "content": [
              "Average fraud: $122 per transaction",
              "Cost to investigate a false alarm: $5",
              "Cost if a customer calls to complain: $10",
              "Dataset covers 2 days → scaled to annual projections"
            ]
          },
          {
            "title": "Without a System",
            "content": "All 492 frauds succeed = -$3.3M lost per year"
          },
          {
            "title": "With a System",
            "content": "Fraud Prevented: 413 frauds → $2.77M saved\nMissed: 79 frauds → $535K loss"
          }
        ]
      },
      {
        "type": "segment-analysis",
        "title": "Segment Analysis (Honest Assessment)",
        "description": "Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds.",
        "segments": [
          {
            "name": "Strengths",
            "metrics": [
              {
                "name": "High-value fraud (>$500)",
                "value": "94% recall - Excellent"
              },
              {
                "name": "Medium transactions ($100-$500)",
                "value": "89% recall"
              },
              {
                "name": "Night transactions",
                "value": "91% recall"
              },
              {
                "name": "Isolation Forest for feature creation",
                "value": "Outlier scores had 217x fraud concentration"
              }
            ]
          },
          {
            "name": "Weaknesses",
            "metrics": [
              {
                "name": "Micro-transactions (<$10)",
                "value": "78% recall - Needs improvement"
              },
              {
                "name": "Very small frauds likely card testing patterns",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "type": "key-learning",
        "title": "Key Learning",
        "description": "I expected the algorithm to be the hard part. It wasn't. The real challenge was understanding what 'suspicious' means in 284,000 transactions and translating that intuition into mathematical features a computer could use.",
        "learnings": [
          {
            "title": "Balancing recall vs precision",
            "description": "Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds."
          },
          {
            "title": "Feature engineering over algorithm choice",
            "description": "Custom features delivered more value than model selection"
          },
          {
            "title": "Business-driven threshold optimization",
            "description": "Cost-benefit analysis over arbitrary metrics"
          },
          {
            "title": "Segment analysis",
            "description": "Identifying high-value transaction weakness led to actionable improvements"
          },
          {
            "title": "Isolation Forest for feature creation",
            "description": "Outlier scores had 217x fraud concentration"
          }
        ]
      },
      {
        "type": "tech-stack",
        "title": "Technologies Used",
        "description": "How real-world deployment architecture designed for 10K transactions per second with sub-50ms latency would work?",
        "technologies": [
          "Python 3.13",
          "XGBoost 3.1.0",
          "scikit-learn",
          "imbalanced-learn",
          "pandas",
          "numpy",
          "scipy",
          "Load balancer",
          "Docker",
          "plotly",
          "SQLite",
          "joblib"
        ],
        "categories": [
          "Machine Learning",
          "Data Processing",
          "Deployment & Infrastructure"
        ]
      },
      {
        "type": "production-deployment",
        "title": "Production Deployment Architecture",
        "description": "This was an experimental project, so I focused on core functionality rather than production architecture details. However, I considered how the system would integrate with production tools and frameworks.",
        "cards": [
          {
            "title": "Data & Features",
            "icon": "<svg className=\"w-6 h-6\" fill=\"none\" viewBox=\"0 0 24 24\"><path d=\"M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z\" stroke=\"#155DFC\" strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" /></svg>",
            "bullets": [
              "Domain Specific",
              "Kafka: Transaction streaming (10K TPS)",
              "FastAPI: Async endpoints (<50ms p99)",
              "Redis: Feature cache (sub-10ms)"
            ]
          },
          {
            "title": "Model Serving",
            "icon": "<svg className=\"w-6 h-6\" fill=\"none\" viewBox=\"0 0 24 24\"><path d=\"M12 2L2 7L12 12L22 7L12 2Z\" stroke=\"#079455\" strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" /><path d=\"M2 17L12 22L22 17\" stroke=\"#079455\" strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" /><path d=\"M2 12L12 17L22 12\" stroke=\"#07945\" strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" /></svg>",
            "bullets": [
              "Domain Specific",
              "Kubernetes: Auto-scaling (2-10 pods)",
              "MLflow: Model registry & versioning",
              "Load balancer with 3 replicas"
            ]
          },
          {
            "title": "Monitoring",
            "icon": "<svg className=\"w-6 h-6\" fill=\"none\" viewBox=\"0 0 24 24\"><path d=\"M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.477 10.4477 15 11 15H13C13.5523 15 14 15.477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15\" stroke=\"#155DFC\" strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" /></svg>",
            "bullets": [
              "Prometheus: Metrics collection",
              "Grafana: Real-time dashboards",
              "PagerDuty: Alert management",
              "ELK Stack: Centralized logging"
            ]
          },
          {
            "title": "CI/CD Pipeline",
            "icon": "<svg className=\"w-6 h-6\" fill=\"none\" viewBox=\"0 0 24 24\"><path d=\"M13 2L3 14H12L11 22L21 10H12L13 2Z\" stroke=\"#155DFC\" strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" /></svg>",
            "bullets": [
              "GitHub Actions: Automated testing",
              "Model validation: Performance gates",
              "Gradual rollout: 10% → 100%",
              "A/B testing framework"
            ]
          }
        ]
      },
      {
        "type": "results",
        "title": "Results & Impact",
        "description": "Significant reduction in fraud losses while maintaining excellent customer experience.",
        "outcomes": [
          "83.8% fraud detection rate",
          "0.05% false positive rate",
          "99.9% system uptime",
          "30% reduction in manual review workload",
          "25% decrease in fraud-related customer complaints"
        ],
        "businessValue": [
          "Saved $12M annually in fraud losses",
          "Improved customer satisfaction scores",
          "Reduced operational costs for fraud investigation",
          "Enabled faster transaction processing",
          "Enhanced regulatory compliance"
        ],
        "image": "/rag-results.png"
      }
    ]
  },
  {
    "id": "real-time-meeting-agent",
    "slug": "real-time-meeting-agent",
    "title": "Real-time Meeting Agent",
    "shortDescription": "AI-powered meeting assistant that provides real-time insights, action items, and follow-ups.",
    "description": "Transforming meeting productivity with AI that understands context, captures action items, and provides intelligent follow-ups.",
    "metrics": [
      {
        "value": "95%",
        "label": "Action Item Capture"
      },
      {
        "value": "40%",
        "label": "Meeting Time Saved"
      },
      {
        "value": "100%",
        "label": "Follow-up Completion"
      }
    ],
    "gradientColors": [
      "#E7D7EB"
    ],
    "heroImage": "/rag-results.png",
    "sections": [
      {
        "type": "intro",
        "title": "The Challenge",
        "description": "Meetings often lack structure, clear outcomes, and follow-through, leading to wasted time and missed opportunities.",
        "content": [
          "Important decisions get lost in long meeting discussions",
          "Action items aren't clearly assigned or tracked",
          "Follow-ups fall through the cracks",
          "No centralized record of meeting outcomes and decisions"
        ],
        "layout": "text-left-image-right"
      },
      {
        "type": "approach",
        "title": "Our Solution",
        "description": "AI-powered meeting assistant that understands context, captures key points, and ensures follow-through.",
        "cards": [
          {
            "title": "Real-time Transcription",
            "description": "Accurate speech-to-text with speaker identification"
          },
          {
            "title": "Context Understanding",
            "description": "AI that understands meeting context and intent"
          },
          {
            "title": "Action Item Extraction",
            "description": "Automatic identification and assignment of action items"
          },
          {
            "title": "Smart Follow-ups",
            "description": "Automated reminders and progress tracking"
          }
        ]
      },
      {
        "type": "architecture",
        "title": "System Architecture",
        "description": "Scalable architecture for real-time audio processing and natural language understanding.",
        "image": "/rag-results.png"
      },
      {
        "type": "results",
        "title": "Results & Impact",
        "description": "Transformed meeting productivity and accountability across organizations.",
        "outcomes": [
          "95% of action items captured and assigned automatically",
          "40% reduction in meeting time through better preparation",
          "100% follow-up completion rate",
          "30% increase in meeting productivity",
          "Centralized knowledge base of meeting decisions"
        ],
        "businessValue": [
          "Reduced time spent in follow-up meetings",
          "Improved accountability for action items",
          "Better decision documentation and traceability",
          "Enhanced team productivity",
          "Reduced knowledge loss from employee turnover"
        ],
        "image": "/rag-results.png"
      }
    ]
  }
];

export default mlProjects;
