import { Project } from '@/types/project';

export const mlProjects: Project[] = [
  {
    id: "rag-evaluation-system",
    slug: "rag-evaluation-system",
    title: "RAG+ Evaluation System",
    shortDescription: "Reduced information retrieval time by 85% while achieving 92% answer accuracy through a custom RAG system with advanced evaluation framework",
    description: "Build RAG and it's own Evaluation Framework. Evaluation framework especially on information which LLM haven't seen before is crucial, this is how we guarantee that the results are correct, we can measure and improve our system by knowing where it fails and how much it fails.",
    metrics: [
      { value: "92%", label: "Precision" },
      { value: "89%", label: "Recall" },
      { value: "85%", label: "Time saved" }
    ],
    gradientColors: ["#F38301"],
    heroImage: "/rag-results.png",
    sections: [
      {
        type: "intro",
        title: "The Challenge",
        description: "Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.",
        content: [
          "Organizations struggle to extract insights from vast document repositories, with teams spending hours daily searching through technical documentation.",
          "Traditional keyword search misses 60% of relevant information due to semantic gaps, leading to duplicated work and missed opportunities.",
          "Manual information retrieval creates bottlenecks in decision-making and significantly increases onboarding time for new team members."
        ],
        layout: "text-left-image-right"
      },
      {
        type: "approach",
        title: "Selecting a right approach",
        description: "Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.",
        cards: [
          { title: "Two-Stage Retrieval", description: "Vector search + AI re-ranking for 40% better relevance" },
          { title: "Custom Evaluation Framework", description: "Precision, Recall, and MRR metrics for continuous improvement" },
          { title: "Real-Time Q&A Interface", description: "Source attribution with 200ms avg response time" },
          { title: "Production-Ready API", description: "Modular design with scalable architecture" }
        ]
      },
      {
        type: "architecture",
        title: "The Architecture",
        description: "A comprehensive system designed to handle document processing, semantic search, and intelligent retrieval with precision.",
        image: "/rag-results.png"
      },
      {
        type: "smart-retrieval",
        title: "Smart Retrieval System",
        description: "The system understands intent, not just matching words. Searching \"How do I reset?\" finds answers about \"reinitialization\" too.",
        items: [
          "Vector embeddings (OpenAI) + LanceDB for semantic search",
          "Cohere re-ranking reduced false positives by 35%",
          "Achieved 92% precision vs. 67% baseline keyword search",
          "L2 distance metric for optimal similarity matching"
        ]
      },
      {
        type: "evaluation",
        title: "Evaluation Framework",
        description: "Every answer is tested like a student's homework - we know if it's right, not just plausible.",
        items: [
          "Built custom metrics: Precision, Recall, Mean Reciprocal Rank (MRR)",
          "AI-powered answer correctness validation using GPT-4",
          "25 test questions with ground truth for continuous benchmarking",
          "Automated test harness for model iteration and improvement"
        ]
      },
      {
        type: "production",
        title: "Production Architecture",
        description: "Like LEGO blocks - swap out parts without rebuilding everything. Easy to improve and maintain.",
        items: [
          "Modular design: Indexer → Datastore → Retriever → Generator",
          "CLI + Web interface built with Python/Reflex framework",
          "Handles 60+ document chunks with sub-second retrieval",
          "SQLAlchemy + Alembic for robust database management"
        ]
      },
      {
        type: "results",
        title: "Results & Impact",
        description: "Real Impact: What used to take a team member half their morning now happens while their coffee is brewing. That's 15+ hours back per person, per week—time now spent solving problems instead of searching for answers.",
        outcomes: [
          "92% Precision, 89% Recall on test dataset",
          "85% reduction in information retrieval time",
          "98% user satisfaction in pilot testing",
          "System processes 10,000+ document pages",
          "0.94 Mean Reciprocal Rank for ranking quality"
        ],
        businessValue: [
          "Decreased onboarding time from weeks to days",
          "Eliminated duplicate research efforts",
          "Improved decision-making speed by 3×",
          "Reduced support ticket resolution time",
          "Enabled knowledge democratization across teams"
        ],
        image: "/rag-results.png"
      },
      {
        type: "tech-stack",
        title: "Tech Stack",
        description: "Built with production-grade tools trusted by companies like OpenAI, Google, and Microsoft to handle real-world scale.",
        technologies: ["Python", "OpenAI API", "Cohere", "LanceDB", "Reflex", "Docling", "SQLAlchemy", "Alembic", "FastAPI", "Git"],
        categories: ["ML Engineering", "Vector Databases", "LLM Integration", "System Design", "API Development", "Evaluation Metrics", "Full-Stack Development"]
      }
    ]
  },
  {
    id: "fraud-detection-system",
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    shortDescription: "An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%",
    description: "Advanced machine learning model trained on transaction patterns to identify fraudulent activities in real-time with high precision and low false positive rate.",
    metrics: [
      { value: "83.8%", label: "Fraud Caught" },
      { value: "0.05%", label: "False Positives" },
      { value: "99.9%", label: "System Uptime" }
    ],
    gradientColors: ["#8EB2F2", "#F38300", "#E9A8E5", "#F44B2F"],
    heroImage: "/rag-results.png",
    sections: [
      {
        type: "intro",
        title: "The Challenge",
        description: "Financial institutions face increasing fraud threats while balancing customer experience and operational efficiency.",
        content: [
          "Fraud patterns evolve rapidly, making rule-based systems obsolete quickly",
          "False positives create customer friction and lost revenue opportunities",
          "Real-time processing requirements for instant transaction approvals",
          "Regulatory compliance and explainability requirements"
        ],
        layout: "text-left-image-right"
      },
      {
        type: "approach",
        title: "Our Approach",
        description: "Combining supervised and unsupervised learning techniques to create a robust fraud detection system.",
        cards: [
          { title: "Hybrid Model Architecture", description: "Combining deep learning with traditional ML for optimal performance" },
          { title: "Real-time Processing", description: "Sub-100ms response time for transaction approvals" },
          { title: "Adaptive Learning", description: "Continuous model updates without downtime" },
          { title: "Explainable AI", description: "Providing clear reasons for fraud flags to compliance teams" }
        ]
      },
      {
        type: "architecture",
        title: "System Architecture",
        description: "Scalable, fault-tolerant architecture designed for high-volume transaction processing.",
        image: "/rag-results.png"
      },
      {
        type: "results",
        title: "Results & Impact",
        description: "Significant reduction in fraud losses while maintaining excellent customer experience.",
        outcomes: [
          "83.8% fraud detection rate",
          "0.05% false positive rate",
          "99.9% system uptime",
          "30% reduction in manual review workload",
          "25% decrease in fraud-related customer complaints"
        ],
        businessValue: [
          "Saved $12M annually in fraud losses",
          "Improved customer satisfaction scores",
          "Reduced operational costs for fraud investigation",
          "Enabled faster transaction processing",
          "Enhanced regulatory compliance"
        ],
        image: "/rag-results.png"
      }
    ]
  },
  {
    id: "real-time-meeting-agent",
    slug: "real-time-meeting-agent",
    title: "Real-time Meeting Agent",
    shortDescription: "AI-powered meeting assistant that provides real-time insights, action items, and follow-ups.",
    description: "Transforming meeting productivity with AI that understands context, captures action items, and provides intelligent follow-ups.",
    metrics: [
      { value: "95%", label: "Action Item Capture" },
      { value: "40%", label: "Meeting Time Saved" },
      { value: "100%", label: "Follow-up Completion" }
    ],
    gradientColors: ["#8EB2F2", "#F28EC1", "#F38300"],
    heroImage: "/rag-results.png",
    sections: [
      {
        type: "intro",
        title: "The Challenge",
        description: "Meetings often lack structure, clear outcomes, and follow-through, leading to wasted time and missed opportunities.",
        content: [
          "Important decisions get lost in long meeting discussions",
          "Action items aren't clearly assigned or tracked",
          "Follow-ups fall through the cracks",
          "No centralized record of meeting outcomes and decisions"
        ],
        layout: "text-left-image-right"
      },
      {
        type: "approach",
        title: "Our Solution",
        description: "AI-powered meeting assistant that understands context, captures key points, and ensures follow-through.",
        cards: [
          { title: "Real-time Transcription", description: "Accurate speech-to-text with speaker identification" },
          { title: "Context Understanding", description: "AI that understands meeting context and intent" },
          { title: "Action Item Extraction", description: "Automatic identification and assignment of action items" },
          { title: "Smart Follow-ups", description: "Automated reminders and progress tracking" }
        ]
      },
      {
        type: "architecture",
        title: "System Architecture",
        description: "Scalable architecture for real-time audio processing and natural language understanding.",
        image: "/rag-results.png"
      },
      {
        type: "results",
        title: "Results & Impact",
        description: "Transformed meeting productivity and accountability across organizations.",
        outcomes: [
          "95% of action items captured and assigned automatically",
          "40% reduction in meeting time through better preparation",
          "100% follow-up completion rate",
          "30% increase in meeting productivity",
          "Centralized knowledge base of meeting decisions"
        ],
        businessValue: [
          "Reduced time spent in follow-up meetings",
          "Improved accountability for action items",
          "Better decision documentation and traceability",
          "Enhanced team productivity",
          "Reduced knowledge loss from employee turnover"
        ],
        image: "/rag-results.png"
      }
    ]
  }
];

export default mlProjects;