export const patient = {
  name: "Alexandra Ionescu",
  firstName: "Alexandra",
  email: "alexandra.ionescu@email.com",
  phone: "+1 416 555 0198",
  dob: "1986-04-12",
  membership: "Founding Member",
  memberSince: "January 2024",
  nextBilling: "January 2025",
};

export const appointments = [
  {
    id: "a1",
    title: "Vitality Reading",
    date: "2024-07-08",
    time: "10:00",
    duration: 60,
    clinician: "Eleanor Hartley",
    status: "upcoming",
    notes: "",
  },
  {
    id: "a2",
    title: "Light Immersion",
    date: "2024-07-15",
    time: "14:30",
    duration: 45,
    clinician: "Sophie Renaud",
    status: "upcoming",
    notes: "",
  },
  {
    id: "a3",
    title: "First Welcome",
    date: "2024-01-18",
    time: "09:00",
    duration: 90,
    clinician: "Eleanor Hartley",
    status: "completed",
    notes: "",
  },
  {
    id: "a4",
    title: "Body Harmony",
    date: "2024-03-05",
    time: "11:00",
    duration: 45,
    clinician: "Marcus Osei",
    status: "completed",
    notes: "",
  },
  {
    id: "a5",
    title: "Mind & Clarity",
    date: "2024-05-22",
    time: "13:00",
    duration: 60,
    clinician: "Marcus Osei",
    status: "completed",
    notes: "",
  },
];

// Wellness scores 0–100. No clinical units.
export const biomarkers = [
  { label: "Biological Age",  labelRo: "Vârstă Biologică",  score: 84, descriptor: "Exceptional", descriptorRo: "Excepțional", trend: +6 },
  { label: "Heart Rhythm",    labelRo: "Ritm Cardiac",       score: 78, descriptor: "Thriving",    descriptorRo: "Înfloritor",   trend: +15 },
  { label: "Breath Capacity", labelRo: "Capacitate Resp.",   score: 72, descriptor: "Strong",      descriptorRo: "Puternic",     trend: +8 },
  { label: "Inner Balance",   labelRo: "Echilibru Interior", score: 80, descriptor: "Excellent",   descriptorRo: "Excelent",     trend: +12 },
  { label: "Morning Calm",    labelRo: "Calm Matinal",       score: 74, descriptor: "Balanced",    descriptorRo: "Echilibrat",   trend: +9 },
  { label: "Vitality",        labelRo: "Vitalitate",         score: 76, descriptor: "Vibrant",     descriptorRo: "Vibrant",      trend: +7 },
];

export const bioTrends = {
  biologicalAge: [
    { month: "Jan", value: 38 },
    { month: "Feb", value: 37 },
    { month: "Mar", value: 36 },
    { month: "Apr", value: 35 },
    { month: "May", value: 33 },
    { month: "Jun", value: 32 },
  ],
  hrv: [
    { month: "Jan", value: 61 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 68 },
    { month: "Apr", value: 72 },
    { month: "May", value: 75 },
    { month: "Jun", value: 78 },
  ],
  vo2max: [
    { month: "Jan", value: 38 },
    { month: "Feb", value: 39 },
    { month: "Mar", value: 40 },
    { month: "Apr", value: 40 },
    { month: "May", value: 41 },
    { month: "Jun", value: 42 },
  ],
};

export const documents = [
  { id: "d1", title: "Your Vitality Reading — March 2024", type: "Lab Report", date: "2024-03-05", size: "1.2 MB" },
  { id: "d2", title: "Body Harmony Notes — March 2024", type: "Assessment", date: "2024-03-05", size: "840 KB" },
  { id: "d3", title: "Mind & Clarity Session — May 2024", type: "Assessment", date: "2024-05-22", size: "1.5 MB" },
  { id: "d4", title: "Welcome Conversation — January 2024", type: "Summary", date: "2024-01-18", size: "620 KB" },
  { id: "d5", title: "Your Personal Path — January 2024", type: "Protocol", date: "2024-01-18", size: "430 KB" },
];

export const availableSlots = [
  { date: "2024-07-22", time: "09:00", clinician: "Eleanor Hartley" },
  { date: "2024-07-22", time: "10:30", clinician: "Marcus Osei" },
  { date: "2024-07-23", time: "14:00", clinician: "Sophie Renaud" },
  { date: "2024-07-24", time: "09:30", clinician: "Eleanor Hartley" },
  { date: "2024-07-24", time: "11:00", clinician: "Marcus Osei" },
  { date: "2024-07-25", time: "15:00", clinician: "Sophie Renaud" },
];

export const services = [
  "Vitality Reading",
  "Light Immersion",
  "Oxygen Sanctuary",
  "Body Harmony",
  "Mind & Clarity",
  "Deep Recovery",
];
