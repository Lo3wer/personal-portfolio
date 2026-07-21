export type ContentBlock =
  | { type: 'p'; content: string }
  | { type: 'h2'; content: string }
  | { type: 'h3'; content: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'img'; src: string; alt: string }
  | { type: 'meta'; items: { label: string; value: string }[] }
  | { type: 'grading'; items: GradingItem[] }

export type GradingItem = {
  label: string
  value: string
  subitems?: { label: string; value: string }[]
}

export type BlogPost = {
  type: 'post'
  slug: string
  title: string
  date: string
  description: string
  content: ContentBlock[]
}

export type PhotoPost = {
  type: 'photo'
  slug: string
  title?: string
  date: string
  description: string
  image: string
}

export type BlogItem = BlogPost | PhotoPost

const posts: BlogItem[] = [
  {
    type: 'photo',
    slug: 'hello-world',
    title: 'Hello World',
    date: '2026-07-21',
    description: 'My first photo post! Just testing things out.',
    image: '/images/rocket.jpg',
  },
  {
    type: 'post',
    slug: 'MATH302',
    title: 'MATH 302 - Introduction to Probability',
    date: '2024-08-29',
    description: 'Course Review',
    content: [
      { type: 'img', src: '/images/montypython.png', alt: 'Monty Python' },
      { type: 'meta', items: [{ label: 'Rating', value: '8/10' }] },
      { type: 'h2', content: 'General Overview' },
      { type: 'p', content: 'An introduction to probability and basic statistics. The course covered various distributions, probability density/mass functions (pdf/pmf), and probability bounds, with an emphasis on the law of large numbers.' },
      { type: 'h2', content: 'Topics Covered' },
      { type: 'ul', items: [
        'Sample spaces, events, axioms of probability',
        'Counting principles and combinatorics',
        'Independence and conditional probability, Bayes formula',
        'Discrete random variables: expectation and variance',
        'Continuous random variables: expectation and variance',
        'Joint distributions, conditional distributions',
        'Transformations of random variables',
        'Covariance and correlation',
        'Moment generating functions',
        'Chebyshev inequality',
        'Law of large numbers and central limit theorem',
      ]},
      { type: 'h2', content: 'Class Schedule' },
      { type: 'p', content: 'Three 2-hour lectures and one 1-hour lecture per week. Midterms were always on the 1-hour day.' },
      { type: 'h2', content: 'Grading Scheme' },
      { type: 'grading', items: [
        { label: 'Homework', value: '15%' },
        { label: 'Midterm', value: '35%' },
        { label: 'Final', value: '50%' },
      ]},
      { type: 'h2', content: 'Personal Thoughts' },
      { type: 'p', content: 'This is the course to take if you want to become a professional gambler. I think the most interesting part of this course is figuring out probabilities for the casino games like roulette and card hands. Although some of the lectures were a little confusing, most lectures contained a lot of cool material and had engaging examples. Overall, I think this is one of the most interesting courses I have taken so far.' },
    ],
  },
  {
    type: 'post',
    slug: 'APSC262',
    title: 'APSC 262 - Technology and Society II',
    date: '2024-07-01',
    description: 'Course Review',
    content: [
      { type: 'img', src: '/images/rocket.jpg', alt: 'rocket' },
      { type: 'meta', items: [{ label: 'Rating', value: '7/10' }] },
      { type: 'h2', content: 'General Overview' },
      { type: 'p', content: 'A course on the "technological impact on society," taken to fulfill a requirement. Tutorials and lectures occurred twice a week. In tutorials, we listened to other groups present their topics and participated in discussions. There was significant participation required, and each lecture ended with a response activity.' },
      { type: 'h2', content: 'Topics Covered' },
      { type: 'ul', items: [
        "What's the point of engineers?",
        'With great power comes great responsibility: ethics and morality in engineering',
        'Guest Speaker: Indigenous knowledge in engineering',
        'Guest Speaker: Engineering and law',
        'Economics, technology, and consumer behavior',
        'Social relationships and technology: Marrying a robot?',
        'Contextual engineering',
        'How science and technology influence art and society',
      ]},
      { type: 'h2', content: 'Class Schedule' },
      { type: 'p', content: 'Taken in 2024 Summer Term 1 online. Two 1.5-hour tutorials and two 1.5-hour lectures per week.' },
      { type: 'h2', content: 'Grading Scheme' },
      { type: 'grading', items: [
        { label: 'Participation', value: '15%' },
        { label: 'Lecture Responses', value: '7.5%' },
        { label: 'Tutorial Discussion Lead', value: '7.5%' },
        { label: 'Reading Responses', value: '35%' },
        { label: 'Term Group Project', value: '35%', subitems: [
          { label: 'Annotated Reference List', value: '5%' },
          { label: 'Presentation', value: '5%' },
          { label: 'Final Report', value: '15%' },
        ]},
        { label: 'Case Study (Individual)', value: '10%' },
      ]},
      { type: 'h2', content: 'Personal Thoughts' },
      { type: 'p', content: 'This class was more tedious than difficult. I followed a routine: completing the reading response, participating in the tutorial, and submitting the lecture response. The final tutorial, presentation, and paper required 15-20 hours to complete. Thankfully, my wonderful group made this class manageable.' },
    ],
  },
  {
    type: 'post',
    slug: 'MATH253',
    title: 'MATH 253 - Multivariable Calculus',
    date: '2024-06-29',
    description: 'Course Review',
    content: [
      { type: 'img', src: '/images/monkeysaddle.png', alt: 'monkey saddle' },
      { type: 'meta', items: [{ label: 'Rating', value: '10/10' }] },
      { type: 'h2', content: 'General Overview' },
      { type: 'p', content: 'Felt like the golden child of MATH 152 and MATH 101. Both subjects were mixed together to create a course on multivariable calculus, which was appropriately challenging and interesting. About 20% of MATH 253 was a review of vectors and cross/dot products.' },
      { type: 'h2', content: 'Topics Covered' },
      { type: 'ul', items: [
        '3D coordinates and vectors',
        'Planes and lines',
        'Surface sketching',
        'Limits and partials',
        'Tangent planes and linear approximation',
        'Maximums and minimums',
        'Double integrals',
        'Triple integrals',
      ]},
      { type: 'h2', content: 'Class Schedule' },
      { type: 'p', content: 'Three 2-hour lectures and one 1-hour lecture per week. Midterms were always on the 1-hour day.' },
      { type: 'h2', content: 'Grading Scheme' },
      { type: 'p', content: 'Two options:' },
      { type: 'ol', items: [
        'Webwork: 10%, Midterms (2): 40%, Final: 50%',
        'Webwork: 10%, Midterm (best one): 30%, Final: 60%',
      ]},
      { type: 'h2', content: 'Personal Thoughts' },
      { type: 'p', content: 'My professor was one of the best I have ever had. He provided ample practice questions and tests while clearly explaining concepts in class. Thanks to his teaching style and resources, I developed a deep understanding of the material and often grasped the lessons during the lectures without extra effort. The most challenging topic was double/triple integrals. However, the tests were easier than the practice ones. Overall, this course was an enjoyable and rewarding experience.' },
    ],
  },
]

export function getAllPosts(): BlogItem[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogItem | undefined {
  return posts.find((p) => p.slug === slug)
}
