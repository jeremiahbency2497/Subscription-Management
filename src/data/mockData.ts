import {
  Customer,
  Plan,
  Subscription,
  Invoice,
  PaymentTransaction,
  DiscountCoupon,
  RevenueMetricPoint,
  ActivityNotification
} from '../types';

export const INITIAL_PLANS: Plan[] = [
  {
    id: 'plan_starter',
    name: 'Starter',
    tierCode: 'ST-01',
    priceMonthly: 49,
    priceAnnual: 470,
    billingCadence: 'monthly',
    description: 'Essential billing and subscription core for early-stage SaaS ventures.',
    features: [
      'Up to 3 team seats',
      '5,000 monthly active users',
      'Standard payment processing',
      'Email dunning sequences',
      'Community support'
    ],
    limits: {
      seats: 3,
      apiCalls: '50,000 / mo',
      storage: '10 GB'
    },
    subscribersCount: 842,
    mrrContributed: 41258,
    status: 'active'
  },
  {
    id: 'plan_growth',
    name: 'Growth',
    tierCode: 'GW-02',
    priceMonthly: 149,
    priceAnnual: 1430,
    billingCadence: 'monthly',
    description: 'Advanced metrics, automated retention tools, and multi-currency billing.',
    features: [
      'Up to 10 team seats',
      '25,000 monthly active users',
      'Smart retry & churn prevention',
      'Custom webhook triggers',
      'Standard SLA & live chat'
    ],
    limits: {
      seats: 10,
      apiCalls: '250,000 / mo',
      storage: '50 GB'
    },
    subscribersCount: 520,
    mrrContributed: 77480,
    isPopular: true,
    status: 'active'
  },
  {
    id: 'plan_scale',
    name: 'Scale',
    tierCode: 'SC-03',
    priceMonthly: 399,
    priceAnnual: 3830,
    billingCadence: 'monthly',
    description: 'High-volume throughput, custom tax integrations, and revenue recognition.',
    features: [
      'Up to 30 team seats',
      '100,000 monthly active users',
      'Automated ASC 606 revenue waterfall',
      'Dedicated IP & high-throughput API',
      'Priority 24/7 technical hotline'
    ],
    limits: {
      seats: 30,
      apiCalls: '1,500,000 / mo',
      storage: '250 GB'
    },
    subscribersCount: 168,
    mrrContributed: 67032,
    status: 'active'
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    tierCode: 'EN-04',
    priceMonthly: 999,
    priceAnnual: 9590,
    billingCadence: 'monthly',
    description: 'Custom security guardrails, SOC2 audit bundles, SSO/SAML, and bespoke contracts.',
    features: [
      'Unlimited team seats',
      'Custom monthly active volume',
      'SAML SSO & SCIM directory sync',
      'Custom contract terms & invoicing',
      'Dedicated Account Director'
    ],
    limits: {
      seats: 'Unlimited',
      apiCalls: 'Custom / Dedicated',
      storage: '1 TB+'
    },
    subscribersCount: 42,
    mrrContributed: 41958,
    status: 'active'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    name: 'Sarah Chen',
    email: 'sarah.chen@nexustech.io',
    company: 'Nexus Technologies',
    planId: 'plan_scale',
    status: 'active',
    mrr: 399,
    lifetimeSpend: 4788,
    billingAddress: {
      street: '452 Mission Street, Suite 1400',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    },
    paymentMethod: {
      brand: 'visa',
      last4: '4242',
      expMonth: 8,
      expYear: 2028
    },
    phone: '+1 (415) 890-2134',
    taxId: 'US-942817264',
    createdAt: '2025-02-14',
    notes: 'Key scale customer. Migrated from Chargebee smoothly. Potential Enterprise expansion in Q4.'
  },
  {
    id: 'cust_02',
    name: 'Marcus Vance',
    email: 'm.vance@hyperionsolutions.com',
    company: 'Hyperion Solutions',
    planId: 'plan_enterprise',
    status: 'active',
    mrr: 999,
    lifetimeSpend: 15984,
    billingAddress: {
      street: '1201 3rd Ave, 22nd Floor',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    paymentMethod: {
      brand: 'amex',
      last4: '1004',
      expMonth: 11,
      expYear: 2027
    },
    phone: '+1 (206) 555-0199',
    taxId: 'US-918237461',
    createdAt: '2024-09-10',
    notes: 'Enterprise contract paid semi-annually via ACH and corporate Amex. Dedicated SLA.'
  },
  {
    id: 'cust_03',
    name: 'Elena Rostova',
    email: 'elena@nordicflow.se',
    company: 'NordicFlow AB',
    planId: 'plan_growth',
    status: 'active',
    mrr: 149,
    lifetimeSpend: 1788,
    billingAddress: {
      street: 'Kungsgatan 44',
      city: 'Stockholm',
      state: 'Stockholm',
      postalCode: '111 35',
      country: 'Sweden'
    },
    paymentMethod: {
      brand: 'mastercard',
      last4: '8831',
      expMonth: 4,
      expYear: 2029
    },
    phone: '+46 8 123 4567',
    taxId: 'SE556123456701',
    createdAt: '2025-06-20',
    notes: 'Uses EU VAT reverse charge handling. Active user of webhooks.'
  },
  {
    id: 'cust_04',
    name: 'David O\'Connor',
    email: 'david@meridiananalytics.co',
    company: 'Meridian Analytics',
    planId: 'plan_growth',
    status: 'delinquent',
    mrr: 149,
    lifetimeSpend: 894,
    billingAddress: {
      street: '77 St Georges Terrace',
      city: 'Perth',
      state: 'WA',
      postalCode: '6000',
      country: 'Australia'
    },
    paymentMethod: {
      brand: 'visa',
      last4: '9012',
      expMonth: 3,
      expYear: 2026
    },
    phone: '+61 8 9200 1100',
    taxId: 'AU89123456789',
    createdAt: '2025-11-03',
    notes: 'Card charge failed on renewal. Dunning email #2 sent automatically.'
  },
  {
    id: 'cust_05',
    name: 'Amina Mansour',
    email: 'amina@cairofin.tech',
    company: 'CairoFin Labs',
    planId: 'plan_scale',
    status: 'active',
    mrr: 399,
    lifetimeSpend: 2394,
    billingAddress: {
      street: 'Tahrir Square Hub 9',
      city: 'Cairo',
      state: 'Cairo',
      postalCode: '11511',
      country: 'Egypt'
    },
    paymentMethod: {
      brand: 'mastercard',
      last4: '5543',
      expMonth: 12,
      expYear: 2027
    },
    phone: '+20 2 2795 0000',
    taxId: 'EG-304-921-118',
    createdAt: '2025-08-15',
    notes: 'Fast-growing fintech team. Requested additional webhook capacity.'
  },
  {
    id: 'cust_06',
    name: 'Julian Weber',
    email: 'j.weber@apollosystems.de',
    company: 'Apollo Systems GmbH',
    planId: 'plan_growth',
    status: 'active',
    mrr: 149,
    lifetimeSpend: 1192,
    billingAddress: {
      street: 'Friedrichstraße 118',
      city: 'Berlin',
      state: 'Berlin',
      postalCode: '10117',
      country: 'Germany'
    },
    paymentMethod: {
      brand: 'visa',
      last4: '3142',
      expMonth: 7,
      expYear: 2028
    },
    phone: '+49 30 901820',
    taxId: 'DE283940192',
    createdAt: '2025-10-01',
    notes: 'B2B subscription in good standing. Prefers PDF invoices emailed directly.'
  },
  {
    id: 'cust_07',
    name: 'Hannah Brooks',
    email: 'hannah@loomcraft.design',
    company: 'Loomcraft Studio',
    planId: 'plan_starter',
    status: 'trialing',
    mrr: 49,
    lifetimeSpend: 0,
    billingAddress: {
      street: '24 Austin Friars',
      city: 'London',
      state: 'Greater London',
      postalCode: 'EC2N 2EY',
      country: 'United Kingdom'
    },
    paymentMethod: {
      brand: 'visa',
      last4: '7721',
      expMonth: 9,
      expYear: 2029
    },
    phone: '+44 20 7946 0912',
    createdAt: '2026-03-24',
    notes: 'Day 10 of 14-day free trial. High engagement in reporting panel.'
  },
  {
    id: 'cust_08',
    name: 'Liam Zhang',
    email: 'liam@vertexbio.com',
    company: 'Vertex Biosciences',
    planId: 'plan_enterprise',
    status: 'active',
    mrr: 999,
    lifetimeSpend: 8991,
    billingAddress: {
      street: '100 Binney Street',
      city: 'Cambridge',
      state: 'MA',
      postalCode: '02142',
      country: 'United States'
    },
    paymentMethod: {
      brand: 'amex',
      last4: '9901',
      expMonth: 5,
      expYear: 2028
    },
    phone: '+1 (617) 555-0182',
    taxId: 'US-042847291',
    createdAt: '2025-05-12',
    notes: 'Bio-informatics SaaS pipeline. Required HIPAA-compliant data routing.'
  },
  {
    id: 'cust_09',
    name: 'Carlos Mendez',
    email: 'carlos@solardrive.es',
    company: 'SolarDrive Mobility',
    planId: 'plan_starter',
    status: 'canceled',
    mrr: 0,
    lifetimeSpend: 294,
    billingAddress: {
      street: 'Paseo de la Castellana 89',
      city: 'Madrid',
      state: 'Madrid',
      postalCode: '28046',
      country: 'Spain'
    },
    paymentMethod: {
      brand: 'mastercard',
      last4: '1209',
      expMonth: 1,
      expYear: 2027
    },
    phone: '+34 91 555 4321',
    createdAt: '2025-07-10',
    notes: 'Canceled in January due to internal product pivot. Kept account archive.'
  },
  {
    id: 'cust_10',
    name: 'Chloe Dupont',
    email: 'chloe@aerolabs.fr',
    company: 'AéroLabs France',
    planId: 'plan_scale',
    status: 'active',
    mrr: 399,
    lifetimeSpend: 3192,
    billingAddress: {
      street: '14 Rue de Rivoli',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75004',
      country: 'France'
    },
    paymentMethod: {
      brand: 'visa',
      last4: '6453',
      expMonth: 10,
      expYear: 2028
    },
    phone: '+33 1 42 68 55 00',
    taxId: 'FR40123984712',
    createdAt: '2025-08-30',
    notes: 'Upgraded from Growth plan after reaching 45 team members.'
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub_8421',
    customerId: 'cust_01',
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.chen@nexustech.io',
    company: 'Nexus Technologies',
    planId: 'plan_scale',
    planName: 'Scale',
    status: 'active',
    billingCycle: 'monthly',
    amount: 399,
    startDate: '2025-02-14',
    renewalDate: '2026-11-14',
    autoRenew: true,
    seats: 24
  },
  {
    id: 'sub_8422',
    customerId: 'cust_02',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@hyperionsolutions.com',
    company: 'Hyperion Solutions',
    planId: 'plan_enterprise',
    planName: 'Enterprise',
    status: 'active',
    billingCycle: 'annual',
    amount: 9590,
    startDate: '2024-09-10',
    renewalDate: '2027-09-10',
    autoRenew: true,
    seats: 65
  },
  {
    id: 'sub_8423',
    customerId: 'cust_03',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@nordicflow.se',
    company: 'NordicFlow AB',
    planId: 'plan_growth',
    planName: 'Growth',
    status: 'active',
    billingCycle: 'monthly',
    amount: 149,
    startDate: '2025-06-20',
    renewalDate: '2026-11-20',
    autoRenew: true,
    seats: 8
  },
  {
    id: 'sub_8424',
    customerId: 'cust_04',
    customerName: 'David O\'Connor',
    customerEmail: 'david@meridiananalytics.co',
    company: 'Meridian Analytics',
    planId: 'plan_growth',
    planName: 'Growth',
    status: 'past_due',
    billingCycle: 'monthly',
    amount: 149,
    startDate: '2025-11-03',
    renewalDate: '2026-10-03',
    autoRenew: true,
    seats: 7
  },
  {
    id: 'sub_8425',
    customerId: 'cust_05',
    customerName: 'Amina Mansour',
    customerEmail: 'amina@cairofin.tech',
    company: 'CairoFin Labs',
    planId: 'plan_scale',
    planName: 'Scale',
    status: 'active',
    billingCycle: 'monthly',
    amount: 399,
    startDate: '2025-08-15',
    renewalDate: '2026-11-15',
    autoRenew: true,
    seats: 18
  },
  {
    id: 'sub_8426',
    customerId: 'cust_06',
    customerName: 'Julian Weber',
    customerEmail: 'j.weber@apollosystems.de',
    company: 'Apollo Systems GmbH',
    planId: 'plan_growth',
    planName: 'Growth',
    status: 'active',
    billingCycle: 'monthly',
    amount: 149,
    startDate: '2025-10-01',
    renewalDate: '2026-11-01',
    autoRenew: true,
    seats: 10
  },
  {
    id: 'sub_8427',
    customerId: 'cust_07',
    customerName: 'Hannah Brooks',
    customerEmail: 'hannah@loomcraft.design',
    company: 'Loomcraft Studio',
    planId: 'plan_starter',
    planName: 'Starter',
    status: 'in_trial',
    billingCycle: 'monthly',
    amount: 49,
    startDate: '2026-03-24',
    renewalDate: '2026-11-07',
    autoRenew: true,
    seats: 2
  },
  {
    id: 'sub_8428',
    customerId: 'cust_08',
    customerName: 'Liam Zhang',
    customerEmail: 'liam@vertexbio.com',
    company: 'Vertex Biosciences',
    planId: 'plan_enterprise',
    planName: 'Enterprise',
    status: 'active',
    billingCycle: 'monthly',
    amount: 999,
    startDate: '2025-05-12',
    renewalDate: '2026-11-12',
    autoRenew: true,
    seats: 45
  },
  {
    id: 'sub_8429',
    customerId: 'cust_09',
    customerName: 'Carlos Mendez',
    customerEmail: 'carlos@solardrive.es',
    company: 'SolarDrive Mobility',
    planId: 'plan_starter',
    planName: 'Starter',
    status: 'canceled',
    billingCycle: 'monthly',
    amount: 49,
    startDate: '2025-07-10',
    renewalDate: '2026-01-10',
    autoRenew: false,
    seats: 3,
    cancelReason: 'Downsized engineering department after company restructuring.'
  },
  {
    id: 'sub_8430',
    customerId: 'cust_10',
    customerName: 'Chloe Dupont',
    customerEmail: 'chloe@aerolabs.fr',
    company: 'AéroLabs France',
    planId: 'plan_scale',
    planName: 'Scale',
    status: 'active',
    billingCycle: 'monthly',
    amount: 399,
    startDate: '2025-08-30',
    renewalDate: '2026-11-30',
    autoRenew: true,
    seats: 28
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_1092',
    number: 'INV-2026-1092',
    customerId: 'cust_01',
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.chen@nexustech.io',
    company: 'Nexus Technologies',
    issueDate: '2026-10-14',
    dueDate: '2026-10-28',
    paidDate: '2026-10-14',
    subtotal: 399.00,
    tax: 33.91,
    discountAmount: 0,
    total: 432.91,
    status: 'paid',
    paymentMethod: 'Visa •••• 4242',
    items: [
      {
        id: 'item_1',
        description: 'Scale Subscription - 1 Month Recurring Plan',
        quantity: 1,
        unitPrice: 399.00,
        amount: 399.00
      }
    ],
    notes: 'Thank you for your business. Subscription automatically renews next month.'
  },
  {
    id: 'inv_1091',
    number: 'INV-2026-1091',
    customerId: 'cust_08',
    customerName: 'Liam Zhang',
    customerEmail: 'liam@vertexbio.com',
    company: 'Vertex Biosciences',
    issueDate: '2026-10-12',
    dueDate: '2026-10-26',
    paidDate: '2026-10-12',
    subtotal: 999.00,
    tax: 0,
    discountAmount: 0,
    total: 999.00,
    status: 'paid',
    paymentMethod: 'Amex •••• 9901',
    items: [
      {
        id: 'item_2',
        description: 'Enterprise Plan - Monthly Billing (45 Seats included)',
        quantity: 1,
        unitPrice: 999.00,
        amount: 999.00
      }
    ],
    notes: 'Tax exemption certificate US-042847291 applied.'
  },
  {
    id: 'inv_1090',
    number: 'INV-2026-1090',
    customerId: 'cust_06',
    customerName: 'Julian Weber',
    customerEmail: 'j.weber@apollosystems.de',
    company: 'Apollo Systems GmbH',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    paidDate: '2026-10-02',
    subtotal: 149.00,
    tax: 28.31,
    discountAmount: 0,
    total: 177.31,
    status: 'paid',
    paymentMethod: 'Visa •••• 3142',
    items: [
      {
        id: 'item_3',
        description: 'Growth Subscription - Monthly recurring',
        quantity: 1,
        unitPrice: 149.00,
        amount: 149.00
      }
    ]
  },
  {
    id: 'inv_1089',
    number: 'INV-2026-1089',
    customerId: 'cust_04',
    customerName: 'David O\'Connor',
    customerEmail: 'david@meridiananalytics.co',
    company: 'Meridian Analytics',
    issueDate: '2026-10-03',
    dueDate: '2026-10-17',
    subtotal: 149.00,
    tax: 14.90,
    discountAmount: 0,
    total: 163.90,
    status: 'overdue',
    items: [
      {
        id: 'item_4',
        description: 'Growth Subscription - Monthly recurring (Overdue)',
        quantity: 1,
        unitPrice: 149.00,
        amount: 149.00
      }
    ],
    notes: 'Automated dunning in progress. Grace period expires in 4 days.'
  },
  {
    id: 'inv_1088',
    number: 'INV-2026-1088',
    customerId: 'cust_10',
    customerName: 'Chloe Dupont',
    customerEmail: 'chloe@aerolabs.fr',
    company: 'AéroLabs France',
    issueDate: '2026-09-30',
    dueDate: '2026-10-14',
    paidDate: '2026-09-30',
    subtotal: 399.00,
    tax: 79.80,
    discountAmount: 0,
    total: 478.80,
    status: 'paid',
    paymentMethod: 'Visa •••• 6453',
    items: [
      {
        id: 'item_5',
        description: 'Scale Subscription - Monthly billing',
        quantity: 1,
        unitPrice: 399.00,
        amount: 399.00
      }
    ]
  },
  {
    id: 'inv_1087',
    number: 'INV-2026-1087',
    customerId: 'cust_05',
    customerName: 'Amina Mansour',
    customerEmail: 'amina@cairofin.tech',
    company: 'CairoFin Labs',
    issueDate: '2026-10-25',
    dueDate: '2026-11-08',
    subtotal: 399.00,
    tax: 0,
    discountAmount: 50.00,
    total: 349.00,
    status: 'open',
    items: [
      {
        id: 'item_6',
        description: 'Scale Subscription - Special Renewal Coupon Applied',
        quantity: 1,
        unitPrice: 399.00,
        amount: 399.00
      }
    ],
    notes: 'Promo code GROWTH20 adjusted applied.'
  }
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'tx_9841284',
    invoiceId: 'inv_1092',
    customerId: 'cust_01',
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.chen@nexustech.io',
    amount: 432.91,
    fee: 12.85,
    net: 420.06,
    paymentMethod: 'visa',
    last4: '4242',
    status: 'succeeded',
    date: '2026-10-14 09:21:18'
  },
  {
    id: 'tx_9841283',
    invoiceId: 'inv_1091',
    customerId: 'cust_08',
    customerName: 'Liam Zhang',
    customerEmail: 'liam@vertexbio.com',
    amount: 999.00,
    fee: 29.27,
    net: 969.73,
    paymentMethod: 'amex',
    last4: '9901',
    status: 'succeeded',
    date: '2026-10-12 14:05:44'
  },
  {
    id: 'tx_9841282',
    customerId: 'cust_04',
    customerName: 'David O\'Connor',
    customerEmail: 'david@meridiananalytics.co',
    amount: 163.90,
    fee: 0,
    net: 0,
    paymentMethod: 'visa',
    last4: '9012',
    status: 'failed',
    date: '2026-10-03 04:12:02'
  },
  {
    id: 'tx_9841281',
    invoiceId: 'inv_1090',
    customerId: 'cust_06',
    customerName: 'Julian Weber',
    customerEmail: 'j.weber@apollosystems.de',
    amount: 177.31,
    fee: 5.34,
    net: 171.97,
    paymentMethod: 'visa',
    last4: '3142',
    status: 'succeeded',
    date: '2026-10-02 11:32:50'
  },
  {
    id: 'tx_9841280',
    invoiceId: 'inv_1088',
    customerId: 'cust_10',
    customerName: 'Chloe Dupont',
    customerEmail: 'chloe@aerolabs.fr',
    amount: 478.80,
    fee: 14.18,
    net: 464.62,
    paymentMethod: 'visa',
    last4: '6453',
    status: 'succeeded',
    date: '2026-09-30 16:45:09'
  },
  {
    id: 'tx_9841279',
    customerId: 'cust_03',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@nordicflow.se',
    amount: 149.00,
    fee: 4.62,
    net: 144.38,
    paymentMethod: 'mastercard',
    last4: '8831',
    status: 'succeeded',
    date: '2026-09-20 08:14:22'
  },
  {
    id: 'tx_9841278',
    customerId: 'cust_02',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@hyperionsolutions.com',
    amount: 9590.00,
    fee: 15.00,
    net: 9575.00,
    paymentMethod: 'ach',
    status: 'succeeded',
    date: '2026-09-10 10:00:00'
  },
  {
    id: 'tx_9841277',
    customerId: 'cust_05',
    customerName: 'Amina Mansour',
    customerEmail: 'amina@cairofin.tech',
    amount: 399.00,
    fee: 11.87,
    net: 387.13,
    paymentMethod: 'mastercard',
    last4: '5543',
    status: 'succeeded',
    date: '2026-09-15 13:20:11'
  }
];

export const INITIAL_DISCOUNTS: DiscountCoupon[] = [
  {
    id: 'disc_01',
    code: 'FOUNDER50',
    description: '50% off for the first 3 months on Growth & Scale plans.',
    type: 'percent',
    value: 50,
    duration: 'repeating',
    durationInMonths: 3,
    maxRedemptions: 100,
    timesRedeemed: 64,
    expiryDate: '2026-12-31',
    status: 'active',
    applicablePlanIds: ['plan_growth', 'plan_scale']
  },
  {
    id: 'disc_02',
    code: 'ANNUALSAVE20',
    description: 'Flat 20% discount on any annual upfront commitment.',
    type: 'percent',
    value: 20,
    duration: 'forever',
    maxRedemptions: 500,
    timesRedeemed: 218,
    expiryDate: '2027-01-01',
    status: 'active'
  },
  {
    id: 'disc_03',
    code: 'STARTUPCREDIT100',
    description: '$100 off invoice credit for early stage YC/Techstars startups.',
    type: 'fixed_amount',
    value: 100,
    duration: 'once',
    maxRedemptions: 50,
    timesRedeemed: 42,
    expiryDate: '2026-11-30',
    status: 'active',
    applicablePlanIds: ['plan_scale', 'plan_enterprise']
  },
  {
    id: 'disc_04',
    code: 'SPRINGLAUNCH',
    description: 'Seasonal promotion - 15% discount code expired last month.',
    type: 'percent',
    value: 15,
    duration: 'once',
    maxRedemptions: 200,
    timesRedeemed: 200,
    expiryDate: '2026-03-31',
    status: 'expired'
  }
];

export const REVENUE_TIMELINE_DATA: RevenueMetricPoint[] = [
  { date: '2025-11', label: 'Nov 25', mrr: 102400, arr: 1228800, newMrr: 12400, expansionMrr: 4200, churnMrr: 1800, netMrr: 14800 },
  { date: '2025-12', label: 'Dec 25', mrr: 108900, arr: 1306800, newMrr: 9800, expansionMrr: 5100, churnMrr: 2100, netMrr: 12800 },
  { date: '2026-01', label: 'Jan 26', mrr: 114500, arr: 1374000, newMrr: 11200, expansionMrr: 6300, churnMrr: 1900, netMrr: 15600 },
  { date: '2026-02', label: 'Feb 26', mrr: 118200, arr: 1418400, newMrr: 8900, expansionMrr: 4400, churnMrr: 1400, netMrr: 11900 },
  { date: '2026-03', label: 'Mar 26', mrr: 122600, arr: 1471200, newMrr: 10500, expansionMrr: 5800, churnMrr: 2200, netMrr: 14100 },
  { date: '2026-04', label: 'Apr 26', mrr: 125100, arr: 1501200, newMrr: 9400, expansionMrr: 4900, churnMrr: 1600, netMrr: 12700 },
  { date: '2026-05', label: 'May 26', mrr: 128700, arr: 1544400, newMrr: 12100, expansionMrr: 6100, churnMrr: 1700, netMrr: 16500 },
  { date: '2026-06', label: 'Jun 26', mrr: 132400, arr: 1588800, newMrr: 11800, expansionMrr: 5900, churnMrr: 2300, netMrr: 15400 },
  { date: '2026-07', label: 'Jul 26', mrr: 135800, arr: 1629600, newMrr: 10900, expansionMrr: 6400, churnMrr: 1900, netMrr: 15400 },
  { date: '2026-08', label: 'Aug 26', mrr: 139200, arr: 1670400, newMrr: 11400, expansionMrr: 7200, churnMrr: 2100, netMrr: 16500 },
  { date: '2026-09', label: 'Sep 26', mrr: 143500, arr: 1722000, newMrr: 13200, expansionMrr: 7800, churnMrr: 1800, netMrr: 19200 },
  { date: '2026-10', label: 'Oct 26', mrr: 147820, arr: 1773840, newMrr: 14100, expansionMrr: 8100, churnMrr: 1650, netMrr: 20550 }
];

export const INITIAL_NOTIFICATIONS: ActivityNotification[] = [
  {
    id: 'notif_1',
    type: 'payment',
    title: 'Payment Received',
    description: 'Nexus Technologies paid $432.91 via Visa •••• 4242',
    timeAgo: '12m ago',
    unread: true,
    linkTab: 'payments'
  },
  {
    id: 'notif_2',
    type: 'subscription',
    title: 'New Enterprise Plan',
    description: 'Vertex Biosciences upgraded to Enterprise tier ($999/mo)',
    timeAgo: '1h ago',
    unread: true,
    linkTab: 'subscriptions'
  },
  {
    id: 'notif_3',
    type: 'payment',
    title: 'Dunning Alert',
    description: 'Card renewal failed for Meridian Analytics ($163.90). Automated retry scheduled.',
    timeAgo: '3h ago',
    unread: true,
    linkTab: 'customers'
  },
  {
    id: 'notif_4',
    type: 'invoice',
    title: 'Invoice Due Soon',
    description: 'Invoice INV-2026-1087 for CairoFin Labs is due in 3 days',
    timeAgo: '1d ago',
    unread: false,
    linkTab: 'invoices'
  }
];
