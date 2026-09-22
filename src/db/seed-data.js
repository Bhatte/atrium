/**
 * The lab data, every time.
 *
 * The IDs here are fixed on purpose and must not change between cohorts:
 * teaching material refers to them directly.
 *
 *   17  Alice   member
 *   18  Bob     member
 *   99  Morgan  admin
 */

export const USERS = [
  {
    id: 17,
    username: "alice.nolan",
    password: "SpringRiver44",
    display_name: "Alice Nolan",
    email: "alice.nolan@atrium.example",
    department: "Operations",
    role: "member",
    bio: "Coordinates the weekly operations review and keeps the supplier register current."
  },
  {
    id: 18,
    username: "bob.keane",
    password: "CopperLane19",
    display_name: "Bob Keane",
    email: "bob.keane@atrium.example",
    department: "Finance",
    role: "member",
    bio: "Looks after purchase orders and the quarterly budget pack."
  },
  {
    id: 99,
    username: "morgan.doyle",
    password: "QuietHarbour08",
    display_name: "Morgan Doyle",
    email: "morgan.doyle@atrium.example",
    department: "IT Services",
    role: "admin",
    bio: "Administers Atrium, staff accounts and shared document access."
  }
];

export const RESOURCES = [
  {
    id: 1,
    title: "Expense claim form",
    description: "Current form for travel and subsistence claims. Submit to Finance by month end.",
    category: "Finance",
    owner_id: 18
  },
  {
    id: 2,
    title: "Supplier register",
    description: "Approved suppliers, contract end dates and the named contact for each.",
    category: "Operations",
    owner_id: 17
  },
  {
    id: 3,
    title: "New starter checklist",
    description: "What to arrange before a new colleague's first day: desk, accounts, induction.",
    category: "IT Services",
    owner_id: 99
  },
  {
    id: 4,
    title: "Meeting room booking guide",
    description: "How to book the ground floor rooms and what to do when a booking clashes.",
    category: "Operations",
    owner_id: 17
  },
  {
    id: 5,
    title: "Quarterly budget pack",
    description: "Template and worked example for the departmental quarterly submission.",
    category: "Finance",
    owner_id: 18
  }
];
