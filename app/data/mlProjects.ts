import { Project } from '@/types/project';


export const mlProjects: Project[] = [
  {
    "id": "rag-evaluation-system",
    "slug": "rag-evaluation-system",
    "title": "RAG+ Evaluation System",
    "shortDescription": "Reduced information retrieval time by 85% while achieving 92% answer accuracy through a custom RAG system with advanced evaluation framework",
    "heroImage": "/rag-hero.png",
    "heroVideo": "/rag.gif",
    "metrics": [
      {
        "value": "92%",
        "label": "Precision",
        "icon": "/aim.svg",
        "iconBg": "bg-[#DCFAE6]"
      },
      {
        "value": "89%",
        "label": "Recall",
        "icon": "/marker-pin.svg",
        "iconBg": "bg-[#F4EBFF]"
      },
      {
        "value": "85%",
        "label": "Time Saved",
        "icon": "/clock-check.svg",
        "iconBg": "bg-[#FEF0C7]"
      }
    ],
    "sections": [
         {
        "type": "what-i-build",
        "title": "What I Built",
        "description": "A comprehensive RAG system that transforms how organizations access and utilize their document repositories.",
        "image": "/rag-results.png",
        "bulletPoints": [
          "A RAG (Retrieval-Augmented Generation) system with two-stage retrieval (vector search + AI re-ranking) for 40% better relevance",
          "A custom evaluation framework to measure how well the system actually performs",
          "Most LLMs struggle when they encounter information they haven't seen during training",
          "Without proper evaluation, you can't guarantee your results are correct",
          "The framework shows exactly where the system fails and by how much"
        ]
      },
      {
        "type": "intro",
        "title": "The Challenge",
        "description": "Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.",
        "content": [
          "Organizations struggle to extract insights from vast document repositories, with teams spending hours daily searching through technical documentation.",
          "Traditional keyword search misses 60% of relevant information due to semantic gaps, leading to duplicated work and missed opportunities.",
          "Manual information retrieval creates bottlenecks in decision-making and significantly increases onboarding time for new team members."
        ],
        "layout": "text-left-image-right",
        "image": "/fraud-key-learning.png"
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
        "image": "/rag-results.png",
        "video": "/rag-big.gif"
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
    ],
    "heroTitle": "RAG+ Evaluation System"
  },
  {
    "id": "fraud-detection-system",
    "slug": "fraud-detection-system",
    "title": "Fraud Detection System",
    "shortDescription": "An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%",
    "description": "Advanced machine learning model trained on transaction patterns to identify fraudulent activities in real-time with high precision and low false positive rate.",
"metrics": [
    {
      "value": "2.7M",
      "label": "Annual Savings",
      "icon": "/piggy-bank.svg",
      "iconBg": "bg-[#DCFAE6]"
    },
    {
      "value": "83.8%",
      "label": "Fraud Caught",
      "icon": "/trend-up.svg",
      "iconBg": "bg-[#FEE4E2]"
    },
    {
      "value": "75.2%",
      "label": "Alert Accuracy",
      "icon": "/alert-triangle.svg",
      "iconBg": "bg-[#FEE4E2]"
    }
  ],
    "gradientColors": [
      "#D7EBDF"
    ],
    "heroImage": "/fraud-hero.png",
    "heroVideo": "/frauddetection.gif",
    "sections": [
      {
        "type": "what-i-build",
        "title": "What I Built",
        "description": "An AI-powered fraud detection system that catches 84% of fraud while keeping false alarms under 0.05%.",
        "image": "/fraud-key-learning.png",
        "bulletPoints": [
          "An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%",
          "Advanced machine learning model trained on transaction patterns to identify fraudulent activities in real-time",
          "Created 21 custom features in 3 tiers - top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)",
          "Compared 3 algorithms and selected XGBoost: 83.8% recall, 0.968 ROC-AUC, handling extreme class imbalance with scale_pos_weight=578",
          "Real-time processing with sub-100ms response time for transaction approvals"
        ]
      },
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
        "type": "section-with-cards",
        "title": "Understand the Data",
        "description": "",
        "cards": [
          {
            "title": "Transaction analyses",
            "description": "Analyzed 284K transactions over 2 days",
            "icon": "/info-square.svg",
            "bg": "bg-[#E0EAFF]"
          },
          {
            "title": "Outliers",
            "description": "Discovered isolation forest outliers had 217× fraud concentration",
            "icon": "/info-square.svg",
            "bg": "bg-[#E0EAFF]"
          },
          {
            "title": "High risk",
            "description": "Identified night transactions = 3× higher risk",
            "icon": "/info-square.svg",
            "bg": "bg-[#E0EAFF]"
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
            ],
            "icon": "/info-square.svg",
            "bg": "bg-[#E0EAFF]"
          },
          {
            "title": "Domain Specific",
            "items": [
              "amount percentile",
              "is round_amount",
              "V14 amount interaction"
            ],
            "icon": "/info-square.svg",
            "bg": "bg-[#E0EAFF]"
          },
          {
            "title": "Advanced",
            "items": [
              "distance to fraud",
              "feature entropy",
              "dominant feature value"
            ],
            "icon": "/info-square.svg",
            "bg": "bg-[#E0EAFF]"
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
        "image": "/fraud-results.png",
        "video": "/frauddetection-big.gif"
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
            "title": "Without a System",
            "icon": "/info-square.svg",
            "iconBg": "bg-[#E0EAFF]",
            "content": ["All 492 frauds succeed = -$3.3M lost per year"]
          },
          {
            "title": "With a System",
            "icon": "/info-square.svg",
            "iconBg": "bg-[#E0EAFF]",
            "content": ["Fraud Prevented: 413 frauds → $2.77M saved", "Missed: 79 frauds → $535K loss"]
          }
        ]
      },
      {
        "type": "segment-analysis",
        "title": "Segment Analysis (Honest Assessment)",
        "description": "Balancing recall (catch fraud) vs. precision (minimize false alarms) without business context. Solved by calculating cost-benefit tradeoffs at different thresholds.",
        "items": [
          {
            "title": "Strengths",
            "icon": "/info-square.svg",
            "iconBg": "bg-[#E0EAFF]",
            "content": [
              "High-value fraud (>$500): 94% recall - Excellent",
              "Medium transactions ($100-$500): 89% recall",
              "Night transactions: 91% recall",
              "Isolation Forest for feature creation: Outlier scores had 217x fraud concentration"
            ]
          },
          {
            "title": "Weaknesses",
            "icon": "/info-square.svg",
            "iconBg": "bg-[#E0EAFF]",
            "content": [
              "Micro-transactions (<$10): 78% recall - Needs improvement",
              "Very small frauds likely card testing patterns"
            ]
          }
        ]
      },
      {
        "type": "key-learning",
        "title": "What Worked Well",
        "image": "/fraud-key-learning.png",
        "description": "",
        "learnings": [
          {
            "title": "Balancing recall vs precision",
            "boldWords": "Balancing recall vs precision"
          },
          {
            "title": "Feature engineering over algorithm choice",
            "boldWords": "Feature engineering over algorithm choice"
          },
          {
            "title": "Business-driven threshold optimization",
            "boldWords": "Business-driven threshold optimization"
          },
          {
            "title": "Segment analysis",
            "boldWords": "Segment analysis"
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
            "icon": "info-square.svg",
            "bullets": [
              "Domain Specific",
              "Kafka: Transaction streaming (10K TPS)",
              "FastAPI: Async endpoints (<50ms p99)",
              "Redis: Feature cache (sub-10ms)"
            ]
          },
          {
            "title": "Model Serving",
            "icon": "info-square.svg",
            "bullets": [
              "Domain Specific",
              "Kubernetes: Auto-scaling (2-10 pods)",
              "MLflow: Model registry & versioning",
              "Load balancer with 3 replicas"
            ]
          },
          {
            "title": "Monitoring",
            "icon": "info-square.svg",
            "bullets": [
              "Prometheus: Metrics collection",
              "Grafana: Real-time dashboards",
              "PagerDuty: Alert management",
              "ELK Stack: Centralized logging"
            ]
          },
          {
            "title": "CI/CD Pipeline",
            "icon": "info-square.svg",
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
    ],
    "heroTitle": "Fraud Detection System",
    "heroDescription": "An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%"
  },
  {
  "id": "ai-meeting-assistant",
  "slug": "ai-meeting-assistant",
  "title": "Real-Time AI Assistant",
  "shortDescription": "Real-time AI Meeting agent which reduces meeting follow-up time by 75%",
  "description": "Real-time AI Meeting agent which reduces meeting follow-up time by 75%",
  "heroImage": "/meeting-assistant-hero.png",
  "heroVideo": "/real-time-assistant.gif",
  "heroTitle": "Real-Time Meeting Agent",
  "heroDescription": "Real-time AI Meeting agent which reduces meeting follow-up time by 75%",
  "metrics": [
    {
      "value": "<2 second latency",
      "label": "for real-time transcription",
      "icon": "/info-square.svg",
      "iconBg": "bg-[#E0EAFF]"
    },
    {
      "value": "90% accuracy",
      "label": "in agenda progress tracking",
      "icon": "/trend-up.svg",
      "iconBg": "bg-[#FEE4E2]"
    },
    {
      "value": "3-5 actionable insights",
      "label": "generated per 15-minute segment",
      "icon": "/alert-triangle.svg",
      "iconBg": "bg-[#FEE4E2]"
    }
  ],
  "gradientColors": [
    "#E0E7FF" 
  ],
  "sections": [
    {
      "type": "what-i-build",
      "title": "What I Built",
      "description": "A real-time meeting assistant that transforms unstructured voice data into structured business intelligence.",
      "image": "/assistant.png",
      "bulletPoints": [
        "Three-layer architecture – speech recognition, natural language understanding, and intelligent analysis",
        "Four core capabilities – real-time transcription, automatic insight extraction, agenda progress tracking, and proactive suggestions"
      ],
      "boldWords": ["Three-layer architecture ","Four core capabilities"]
    },
    {
      "type": "intro",
      "title": "The Meeting Intelligence Gap",
      "description": "The problem isn't only the meetings themselves, but the cognitive overhead required to capture, synthesize, and act on what was discussed.",
      "image": "/meeting-assistant.png",
      "content": [
        "Information Loss - Critical decisions and action items get lost in conversation flow",
        "Cognitive Overload - Participants can't fully engage while trying to take notes",
        "Delayed Insights - By the time meeting notes are reviewed, context is lost",
        "No Real-Time Guidance - Meetings drift off-topic without immediate feedback"
      ],
      "layout": "text-left-image-right"
    },
    {
      "type": "system-approach",
      "title": "Selecting The Right Approach",
      "description": "The system processes audio in real-time, transforming raw speech into structured intelligence that helps teams stay focused and capture value",
      "cards": [
        {
          "title": "Audio Input"
        },
        {
          "title": "Whisper API"
        },
        {
          "title": "LLM Analyses"
        },
        {
          "title": "Real-time UI"
        }
      ]
    },
    {
      "type": "architecture",
      "title": "System Architecture",
      "description": "Event-driven architecture designed to handle concurrent audio streams and heavy NLP inference loads.",
      "image": "/architecture-diagram.png"
    },
    {
      "type": "section-with-cards",
      "title": "Performance Benchmarks",
      "description": "",
      "cards": [
        {
          "title": "<2s Latency",
          "description": "Audio to transcript",
          "icon": "/info-square.png",
          "bg": "bg-[#DBEAFE]"
        },
        {
          "title": " 95%+ Parse Rate",
          "description": "LLM response parsing",
          "icon": "/trend-up.svg",
          "bg": "bg-[#FEE4E2]"
        },
        {
          "title": "99.2% Uptime",
          "description": "API reliability",
          "icon": "/alert-triangle.svg",
          "bg": "bg-[#FEE4E2]"
        },
        {
          "title": "87% Dedup Rate",
          "description": "Duplicate reduction",
          "icon": "/alert-triangle.svg",
          "bg": "bg-[#FEE4E2]"
        }
      ]
    },
    {
      "type": "section-with-cards-and-bullets",
      "title": "Engineer High-Impact Features",
      "description": "Built a custom NLP pipeline. The 'Commitment Extraction' feature became the most valued utility by PMs.",
      "cards": [
        {
          "title": "NLP Features",
          "items": [
            "Named Entity Recognition (NER)",
            "Sentiment Scoring",
            "Topic Clustering",
            "Summarization",
            "Key Decision Extraction",
            "Objection Handling Suggestions"
          ],
          "icon": "/code.svg",
          "bg": "bg-[#E0EAFF]"
        },
        {
          "title": "Integrations",
          "items": [
            "Jira Ticket Creation",
            "Slack Notifications",
            "Salesforce CRM Sync",
            "Notion Page Generation"
          ],
          "icon": "/link.svg",
          "bg": "bg-[#E0EAFF]"
        },
        {
          "title": "Real-Time Assist",
          "items": [
            "Live Fact Checking",
            "Agenda Adherence Tracking",
            "Speaking Time Balance"
          ],
          "icon": "/zap.svg",
          "bg": "bg-[#E0EAFF]"
        }
      ]
    },
    {
      "type": "section-with-table",
      "title": "Optimise for Business Outcomes",
      "description": "Compared generic transcription APIs vs. our fine-tuned meeting model.",
      "columns": [
        "Solution",
        "Tech Term Accuracy",
        "Action Item Recall",
        "Latency",
        "Status"
      ],
      "rows": [
        {
          "Solution": "Generic Whisper API",
          "Tech Term Accuracy": "72%",
          "Action Item Recall": "65%",
          "Latency": "4.5s",
          "Status": "Too slow/inaccurate"
        },
        {
          "Solution": "Human Note Taker",
          "Tech Term Accuracy": "85%",
          "Action Item Recall": "80%",
          "Latency": "24 hours",
          "Status": "Non-scalable"
        },
        {
          "Solution": "Custom Fine-Tuned Model",
          "Tech Term Accuracy": "96%",
          "Action Item Recall": "95%",
          "Latency": "0.8s",
          "Status": "Production Ready"
        }
      ]
    },
    {
      "type": "key-results-only",
      "title": "Key Results",
      "description": "Achieved 95% accuracy in extracting engineering tasks and assigning them to the correct owner automatically.",
      "image": "/results-dashboard.png",
      "video": "/real-time-assistant-big.gif"
    },
    {
      "type": "technical-performance",
      "title": "Technical Performance",
      "description": "Benchmarking the system under high-load scenarios with concurrent meetings.",
      "metrics": [
        {
          "name": "Diarization Error",
          "value": "<4%",
          "description": "Correctly identifies speaker changes",
          "details": "Even in heated debates with overlapping speech, the system correctly attributes quotes 96% of the time."
        },
        {
          "name": "End-to-End Latency",
          "value": "800ms",
          "description": "From speech to text on screen"
        },
        {
          "name": "Context Window",
          "value": "128k",
          "description": "Tokens supported for long meetings"
        },
        {
          "name": "Hallucination Rate",
          "value": "<0.1%",
          "description": "Extremely low false fabrication",
          "details": "Using RAG and strict prompt engineering, we ensure the AI never invents tasks that weren't discussed."
        },
        {
          "name": "Concurrency",
          "value": "500+",
          "description": "Simultaneous meetings supported"
        }
      ]
    },
    {
      "type": "cost-benefit",
      "title": "Cost-Benefit Breakdown",
      "description": "The ROI of automating meeting administration.",
      "items": [
        {
          "title": "The Cost of Meetings",
          "content": [
            "Avg Engineer Salary: $80/hr",
            "Avg PM Salary: $90/hr",
            "Time spent organizing notes: 15 mins per hour of meeting",
            "Cost of missed follow-up: Project delays"
          ]
        },
        {
          "title": "Manual Process",
          "content": "Team of 5 in a 1hr meeting = $425 cost + $100 admin time = $525/meeting"
        },
        {
          "title": "With AI Assistant",
          "content": "Admin time reduced to 0. Cost per meeting = $0.50 (Compute). Savings = $99.50 per meeting."
        }
      ]
    },
    {
      "type": "section-with-cards",
      "title": "Performance Metrics",
      "description": "Key performance indicators for the real-time meeting agent.",
      "cards": [
        {
          "title": "<2s Latency",
          "description": "Audio to transcript conversion happens in under 2 seconds with 95%+ parse rate",
          "icon": "/clock.svg",
          "bg": "bg-[#E0EAFF]"
        },
        {
          "title": "99.2% Uptime",
          "description": "Reliable API performance ensuring consistent meeting transcription service",
          "icon": "/shield-check.svg",
          "bg": "bg-[#FEE4E2]"
        },
        {
          "title": "87% Dedup Rate",
          "description": "Duplicate reduction through intelligent parsing and LLM response processing",
          "icon": "/refresh-cw.svg",
          "bg": "bg-[#FEF6EE]"
        },
        {
          "title": "Real-time Processing",
          "description": "Audio to transcript, LLM response parsing, and API reliability all optimized for real-time performance",
          "icon": "/zap.svg",
          "bg": "bg-[#DCF4E2]"
        },
        {
          "title": "95%+ Parse Rate",
          "description": "High accuracy in parsing speech to text with advanced error correction",
          "icon": "/check-circle.svg",
          "bg": "bg-[#E2F4DC]"
        }
      ]
    },
    {
      "type": "key-learning",
      "title": "Key Learning",
      "description": "Transcribing text was easy. Understanding *intent* and *context* in a multi-person conversation was the real engineering challenge.",
      "learnings": [
        {
          "title": "Audio Quality is King",
          "boldWords": "Implemented pre-processing noise cancellation to improve transcription by 15%."
        },
        {
          "title": "Latency vs. Accuracy",
          "boldWords": "Moved to a streaming architecture (WebSockets) instead of batch processing to give users a 'live' feel."
        },
        {
          "title": "Prompt Engineering for JSON",
          "boldWords": "Forcing LLMs to output strict JSON for integrations required extensive few-shot training."
        },
        {
          "title": "User Trust",
          "boldWords": "Adding a 'Private Mode' that pauses recording was essential for adoption."
        },
        {
          "title": "RAG for Context",
          "boldWords": "Injecting previous meeting summaries into the prompt drastically improved suggestion quality."
        }
      ]
    },
    {
      "type": "tech-stack",
      "title": "Technologies Used",
      "description": "A high-performance stack built for real-time audio processing and LLM orchestration.",
      "technologies": [
        "Python 3.11",
        "OpenAI Whisper (Fine-tuned)",
        "GPT-4o",
        "LangChain",
        "Pinecone (Vector DB)",
        "Redis",
        "WebRTC",
        "FastAPI",
        "React / Next.js",
        "Docker",
        "Kubernetes",
        "Kafka"
      ],
      "categories": [
        "AI/ML Models",
        "Real-time Infrastructure",
        "Frontend & API"
      ]
    },
    {
      "type": "production-deployment",
      "title": "Core Capabilities",
      "description": "Built on a three-layer architecture combining speech recognition, natural language understanding, and intelligent analysis",
      "cards": [
        {
          "title": "Real-Time Transcription",
          "icon": "chat.png",
          "iconBg": "bg-[#FEF0C7]",
          "bullets": [
            "Sub-second audio-to-text conversion that handles overlapping speech, multiple speakers, and background noise effectively",
            "Groq Whisper API + Stream Processing"
          ]
        },
        {
          "title": "Intelligent Insight Extraction",
          "icon": "star.png",
          "iconBg": "bg-[#F4EBFF]",
          "bullets": [
            "Automatically identifies decisions, commitments, and key information using context-aware prompts that filter out fluff",
            "Custom LLM Prompts + Context Windows"
          ]
        },
        {
          "title": "Agenda Progress Tracking",
          "icon": "green-check.png",
          "iconBg": "bg-[#DCFAE6]",
          "bullets": [
            "Real-time semantic matching against agenda items to keep meetings on track and ensure all key topics are covered",
            "Semantic Search + State Management"
          ]
        },
        {
          "title": "Proactive Suggestions",
          "icon": "gray-info.png",
          "iconBg": "bg-[#F2F2F7]",
          "bullets": [
            "Generates real-time recommendations, questions, and warnings to prevent off-topic drift and missed opportunities",
            "Multi-class Classification"
          ]
        }
      ]
    },
    {
      "type": "results",
      "title": "Results & Impact",
      "description": "Transforming how teams collaborate by removing the administrative burden of meetings.",
      "outcomes": [
        "12 hours saved per employee/week",
        "95% reduction in 'forgotten' tasks",
        "99.9% system uptime",
        "Seamless integration with 50+ tools",
        "Adopted by 15 enterprise teams in beta"
      ],
      "businessValue": [
        "Estimated $500k annual productivity gain per 100 employees",
        "Faster project delivery cycles",
        "Improved employee satisfaction (less admin work)",
        "Better accountability through automated tracking",
        "Centralized knowledge base for the organization"
      ],
      "image": "/impact-graph.png"
    }
  ]
}
];

export default mlProjects;
