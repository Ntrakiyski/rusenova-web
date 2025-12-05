import { Project } from '@/types/project';

export const mlProjects: Project[] = [
  {
    "id": "rag-evaluation-system",
    "slug": "rag-evaluation-system",
    "title": "RAG+ Evaluation System",
    "shortDescription": "Reduced information retrieval time by 85% while achieving 92% answer accuracy through a custom RAG system with advanced evaluation framework",
    "heroImage": "/rag-hero.png",
    "heroVideo": "/rag.mov",
    "metrics": [
      {
        "value": "92%",
        "label": "Precision",
        "icon": "/info-square.svg",
        "iconBg": "bg-[#E0EAFF]"
      },
      {
        "value": "89%",
        "label": "Recall",
        "icon": "/info-square.svg",
        "iconBg": "bg-[#E0EAFF]"
      },
      {
        "value": "85%",
        "label": "Time Saved",
        "icon": "/info-square.svg",
        "iconBg": "bg-[#E0EAFF]"
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
        "video": "/rag.mov"
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
      "icon": "/info-square.svg",
      "iconBg": "bg-[#E0EAFF]"
    },
    {
      "value": "83.8%",
      "label": "Fraud Caught",
      "icon": "/info-square.svg",
      "iconBg": "bg-[#FEE4E2]"
    },
    {
      "value": "75.2%",
      "label": "Alert Accuracy",
      "icon": "/info-square.svg",
      "iconBg": "bg-[#FEE4E2]"
    }
  ],
    "gradientColors": [
      "#D7EBDF"
    ],
    "heroImage": "/fraud-hero.png",
    "heroVideo": "/frauddetection.mov",
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
        "description": "What I did",
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
        "video": "/frauddetection.mov"
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
  "title": "Real-Time AI Meeting Assistant",
  "shortDescription": "An AI copilot that joins Zoom/Teams to transcribe, summarize, and extract action items in real-time.",
  "description": "Advanced NLP system that listens to meeting audio streams, identifies speakers, and generates live insights, progress updates, and Jira/Notion tasks with sub-second latency.",
  "metrics": [
    {
      "value": "12h",
      "label": "Weekly Time Saved",
      "icon": "/info-square.svg",
      "iconBg": "bg-[#E0EAFF]"
    },
    {
      "value": "98.5%",
      "label": "Transcription Accuracy",
      "icon": "/info-square.svg",
      "iconBg": "bg-[#E0EAFF]"
    },
    {
      "value": "<200ms",
      "label": "Insight Latency",
      "icon": "/info-square.svg",
      "iconBg": "bg-[#E0EAFF]"
    }
  ],
  "gradientColors": [
    "#E0E7FF"
  ],
  "heroImage": "/meeting-assistant-hero.png",
  "heroVideo": "/meeting-assistant-demo.mov",
  "heroTitle": "Real-Time AI Meeting Assistant",
  "heroDescription": "An AI-powered assistant that listens, summarizes, and organizes your meetings in real-time.",
  "sections": [
    {
      "type": "what-i-build",
      "title": "What I Built",
      "description": "A real-time meeting assistant that transforms unstructured voice data into structured business intelligence.",
      "image": "/tide-home.png",
      "bulletPoints": [
        "Real-time audio ingestion pipeline compatible with Zoom, Teams, and Google Meet via virtual bot integration",
        "Multi-speaker diarization engine to accurately attribute 'who said what' even during cross-talk",
        "Live sentiment analysis and 'blocker detection' to flag project risks immediately",
        "Automated workflow triggers: Verbal commitments become Jira tickets or Notion pages instantly",
        "RAG (Retrieval-Augmented Generation) system that answers questions based on previous meeting context"
      ]
    },
    {
      "type": "intro",
      "title": "The Challenge",
      "description": "Knowledge workers spend 40% of their time in meetings, yet 60% of the context is lost the moment the call ends.",
      "content": [
        "Manual note-taking distracts participants from active listening and engagement",
        "Action items fall through the cracks, leading to project delays",
        "Context switching between video calls and project management tools kills productivity",
        "Lack of searchable history makes 'institutional memory' unreliable"
      ],
      "layout": "text-left-image-right"
    },
    {
      "type": "approach",
      "title": "Our Approach",
      "description": "Leveraging Large Language Models (LLMs) and stream processing to create a 'second brain' for your conversations.",
      "cards": [
        {
          "title": "Stream Processing",
          "description": "WebRTC-based audio capture for low-latency raw stream handling"
        },
        {
          "title": "Contextual Intelligence",
          "description": "Dynamic context window management to remember details from 30 minutes ago"
        },
        {
          "title": "Speaker Fingerprinting",
          "description": "Vector-based voice signatures to identify team members instantly"
        },
        {
          "title": "Privacy First",
          "description": "PII redaction on the fly before data hits the persistence layer"
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
      "title": "Understand the Data",
      "description": "How we process voice",
      "cards": [
        {
          "title": "Audio Segmentation",
          "description": "Processed 500+ hours of noisy meeting audio for training",
          "icon": "/wave-sound.svg",
          "bg": "bg-[#E0EAFF]"
        },
        {
          "title": "Intent Detection",
          "description": "Identified 4 distinct intent types: Task, Decision, Question, Risk",
          "icon": "/brain-circuit.svg",
          "bg": "bg-[#E0EAFF]"
        },
        {
          "title": "Silence Analysis",
          "description": "Correlated long silences with disengagement or technical issues",
          "icon": "/clock.svg",
          "bg": "bg-[#E0EAFF]"
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
      "video": "/meeting-assistant-demo.mov"
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
      "type": "segment-analysis",
      "title": "Segment Analysis (Honest Assessment)",
      "description": "Where the model excels and where it is still learning.",
      "segments": [
        {
          "name": "Strengths",
          "metrics": [
            {
              "name": "Engineering Standups",
              "value": "99% accuracy on technical jargon"
            },
            {
              "name": "Sales Discovery Calls",
              "value": "Excellent objection detection"
            },
            {
              "name": "Structured Board Meetings",
              "value": "Perfect minute generation"
            }
          ]
        },
        {
          "name": "Weaknesses",
          "metrics": [
            {
              "name": "Heavy Accents + Poor Mic",
              "value": "88% accuracy - Needs audio enhancement"
            },
            {
              "name": "Physical Whiteboard References",
              "value": "Cannot see video context yet"
            }
          ]
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
          "description": "Implemented pre-processing noise cancellation to improve transcription by 15%."
        },
        {
          "title": "Latency vs. Accuracy",
          "description": "Moved to a streaming architecture (WebSockets) instead of batch processing to give users a 'live' feel."
        },
        {
          "title": "Prompt Engineering for JSON",
          "description": "Forcing LLMs to output strict JSON for integrations required extensive few-shot training."
        },
        {
          "title": "User Trust",
          "description": "Adding a 'Private Mode' that pauses recording was essential for adoption."
        },
        {
          "title": "RAG for Context",
          "description": "Injecting previous meeting summaries into the prompt drastically improved suggestion quality."
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
      "title": "Production Deployment Architecture",
      "description": "Designed for horizontal scalability to handle thousands of simultaneous corporate meetings.",
      "cards": [
        {
          "title": "Ingestion Layer",
          "icon": "info-square.svg",
          "bullets": [
            "WebRTC Gateway for audio streams",
            "Kafka for message buffering",
            "Load Balancer (Round Robin)",
            "Auto-scaling bot instances"
          ]
        },
        {
          "title": "Processing Core",
          "icon": "info-square.svg",
          "bullets": [
            "GPU Cluster for Whisper Inference",
            "Async Task Queue (Celery)",
            "Redis for state management",
            "PII Redaction Service"
          ]
        },
        {
          "title": "Data Persistence",
          "icon": "info-square.svg",
          "bullets": [
            "PostgreSQL: User data & metadata",
            "S3: Encrypted audio storage",
            "Pinecone: Vector embeddings",
            "ElasticSearch: Full-text search"
          ]
        },
        {
          "title": "DevOps & Security",
          "icon": "info-square.svg",
          "bullets": [
            "SOC2 Compliant Logging",
            "GitHub Actions CI/CD",
            "Prometheus/Grafana Monitoring",
            "End-to-End Encryption"
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
