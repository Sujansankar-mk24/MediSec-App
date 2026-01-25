export default {
  id: "db-2024-001",
  title: "Social Engineering & Unauthorized Access",
  organization: "St. Jude's Regional Medical Center",
  date: "2024-05-20",
  records_affected: 4500,
  breach_type: "social_engineering",
  summary: "An attacker posed as an IT contractor to gain physical access to a nurse station. By 'shoulder surfing', they obtained credentials and exported patient records over 3 hours.",
  lessons_learned: [
    "Always verify the identity of unknown personnel, even in uniform.",
    "Log out of workstations when leaving the area, even for a minute.",
    "Implement two-factor authentication for all internal database exports."
  ]
};