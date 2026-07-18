// Blog post metadata — add a new entry here whenever you publish a post.
// Flow: write post HTML in blog/<slug>.html → add its metadata below → done.
// Cards on blog.html and the "Recent Posts" list on index.html render automatically.
const posts = [
  {
    slug: "embodied-asset-recall-robot",
    title: "A Robot That Remembers Where You Left Your Wrench",
    date: "2026-07-18",
    excerpt: "No cloud, no LiDAR, no RFID — just a Jetson, some VLMs, and a stubborn belief that robots should find your stuff offline.",
    tags: ["Robotics", "VLM", "ROS 2"]
  },
  {
    slug: "automating-blog-with-agents",
    title: "How I Accidentally Automated My Blog Posts",
    date: "2026-07-17",
    excerpt: "Discovering OpenCode, agentic multimodal AI, and a free open-weights model that turns my messy brain-dumps into posts worth publishing.",
    tags: ["Agents", "LLM", "Tooling"]
  },
  {
    slug: "adas-heterogeneous-edge-pipeline",
    title: "How a $400 Phone Learned to Drive",
    date: "2026-07-10",
    excerpt: "A Snapdragon 8 Gen 2 has three brains. Splitting driving workloads across its GPU, NPU, and CPU is how a phone becomes a self-driving stack.",
    tags: ["Edge AI", "ADAS", "Qualcomm AI Hub"]
  },
  {
    slug: "stress-ai-posture-system",
    title: "We Built a Robot That Yells at You for Slouching",
    date: "2026-05-20",
    excerpt: "An ESP32, a custom posture net, and an emotion CNN walk into a room. Then it starts buzzing and texting you about your life choices.",
    tags: ["IoT", "Computer Vision", "ESP32"]
  },
  {
    slug: "rover-traffic-system",
    title: "We Nearly Nuked a GPU to Teach a Rover to Read Traffic Lights",
    date: "2026-04-15",
    excerpt: "Overclocked into oblivion, drowning in VRAM, and a 20GB RAM tantrum — the unglamorous story of getting YOLO26 to actually run on a rover.",
    tags: ["YOLO", "Edge AI", "Training"]
  },
  {
    slug: "plant-disease-hybrid-ai-pipeline",
    title: "The Plant Doctor With a Bouncer at the Door",
    date: "2026-03-12",
    excerpt: "Why a disease-detection model calls your steering wheel 'mildew' — and how a cloud guardrail, a fallback, and an ESP32 pump fix it.",
    tags: ["Computer Vision", "Flask", "IoT"]
  },
  {
    slug: "edubot-albirr-architecture",
    title: "Meet Albirr, the Robot That Remembers Your Face",
    date: "2026-06-18",
    excerpt: "A Raspberry Pi 5 robot that tracks who walks in, greets them in Malayalam, and talks back — without ever freezing up.",
    tags: ["Raspberry Pi", "LLM", "Robotics"]
  }
];
