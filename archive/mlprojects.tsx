import svgPaths from "../../public/file.svg";
import svgPathsApproach from "../../public/file.svg";
import svgPathsResults from "../../public/file.svg";
import imgImage132 from "../../public/rag-results.png";
import imgImage139 from "../../public/rag-results.png";
import imgImage155 from "../../public/rag-results.png";
import imgImage268 from "../../public/rag-results.png";

// ==================== INLINE COMPONENTS ====================

// CardXl4Section Component
function CardXl4Section({ cards }: { cards: Array<{ title: string; description: string }> }) {
  return (
    <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full">
      {/* Background decorative gradient */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
          <g>
            <g filter="url(#filter0_approach)">
              <path d={svgPathsApproach.p2e65d5c0} fill="#8EB2F2" />
            </g>
            <g filter="url(#filter1_approach)">
              <path d={svgPathsApproach.p7288200} fill="#F28EC1" />
            </g>
            <g filter="url(#filter2_approach)">
              <path d={svgPathsApproach.p17fa4780} fill="#F38300" />
            </g>
            <g filter="url(#filter3_approach)">
              <path d={svgPathsApproach.p38ef0500} fill="#F44B2F" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_approach" width="1796.12" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_approach" width="1678.01" x="69.26" y="59.658">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_approach" width="1528.06" x="143.84" y="135.801">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_approach" width="1349.76" x="233.387" y="225.414">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-[12px] p-6 border border-[#dddddd]">
              <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-3" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {card.title}
              </h3>
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CardXl1Section Component
function CardXl1Section({ items }: { items: string[] }) {
  return (
    <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full max-w-[1216px]">
      {/* Background decorative gradient */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
          <g>
            <g filter="url(#filter0_card1)">
              <path d={svgPathsApproach.p2e65d5c0} fill="#8EB2F2" />
            </g>
            <g filter="url(#filter1_card1)">
              <path d={svgPathsApproach.p7288200} fill="#F28EC1" />
            </g>
            <g filter="url(#filter2_card1)">
              <path d={svgPathsApproach.p17fa4780} fill="#F38300" />
            </g>
            <g filter="url(#filter3_card1)">
              <path d={svgPathsApproach.p38ef0500} fill="#F44B2F" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_card1" width="1796.12" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_card1" width="1678.01" x="69.26" y="59.658">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_card1" width="1528.06" x="143.84" y="135.801">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_card1" width="1349.76" x="233.387" y="225.414">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 p-8 md:p-16">
        <div className="bg-white rounded-[12px] p-8 max-w-[560px] border border-[#dddddd]">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path d={svgPathsResults.ped68152} fill="#f7f4ed" />
                    <path clipRule="evenodd" d={svgPathsResults.p3695d500} fill="#191818" fillRule="evenodd" />
                  </svg>
                </div>
                <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================

export default function MLProjects() {
  return (
    <div className="bg-white w-full min-h-screen relative overflow-x-hidden">
      {/* Background decorative elements - hero */}
      <div className="absolute left-[-154px] md:left-[-100px] w-[600px] md:w-[1000px] lg:w-[1703px] h-[600px] md:h-[1000px] lg:h-[1703px] top-[200px] md:top-[400px] lg:top-[542px] pointer-events-none opacity-60 md:opacity-100 z-0">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1827 1843">
            <g>
              <g filter="url(#filter0_f_1_12916)">
                <path d={svgPaths.p29e14480} fill="#8EB2F2" />
              </g>
              <g filter="url(#filter1_f_1_12916)">
                <path d={svgPaths.p522b00} fill="#E9A8E5" />
              </g>
              <g filter="url(#filter2_f_1_12916)">
                <path d={svgPaths.p1435900} fill="#F44B2F" />
              </g>
              <g filter="url(#filter3_f_1_12916)">
                <path d={svgPaths.p1c0cb400} fill="#F38301" />
              </g>
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1842.05" id="filter0_f_1_12916" width="1826.8" x="0" y="3.8147e-06">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1720.52" id="filter1_f_1_12916" width="1706.51" x="70.5416" y="60.7637">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1566.21" id="filter2_f_1_12916" width="1553.77" x="146.51" y="138.318">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1382.1" id="filter3_f_1_12916" width="1371.45" x="238.073" y="229.973">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#252222] relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center">
          <div className="flex items-center gap-3">
            <img alt="Gloria Logo" className="w-10 h-10 object-cover" src={imgImage132.src} />
            <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-xl sm:text-2xl" style={{ fontVariationSettings: "'opsz' 96, 'wdth' 100" }}>
              Gloria
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#252222] relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Hero Text */}
            <div className="flex-1 w-full">
              <h1 className="font-['Bricolage_Grotesque',sans-serif] text-white text-4xl sm:text-5xl md:text-6xl lg:text-[90px] leading-tight mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                RAG+ Evaluation System
              </h1>
              <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-lg sm:text-xl max-w-[480px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                Reduced information retrieval time by 85% while achieving 92% answer accuracy through a custom RAG pipeline with advanced evaluation framework
              </p>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full relative">
              <div className="relative w-full max-w-[592px] mx-auto">
                <img alt="RAG Hero" className="w-full rounded-[12px] border border-white" src={imgImage139.src} />
                <img alt="Decoration" className="absolute -bottom-8 -right-8 w-[140px] sm:w-[180px] md:w-[294px] pointer-events-none" src={imgImage155.src} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section with Metrics */}
      <section className="bg-white py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* Description */}
            <div className="flex-1">
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                Build RAG and it's own Evaluation Framework. Evalution framework especially on information which LLM haven't seen before is crucial, this is how we garantee that the results are correct, we can measure and improve our system by knowing where it fails and how much it fails.
              </p>
            </div>

            {/* Metrics Cards */}
            <div className="flex-1 w-full">
              <div className="flex flex-col gap-6">
                {/* Precision Card */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6">
                  <div className="flex items-center gap-5">
                    <div className="bg-[#dcfae6] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#079455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>92%</p>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>Precision</p>
                    </div>
                  </div>
                </div>

                {/* Recall Card */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6">
                  <div className="flex items-center gap-5">
                    <div className="bg-[#f4ebff] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p2f4e8300} stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>89%</p>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>Recall</p>
                    </div>
                  </div>
                </div>

                {/* Time Saved Card */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6">
                  <div className="flex items-center gap-5">
                    <div className="bg-[#fef0c7] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p38b70d8} stroke="#DC6803" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>89%</p>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>Time saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              The Challenge
            </h2>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Challenge List */}
            <div className="flex-1 w-full">
              <div className="space-y-5 pl-0 lg:pl-4">
                <div className="flex gap-3 items-start">
                  <div className="pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#f38300]" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Organizations struggle to extract insights from vast document repositories, with teams spending hours daily searching through technical documentation.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#f38300]" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Traditional keyword search misses 60% of relevant information due to semantic gaps, leading to duplicated work and missed opportunities.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#f38300]" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Manual information retrieval creates bottlenecks in decision-making and significantly increases onboarding time for new team members.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Graphic */}
            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[396px] h-[300px] sm:h-[356px]">
                {/* Decorative shapes */}
                <div className="absolute left-0 top-[54px] w-full h-[228px] flex items-center justify-center">
                  <div className="rotate-[330deg] skew-x-[27deg]">
                    <div className="bg-[#f7f4ed] rounded-[12px] w-[228px] h-[228px]" />
                  </div>
                </div>
                <div className="absolute left-0 top-[103px] w-full h-[228px] flex items-center justify-center">
                  <div className="rotate-[330deg] skew-x-[27deg]">
                    <div className="bg-[#f38300] rounded-[12px] w-[228px] h-[228px]" />
                  </div>
                </div>
                <div className="absolute left-0 top-[13px] w-full h-[228px] flex items-center justify-center">
                  <div className="rotate-[330deg] skew-x-[27deg]">
                    <div className="bg-[#f7f4ed] rounded-[12px] w-[228px] h-[228px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Selecting a right aproach
            </h2>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Imagine searching through hundreds of PDF documents to find one answer. Now imagine getting that answer in seconds, with sources cited.
            </p>
          </div>

          <CardXl4Section
            cards={[
              {
                title: "Two-Stage Retrieval",
                description: "Vector search + AI re-ranking for 40% better relevance"
              },
              {
                title: "Custom Evaluation Framework",
                description: "Precision, Recall, and MRR metrics for continuous improvement"
              },
              {
                title: "Real-Time Q&A Interface",
                description: "Source attribution with 200ms avg response time"
              },
              {
                title: "Production-Ready API",
                description: "Modular design with scalable architecture"
              }
            ]}
          />
        </div>
      </section>

      {/* Architecture Section */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              The Architecture
            </h2>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              A comprehensive system designed to handle document processing, semantic search, and intelligent retrieval with precision.
            </p>
          </div>

          <div className="flex justify-center">
            <img alt="Architecture Diagram" className="w-full max-w-[800px] rounded-lg" src={imgImage268.src} />
          </div>
        </div>
      </section>

      {/* Smart Retrieval System Section */}
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Smart Retrieval System
            </h2>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              The system understands intent, not just matching words. Searching "How do I reset?" finds answers about "reinitialization" too.
            </p>
          </div>

          <CardXl1Section
            items={[
              "Vector embeddings (OpenAI) + LanceDB for semantic search",
              "Cohere re-ranking reduced false positives by 35%",
              "Achieved 92% precision vs. 67% baseline keyword search",
              "L2 distance metric for optimal similarity matching"
            ]}
          />
        </div>
      </section>

      {/* Evaluation Framework Section */}
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Evaluation Framework
            </h2>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Every answer is <span className="font-['Bricolage_Grotesque',sans-serif]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>tested</span> like a student's homework - we know if it's right, not just plausible.
            </p>
          </div>

          <CardXl1Section
            items={[
              "Built custom metrics: Precision, Recall, Mean Reciprocal Rank (MRR)",
              "AI-powered answer correctness validation using GPT-4",
              "25 test questions with ground truth for continuous benchmarking",
              "Automated test harness for model iteration and improvement"
            ]}
          />
        </div>
      </section>

      {/* Production Architecture Section */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Production Architecture
            </h2>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Like LEGO blocks - swap out parts without rebuilding everything. Easy to improve and maintain.
            </p>
          </div>

          <CardXl1Section
            items={[
              "Modular design: Indexer → Datastore → Retriever → Generator",
              "CLI + Web interface built with Python/Reflex framework",
              "Handles 60+ document chunks with sub-second retrieval",
              "SQLAlchemy + Alembic for robust database management"
            ]}
          />
        </div>
      </section>

      {/* Results & Impact Section */}
      <section className="bg-[#252222] py-16 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Results & Impact
            </h2>
            <p className="font-['Inter',sans-serif] text-white text-lg sm:text-xl max-w-[768px] mx-auto leading-[30px]">
              Real Impact: What used to take a team member half their morning now happens while their coffee is brewing. That's 15+ hours back per person, per week—time now spent solving problems instead of searching for answers.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-[1216px]">
              <img alt="RAG System Interface" className="w-full rounded-[12px] border border-white" src={imgImage139.src} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Quantifiable Outcomes Card */}
            <div className="flex-1 bg-white rounded-[12px] overflow-hidden">
              <div className="p-6 md:p-8 pb-0 pt-8">
                <div className="flex flex-col gap-6 items-center mb-6">
                  <div className="bg-blue-100 rounded-[8px] w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d={svgPathsResults.p1fba1600} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Quantifiable Outcomes
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  {[
                    "92% Precision, 89% Recall on test dataset",
                    "85% reduction in information retrieval time",
                    "98% user satisfaction in pilot testing",
                    "System processes 10,000+ document pages",
                    "0.94 Mean Reciprocal Rank for ranking quality"
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <path d={svgPathsResults.ped68152} fill="#f7f4ed" />
                          <path clipRule="evenodd" d={svgPathsResults.p3695d500} fill="#191818" fillRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Value Card */}
            <div className="flex-1 bg-white rounded-[12px] overflow-hidden">
              <div className="p-6 md:p-8 pb-0 pt-8">
                <div className="flex flex-col gap-6 items-center mb-6">
                  <div className="bg-[#dcfae6] rounded-[8px] w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d={svgPathsResults.p38ae7280} stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Business Value
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  {[
                    "Decreased onboarding time from weeks to days",
                    "Eliminated duplicate research efforts",
                    "Improved decision-making speed by 3×",
                    "Reduced support ticket resolution time",
                    "Enabled knowledge democratization across teams"
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <path d={svgPathsResults.ped68152} fill="#f7f4ed" />
                          <path clipRule="evenodd" d={svgPathsResults.p3695d500} fill="#191818" fillRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
