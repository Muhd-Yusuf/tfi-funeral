// All pricing data from TFI Burial Society plans
// Icons reference lucide-react icon names
export const plansData = {
  singleMember: {
    name: 'Single Member',
    slug: 'single-member',
    category: 'main' as const,
    description: 'Individual funeral cover for one person.',
    icon: 'User',
    features: ['Cover from R5,000 – R30,000', 'Ages 18 – 85+', 'Fast claims processing', 'No medical examination'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 39 }, { ageRange: '65-74', premium: 83 }, { ageRange: '75-84', premium: null }, { ageRange: '85+', premium: 230 }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 67 }, { ageRange: '65-74', premium: 91 }, { ageRange: '75-84', premium: 97 }, { ageRange: '85+', premium: 448 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 91 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }, { ageRange: '85+', premium: 668 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 114 }, { ageRange: '65-74', premium: 158 }, { ageRange: '75-84', premium: 171 }, { ageRange: '85+', premium: 886 }] },
      { coverAmount: 30000, ageGroups: [{ ageRange: '18-64', premium: 157 }, { ageRange: '65-74', premium: 221 }, { ageRange: '75-84', premium: 240 }, { ageRange: '85+', premium: 1325 }] },
    ],
  },
  memberChildren: {
    name: 'Member & Children',
    slug: 'member-children',
    category: 'main' as const,
    description: 'Cover for you and your children.',
    icon: 'Users',
    features: ['Cover from R5,000 – R30,000', 'Ages 18 – 84', 'Children covered by benefit %', 'No medical examination'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 42 }, { ageRange: '65-74', premium: 83 }, { ageRange: '75-84', premium: 122 }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 70 }, { ageRange: '65-74', premium: 163 }, { ageRange: '75-84', premium: 234 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 97 }, { ageRange: '65-74', premium: 226 }, { ageRange: '75-84', premium: 346 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 126 }, { ageRange: '65-74', premium: 289 }, { ageRange: '75-84', premium: 459 }] },
      { coverAmount: 30000, ageGroups: [{ ageRange: '18-64', premium: 185 }, { ageRange: '65-74', premium: 441 }, { ageRange: '75-84', premium: 683 }] },
    ],
  },
  memberSpouse: {
    name: 'Member & Spouse',
    slug: 'member-spouse',
    category: 'main' as const,
    description: 'Cover for you and your partner.',
    icon: 'Heart',
    features: ['Cover from R5,000 – R30,000', 'Ages 18 – 84', 'Both partners covered equally', 'Affordable joint premiums'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 51 }, { ageRange: '65-74', premium: 140 }, { ageRange: '75-84', premium: 234 }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 90 }, { ageRange: '65-74', premium: 269 }, { ageRange: '75-84', premium: 459 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 130 }, { ageRange: '65-74', premium: 399 }, { ageRange: '75-84', premium: 683 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 171 }, { ageRange: '65-74', premium: 529 }, { ageRange: '75-84', premium: 909 }] },
      { coverAmount: 30000, ageGroups: [{ ageRange: '18-64', premium: 251 }, { ageRange: '65-74', premium: 788 }, { ageRange: '75-84', premium: 1358 }] },
    ],
  },
  family: {
    name: 'Family Plan',
    slug: 'family',
    category: 'main' as const,
    description: 'Comprehensive family funeral cover.',
    icon: 'Home',
    features: ['Cover from R5,000 – R30,000', 'Member, spouse & children', 'Child benefits included', 'Extended family add-ons available'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 58 }, { ageRange: '65-74', premium: null }, { ageRange: '75-84', premium: null }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 104 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 151 }, { ageRange: '65-74', premium: 174 }, { ageRange: '75-84', premium: 188 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 198 }, { ageRange: '65-74', premium: 223 }, { ageRange: '75-84', premium: 242 }] },
      { coverAmount: 30000, ageGroups: [{ ageRange: '18-64', premium: 291 }, { ageRange: '65-74', premium: 322 }, { ageRange: '75-84', premium: 350 }] },
    ],
  },
  extendedFamily: {
    name: 'Extended Family Plans',
    slug: 'extended-family',
    category: 'extended' as const,
    description: 'Cover additional family members beyond your immediate family.',
    icon: 'UserPlus',
    features: ['Add up to 13 extra members', 'Flexible member options', 'One convenient premium', 'Full family protection'],
    pricing: [
      // Member +5
      { coverAmount: 5, ageGroups: [{ ageRange: '18-64', premium: 577 }, { ageRange: '65-74', premium: 718 }, { ageRange: '75-84', premium: 760 }] },
      // Member +7
      { coverAmount: 7, ageGroups: [{ ageRange: '18-64', premium: 643 }, { ageRange: '65-74', premium: 760 }, { ageRange: '75-84', premium: 849 }] },
      // Member +9
      { coverAmount: 9, ageGroups: [{ ageRange: '18-64', premium: 703 }, { ageRange: '65-74', premium: 849 }, { ageRange: '75-84', premium: 948 }] },
      // Member +13
      { coverAmount: 13, ageGroups: [{ ageRange: '18-64', premium: 1210 }, { ageRange: '65-74', premium: 1469 }, { ageRange: '75-84', premium: 1599 }] },
    ],
  },
  afterTears: {
    name: 'After Tears Plan',
    slug: 'after-tears',
    category: 'after-tears' as const,
    description: 'R10,000 cover to help with expenses after the funeral.',
    icon: 'HeartHandshake',
    features: ['R10,000 cover amount', 'Helps with post-funeral costs', 'Individual & family options', 'Extended family add-ons'],
    pricing: [
      // Individual
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 67 }, { ageRange: '65-74', premium: 91 }, { ageRange: '75-84', premium: 97 }] },
      // Member & Children (coverAmount used as identifier: 10001)
      { coverAmount: 10001, ageGroups: [{ ageRange: '18-64', premium: 70 }, { ageRange: '65-74', premium: 163 }, { ageRange: '75-84', premium: 234 }] },
      // Member & Spouse (10002)
      { coverAmount: 10002, ageGroups: [{ ageRange: '18-64', premium: 90 }, { ageRange: '65-74', premium: 269 }, { ageRange: '75-84', premium: 459 }] },
      // Family (10003)
      { coverAmount: 10003, ageGroups: [{ ageRange: '18-64', premium: 104 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }] },
      // Extended +5 (10005)
      { coverAmount: 10005, ageGroups: [{ ageRange: '18-64', premium: 577 }, { ageRange: '65-74', premium: 718 }, { ageRange: '75-84', premium: 760 }] },
      // Extended +7 (10007)
      { coverAmount: 10007, ageGroups: [{ ageRange: '18-64', premium: 643 }, { ageRange: '65-74', premium: 760 }, { ageRange: '75-84', premium: 849 }] },
      // Extended +9 (10009)
      { coverAmount: 10009, ageGroups: [{ ageRange: '18-64', premium: 703 }, { ageRange: '65-74', premium: 849 }, { ageRange: '75-84', premium: 948 }] },
    ],
  },
  inkomo: {
    name: 'Inkomo Plan',
    slug: 'inkomo',
    category: 'inkomo' as const,
    description: 'R20,000 Inkomo funeral cover plan.',
    icon: 'Crown',
    features: ['R20,000 cover amount', 'Individual & family options', 'Extended family add-ons', 'Traditional funeral support'],
    pricing: [
      // Individual
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 114 }, { ageRange: '65-74', premium: 158 }, { ageRange: '75-84', premium: 171 }] },
      // Member & Children (20001)
      { coverAmount: 20001, ageGroups: [{ ageRange: '18-64', premium: 126 }, { ageRange: '65-74', premium: 289 }, { ageRange: '75-84', premium: 459 }] },
      // Member & Spouse (20002)
      { coverAmount: 20002, ageGroups: [{ ageRange: '18-64', premium: 171 }, { ageRange: '65-74', premium: 529 }, { ageRange: '75-84', premium: 909 }] },
      // Family (20003)
      { coverAmount: 20003, ageGroups: [{ ageRange: '18-64', premium: 198 }, { ageRange: '65-74', premium: 223 }, { ageRange: '75-84', premium: 242 }] },
      // Extended +5 (20005)
      { coverAmount: 20005, ageGroups: [{ ageRange: '18-64', premium: 577 }, { ageRange: '65-74', premium: 718 }, { ageRange: '75-84', premium: 760 }] },
      // Extended +7 (20007)
      { coverAmount: 20007, ageGroups: [{ ageRange: '18-64', premium: 643 }, { ageRange: '65-74', premium: 760 }, { ageRange: '75-84', premium: 849 }] },
      // Extended +9 (20009)
      { coverAmount: 20009, ageGroups: [{ ageRange: '18-64', premium: 703 }, { ageRange: '65-74', premium: 849 }, { ageRange: '75-84', premium: 948 }] },
    ],
  },
  grocery: {
    name: 'Grocery Plan',
    slug: 'grocery',
    category: 'grocery' as const,
    description: 'R10,000 grocery benefit plan for funeral support.',
    icon: 'ShoppingCart',
    features: ['R10,000 grocery benefit', 'Helps feed mourners', 'Individual & family options', 'Extended family add-ons'],
    pricing: [
      // Individual
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 67 }, { ageRange: '65-74', premium: 91 }, { ageRange: '75-84', premium: 97 }] },
      // Member & Children (10001)
      { coverAmount: 10001, ageGroups: [{ ageRange: '18-64', premium: 70 }, { ageRange: '65-74', premium: 163 }, { ageRange: '75-84', premium: 234 }] },
      // Member & Spouse (10002)
      { coverAmount: 10002, ageGroups: [{ ageRange: '18-64', premium: 90 }, { ageRange: '65-74', premium: 269 }, { ageRange: '75-84', premium: 459 }] },
      // Family (10003)
      { coverAmount: 10003, ageGroups: [{ ageRange: '18-64', premium: 104 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }] },
      // Extended +5
      { coverAmount: 10005, ageGroups: [{ ageRange: '18-64', premium: 577 }, { ageRange: '65-74', premium: 718 }, { ageRange: '75-84', premium: 760 }] },
      // Extended +7
      { coverAmount: 10007, ageGroups: [{ ageRange: '18-64', premium: 643 }, { ageRange: '65-74', premium: 760 }, { ageRange: '75-84', premium: 849 }] },
      // Extended +9
      { coverAmount: 10009, ageGroups: [{ ageRange: '18-64', premium: 703 }, { ageRange: '65-74', premium: 849 }, { ageRange: '75-84', premium: 948 }] },
    ],
  },
  cashPlan: {
    name: 'Cash Plan',
    slug: 'cash-plan',
    category: 'main' as const,
    description: 'Cash payout funeral plan for immediate financial support.',
    icon: 'Banknote',
    features: ['Direct cash payout', 'Quick claims settlement', 'Individual & family options', 'Flexible cover amounts'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 39 }, { ageRange: '65-74', premium: 83 }, { ageRange: '75-84', premium: null }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 67 }, { ageRange: '65-74', premium: 91 }, { ageRange: '75-84', premium: 97 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 91 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 114 }, { ageRange: '65-74', premium: 158 }, { ageRange: '75-84', premium: 171 }] },
      { coverAmount: 30000, ageGroups: [{ ageRange: '18-64', premium: 157 }, { ageRange: '65-74', premium: 221 }, { ageRange: '75-84', premium: 240 }] },
    ],
  },
  memberPlus: {
    name: 'Member Plus Plan',
    slug: 'member-plus',
    category: 'main' as const,
    description: 'Enhanced cover with additional benefits for the main member.',
    icon: 'Star',
    features: ['Enhanced member benefits', 'Additional cover options', 'Priority claims handling', 'Extended coverage'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 58 }, { ageRange: '65-74', premium: null }, { ageRange: '75-84', premium: null }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 104 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 151 }, { ageRange: '65-74', premium: 174 }, { ageRange: '75-84', premium: 188 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 198 }, { ageRange: '65-74', premium: 223 }, { ageRange: '75-84', premium: 242 }] },
      { coverAmount: 30000, ageGroups: [{ ageRange: '18-64', premium: 291 }, { ageRange: '65-74', premium: 322 }, { ageRange: '75-84', premium: 350 }] },
    ],
  },
  tombstone: {
    name: 'Tombstone Plan',
    slug: 'tombstone',
    category: 'main' as const,
    description: 'Dedicated cover for tombstone and memorial costs.',
    icon: 'Landmark',
    features: ['Tombstone cover', 'Memorial costs covered', 'No waiting period for accidental', 'Affordable monthly premiums'],
    pricing: [
      { coverAmount: 5000, ageGroups: [{ ageRange: '18-64', premium: 39 }, { ageRange: '65-74', premium: 83 }, { ageRange: '75-84', premium: null }] },
      { coverAmount: 10000, ageGroups: [{ ageRange: '18-64', premium: 67 }, { ageRange: '65-74', premium: 91 }, { ageRange: '75-84', premium: 97 }] },
      { coverAmount: 15000, ageGroups: [{ ageRange: '18-64', premium: 91 }, { ageRange: '65-74', premium: 122 }, { ageRange: '75-84', premium: 132 }] },
      { coverAmount: 20000, ageGroups: [{ ageRange: '18-64', premium: 114 }, { ageRange: '65-74', premium: 158 }, { ageRange: '75-84', premium: 171 }] },
    ],
  },
}

export const childBenefits = [
  { ageRange: 'Birth – 11 months', percentage: 12.5 },
  { ageRange: '1 – 5 years', percentage: 25 },
  { ageRange: '6 – 13 years', percentage: 50 },
  { ageRange: '14 – 21 years', percentage: 100 },
]

export const whyChooseUs = [
  { icon: 'Shield', title: 'Flexible Cover Options', description: 'Choose from R5,000 to R30,000 cover. Individual, couple, family, or extended plans.' },
  { icon: 'Wallet', title: 'Affordable Premiums', description: 'Plans starting from just R39/month. Budget-friendly protection for every family.' },
  { icon: 'Users', title: 'Extended Family Protection', description: 'Cover up to 13 additional family members with our extended plans.' },
  { icon: 'Zap', title: 'Fast Claims Process', description: 'Claims processed within 48 hours. Support when you need it most.' },
  { icon: 'Building2', title: 'Trusted Underwriters', description: 'Underwritten by Old Mutual & RMA — names you can trust with your family\'s future.' },
  { icon: 'Headphones', title: 'Reliable Customer Service', description: 'Dedicated agents available via phone and WhatsApp for immediate assistance.' },
]
