export const sramModels = [
  {name:'SRAM Nano', key:'nano', number:'01'},
  {name:'SRAM Lite', key:'lite', number:'02'},
  {name:'SRAM Plus', key:'plus', number:'03'},
  {name:'SRAM Pro', key:'pro', number:'04'},
  {name:'SRAM Ultra', key:'ultra', number:'05'},
  {name:'SRAM Ultra Frontier', key:'ultra-frontier', number:'06'}
];

export const sevaServices = [
  {name:'Electrical services', group:'repairs', icon:'bolt', description:'Help with electrical work around the home.'},
  {name:'Carpenter services', group:'repairs', icon:'tools', description:'Carpentry support for your household.'},
  {name:'Plumbing service', group:'repairs', icon:'drop', description:'Plumbing assistance for your home.'},
  {name:'Kitchen and Utensil Cleaning', group:'household', icon:'sparkles', description:'Care for your kitchen and everyday utensils.'},
  {name:'Meal Prep and Serving', group:'household', icon:'meal', description:'A helping hand with meal preparation and serving.'},
  {name:'Mopping, Dusting, and Wiping', group:'household', icon:'sparkles', description:'Support with everyday household cleaning.'},
  {name:'Bathroom Cleaning', group:'household', icon:'drop', description:'Dedicated cleaning for bathroom spaces.'},
  {name:'Laundry and Ironing', group:'household', icon:'shirt', description:'Help with washing and ironing clothes.'},
  {name:'Packing and Unpacking', group:'household', icon:'box', description:'Practical support when getting things packed or settled.'}
];

export const products = [
  {
    slug:'one', name:'ClarionX ONE', short:'ONE', category:'ai', categoryLabel:'AI application', icon:'sparkles', accent:'blue',
    summary:'Consumer + enterprise AI super application.',
    headline:'One place for your AI world.',
    intro:'ClarionX ONE brings the consumer and enterprise AI application vision together under one product. It is the super application in the ClarionXSI ecosystem.',
    audience:'Individuals, teams, and enterprises',
    focus:[{title:'For individuals',text:'An AI application for people exploring how intelligence can support their everyday work.'},{title:'For enterprises',text:'An enterprise-facing AI application within the same ClarionX ONE product identity.'},{title:'One super application',text:'A central application experience in the wider ClarionXSI product family.'}],
    statement:'Your gateway to the ClarionX AI ecosystem.',
    related:['sram','agents','hub']
  },
  {
    slug:'sram', name:'ClarionX SRAM', short:'SRAM', category:'ai', categoryLabel:'AI model family', icon:'chip', accent:'violet',
    summary:'Self-Reasoning Retrieval Augmented Model. Six members. One model family.',
    headline:'A family of intelligence.',
    intro:'SRAM stands for Self-Reasoning Retrieval Augmented Model. The ClarionX SRAM family includes Nano, Lite, Plus, Pro, Ultra, and Ultra Frontier.',
    audience:'People and teams exploring the SRAM model family',
    focus:[{title:'Self-Reasoning',text:'The reasoning focus at the heart of the SRAM name.'},{title:'Retrieval Augmented',text:'Retrieval augmentation is part of the model family’s identity.'},{title:'Six family members',text:'A clearly named family from SRAM Nano through SRAM Ultra Frontier.'}],
    statement:'Meet every member of the SRAM family.',
    related:['one','research','agents']
  },
  {
    slug:'agents', name:'ClarionX Agents', short:'Agents', category:'ai', categoryLabel:'Agent platform / runtime', icon:'nodes', accent:'blue',
    summary:'The platform and runtime for AI agents.',
    headline:'Give intelligence a place to act.',
    intro:'ClarionX Agents is the agent platform and runtime in the ClarionXSI portfolio. Its focus is the environment in which AI agents operate.',
    audience:'Teams exploring agent platforms and runtimes',
    focus:[{title:'Agent platform',text:'The dedicated product for the agent platform within ClarionXSI.'},{title:'Agent runtime',text:'A runtime focus for the execution of agent-based experiences.'},{title:'Part of the ecosystem',text:'Explore alongside ClarionX ONE, SRAM, and Hub.'}],
    statement:'A dedicated home for agent-based experiences.',
    related:['one','hub','sram']
  },
  {
    slug:'research', name:'ClarionX Research', short:'Research', category:'ai', categoryLabel:'Frontier AI research', icon:'orbit', accent:'violet',
    summary:'Exploring the frontier of artificial intelligence.',
    headline:'Curiosity moves intelligence forward.',
    intro:'ClarionX Research is the frontier AI research division of ClarionX Super Intelligence. It represents the research side of the ClarionXSI ecosystem.',
    audience:'Researchers and people interested in frontier AI',
    focus:[{title:'Frontier AI',text:'A dedicated focus on the evolving frontier of artificial intelligence.'},{title:'Research identity',text:'The home for the research direction within the ClarionXSI portfolio.'},{title:'Explore the family',text:'Learn about the related SRAM model family and AI products.'}],
    statement:'Space for the questions that come next.',
    related:['sram','agents','one']
  },
  {
    slug:'hub', name:'ClarionX Hub', short:'Hub', category:'platforms', categoryLabel:'Application integration platform', icon:'grid', accent:'teal',
    summary:'An application integration platform for a connected world.',
    headline:'Where applications come together.',
    intro:'ClarionX Hub is the Application Integration Platform in the ClarionXSI product family. It is the portfolio’s dedicated focus for application integration.',
    audience:'Teams exploring application integration',
    focus:[{title:'Application integration',text:'A dedicated platform identity for bringing applications together.'},{title:'Connected experiences',text:'An integration focus within the broader ClarionXSI vision.'},{title:'A distinct platform',text:'Hub sits alongside ONE, Agents, and the other ClarionXSI products.'}],
    statement:'Make room for a more connected application world.',
    related:['one','agents','stay']
  },
  {
    slug:'stay', name:'ClarionX Stay', short:'Stay', category:'platforms', categoryLabel:'Hostels management system', icon:'building', accent:'amber',
    summary:'A dedicated management system for hostels.',
    headline:'A better home for hostel management.',
    intro:'ClarionX Stay is the Hostels Management System in the ClarionXSI portfolio, with a clear focus on the needs of hostel management.',
    audience:'Hostel owners and management teams',
    focus:[{title:'Hostel management',text:'A product dedicated to the management of hostels.'},{title:'For management teams',text:'A focused part of the portfolio for people who manage hostel properties.'},{title:'Everyday applications',text:'A practical application of the ClarionXSI vision beyond AI products.'}],
    statement:'A focused product for the places people stay.',
    related:['hub','seva','one']
  },
  {
    slug:'seva', name:'ClarionX Seva', short:'Seva', category:'services', categoryLabel:'Home & household services', icon:'home', accent:'teal',
    summary:'Home services, from skilled repairs to everyday household care.',
    headline:'A little help. A lot more living.',
    intro:'ClarionX Seva brings electrical, carpentry, plumbing, and household services under one name. Explore the complete service range below.',
    audience:'Households looking for practical everyday support',
    focus:[{title:'Skilled home services',text:'Electrical, carpenter, and plumbing services.'},{title:'Household care',text:'Kitchen, bathroom, and general household cleaning.'},{title:'Everyday support',text:'Meal preparation, laundry, ironing, packing, and unpacking.'}],
    statement:'Care for your home, in the details that matter.',
    related:['stay','apexphysio','one']
  },
  {
    slug:'apexphysio', name:'Apexphysio Rehabilitation', short:'Apexphysio', category:'services', categoryLabel:'Physiotherapy & rehabilitation', icon:'activity', accent:'rose',
    summary:'Doctor bookings and treatment for physiotherapy.',
    headline:'Care that helps you move forward.',
    intro:'Apexphysio Rehabilitation is the physiotherapy offering in the ClarionXSI portfolio, focused on doctor bookings and physiotherapy treatment.',
    audience:'People seeking physiotherapy consultations and treatment',
    focus:[{title:'Doctor bookings',text:'An offering focused on arranging physiotherapy consultations.'},{title:'Physiotherapy treatment',text:'Physiotherapy is the core treatment focus of Apexphysio Rehabilitation.'},{title:'Rehabilitation',text:'A dedicated rehabilitation identity within the company’s portfolio.'}],
    statement:'A dedicated place for physiotherapy and rehabilitation.',
    related:['seva','stay','one']
  }
];
